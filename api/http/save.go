package http

import (
	"io/ioutil"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// SaveHandler is the handler for saving the application.
type SaveHandler struct {
	Env      api.Settings
	Log      api.LogService
	Database api.DatabaseService
	Store    api.StorageService
}

// ServeHTTP saves a payload of information for the provided account.
func (service SaveHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// Get account information
	account, _ := AccountAndSessionFromRequestContext(r)

	// If the account is locked then we cannot proceed
	if account.Status == api.StatusSubmitted {
		service.Log.Warn(api.AccountLocked, api.LogFields{})
		RespondWithStructuredError(w, api.AccountLocked, http.StatusForbidden)
		return
	}

	// Read the body of the request (which should be in JSON)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		service.Log.WarnError(api.PayloadEmpty, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadEmpty, http.StatusBadRequest)
		return
	}

	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	if err := payload.Unmarshal(body); err != nil {
		service.Log.WarnError(api.PayloadDeserializeError, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadDeserializeError, http.StatusBadRequest)
		return
	}

	// Extract the entity interface of the payload and validate it
	entity, err := payload.Entity()
	if err != nil {
		service.Log.WarnError(api.PayloadEntityError, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadEntityError, http.StatusBadRequest)
		return
	}

	// TODO: Figure out how to make this cleaner.
	section, ok := entity.(api.Section)
	if !ok {
		service.Log.WarnError(api.PayloadEntityError, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadEntityError, http.StatusBadRequest)
		return
	}

	// Save to storage and report any errors
	saveErr := service.Store.SaveSection(section, account.ID)
	if saveErr != nil {
		if saveErr == api.ErrApplicationDoesNotExist {
			// if the application doesn't exist, we need to create it.
			newApplication := api.BlankApplication(account.ID, account.FormType, account.FormVersion)
			newApplication.SetSection(section)

			createErr := service.Store.CreateApplication(newApplication)
			if createErr != nil {
				// This should happen but rarely, but there is a race condition here where multiple /save calls
				// get ApplicationDoesNotExist above. In that case, some of them will get ApplicationExists here,
				// but it's safe for them to just try again.
				if createErr == api.ErrApplicationAlreadyExists {
					service.Log.Debug("Having to double save due to /save race", api.LogFields{})
					saveAgainErr := service.Store.SaveSection(section, account.ID)
					if saveAgainErr != nil {
						// this time, nothing will save you.
						service.Log.WarnError(api.EntitySaveError, saveAgainErr, api.LogFields{})
						RespondWithStructuredError(w, api.EntitySaveError, http.StatusInternalServerError)
						return
					}
				} else {
					service.Log.WarnError(api.EntitySaveError, createErr, api.LogFields{})
					RespondWithStructuredError(w, api.EntitySaveError, http.StatusInternalServerError)
					return
				}
			}
		} else {
			service.Log.WarnError(api.EntitySaveError, saveErr, api.LogFields{})
			RespondWithStructuredError(w, api.EntitySaveError, http.StatusInternalServerError)
			return
		}
	}

}
