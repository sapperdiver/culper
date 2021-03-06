package http

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// StatusHandler is the handler for the application status.
type StatusHandler struct {
	Env      api.Settings
	Log      api.LogService
	Database api.DatabaseService
	Store    api.StorageService
}

// formStatusInfo represents extra information associated with the application
// regarding its current state.
type formStatusInfo struct {
	Status string
	Hash   string
}

// ServeHTTP returns the accounts current state.
func (service StatusHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// Get account information
	account, _ := AccountAndSessionFromRequestContext(r)

	application, fetchErr := service.Store.LoadApplication(account.ID)
	if fetchErr != nil {
		if fetchErr == api.ErrApplicationDoesNotExist {
			service.Log.Info("Status requested for application that has not been created", api.LogFields{})
		} else {
			service.Log.WarnError(api.StatusError, fetchErr, api.LogFields{})
			RespondWithStructuredError(w, api.StatusError, http.StatusInternalServerError)
			return
		}
	}

	hash, hashErr := application.Hash()
	if hashErr != nil {
		service.Log.WarnError(api.HashingFailure, hashErr, api.LogFields{})
		RespondWithStructuredError(w, api.HashingFailure, http.StatusInternalServerError)
		return
	}

	status := formStatusInfo{
		Status: account.Status,
		Hash:   hash,
	}

	statusBytes, jsonErr := json.Marshal(status)
	if jsonErr != nil {
		service.Log.WarnError(api.StatusError, jsonErr, api.LogFields{})
		RespondWithStructuredError(w, api.StatusError, http.StatusInternalServerError)
		return
	}

	// Get the CSRF token and add it as a header
	AddCSRFTokenHeader(w, r)

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(statusBytes))
}
