package integration

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"errors"
	"io/ioutil"
	"mime/multipart"
	gohttp "net/http"
	"net/http/httptest"
	"os"
	"path"
	"strconv"
	"testing"

	"github.com/gorilla/mux"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/mock"
)

type errorAttachmentStore struct {
	mock.StorageService
}

func (s *errorAttachmentStore) ListAttachmentsMetadata(accountID int) ([]api.Attachment, error) {
	return []api.Attachment{}, errors.New("attachment error")
}

func postAttachmentRequest(t *testing.T, filename string, filebytes []byte, account api.Account) *gohttp.Request {
	t.Helper()

	body := &bytes.Buffer{}

	formWriter := multipart.NewWriter(body)
	pdfWriter, writeErr := formWriter.CreateFormFile("file", filename)
	if writeErr != nil {
		t.Fatal("Didn't get a file writer")
	}

	pdfWriter.Write(filebytes)
	formWriter.Close()

	req := httptest.NewRequest("POST", "/me/attachments", body)
	req.Header.Set("Content-Type", formWriter.FormDataContentType())

	authCtx := http.SetAccountAndSessionInRequestContext(req, account, api.Session{})
	req = req.WithContext(authCtx)

	return req
}

func TestSaveAttachment(t *testing.T) {

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	certificationPath := "../testdata/attachments/signature-form.pdf"

	certificationBytes := readTestData(t, certificationPath)

	req := postAttachmentRequest(t, "signature-form.pdf", certificationBytes, account)

	w := httptest.NewRecorder()

	createAttachmentHandler := http.AttachmentSaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	createAttachmentHandler.ServeHTTP(w, req)

	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Fatal("Got an error back from CreateAttachment")
	}

	idBytes, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	attachmentID := string(idBytes)

	if attachmentID == "0" {
		t.Fatal("Should have gotten a real ID back instead of nothing")
	}

	// -- now get it back

	getW, getReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	getReq = mux.SetURLVars(getReq, map[string]string{
		"id": attachmentID,
	})

	getAttachmentHandler := http.AttachmentGetHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	getAttachmentHandler.ServeHTTP(getW, getReq)

	getResp := getW.Result()

	if getResp.StatusCode != 200 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}

	// comes back as base64 encoded.

	attachment64, readErr := ioutil.ReadAll(getResp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	returnedAttachment, decodeErr := base64.StdEncoding.DecodeString(string(attachment64))
	if decodeErr != nil {
		t.Fatal(decodeErr)
	}

	if !bytes.Equal(returnedAttachment, certificationBytes) {
		t.Fatal("The returned attachment is not the same as the sent one")
	}
}
func TestSaveAttachmentDisabled(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	saveAttachmentHandler := http.AttachmentSaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	// Attachments not enabled
	os.Setenv(api.AttachmentsEnabled, "0")
	saveAttachmentHandler.ServeHTTP(w, indexReq)

	resp := w.Result()

	if resp.StatusCode != gohttp.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			resp.StatusCode, gohttp.StatusInternalServerError)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "Attachments is not implemented")
}

func TestListNoAttachments(t *testing.T) {
	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	listAttachmentHandler := http.AttachmentListHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	listAttachmentHandler.ServeHTTP(w, indexReq)

	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Log("Got an error back from ListAttachments")
		t.Fail()
	}

	// comes back as JSON, leaving out the body

	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	if string(body) != "[]\n" {
		t.Log("Should have returned an empty array, got", string(body))
		t.Fail()
	}

}

func TestListAttachments(t *testing.T) {
	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	listAttachmentHandler := http.AttachmentListHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	createAttachmentHandler := http.AttachmentSaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	createdAttachments := map[int]api.Attachment{}

	attachmentPaths := []string{"../testdata/attachments/signature-form.pdf", "../testdata/attachments/release-medical.pdf"}

	for _, attachmentPath := range attachmentPaths {

		attachmentBytes := readTestData(t, attachmentPath)

		filename := path.Base(attachmentPath)
		req := postAttachmentRequest(t, filename, attachmentBytes, account)
		w := httptest.NewRecorder()

		createAttachmentHandler.ServeHTTP(w, req)

		resp := w.Result()

		if resp.StatusCode != 200 {
			t.Fatal("Got an error back from CreateAttachment")
		}

		idBytes, readErr := ioutil.ReadAll(resp.Body)
		if readErr != nil {
			t.Fatal(readErr)
		}

		attachmentID, atoiErr := strconv.Atoi(string(idBytes))
		if atoiErr != nil {
			t.Fatal("Didn't get a number back", string(idBytes))
		}

		if attachmentID == 0 {
			t.Fatal("Should have gotten a real ID back instead of nothing")
		}

		createdAttachments[attachmentID] = api.Attachment{
			Filename: filename,
			Size:     int64(len(attachmentBytes)),
		}

	}

	// -- now get it back

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	listAttachmentHandler.ServeHTTP(w, indexReq)

	resp := w.Result()

	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	if resp.StatusCode != 200 {
		t.Fatal("Got an error back from ListAttachments", string(body))
	}

	// comes back as JSON, leaving out the body

	retrievedAttachments := []api.Attachment{}

	jsonErr := json.Unmarshal(body, &retrievedAttachments)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	if len(retrievedAttachments) != len(createdAttachments) {
		t.Fatal("didn't get back the same number of attachments!")
	}

	for _, attachment := range retrievedAttachments {
		createdAttachment, ok := createdAttachments[attachment.ID]

		if !ok {
			t.Fatal("Got back an attachment with a different ID than one we created")
		}

		if createdAttachment.Filename != attachment.Filename {
			t.Log("We didn't get back matching filenames", createdAttachment.Filename, attachment.Filename)
			t.Fail()
		}

		if createdAttachment.Size != attachment.Size {
			t.Log("We didn't get back matching sizes", createdAttachment.Size, attachment.Size)
			t.Fail()
		}
	}

}

func TestListAttachmentDisabled(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	listAttachmentHandler := http.AttachmentListHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	// Attachments not enabled
	os.Setenv(api.AttachmentsEnabled, "0")
	listAttachmentHandler.ServeHTTP(w, indexReq)

	resp := w.Result()

	if resp.StatusCode != gohttp.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			resp.StatusCode, gohttp.StatusInternalServerError)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "Attachments is not implemented")
}

func TestListAttachmentError(t *testing.T) {
	var mockStore errorAttachmentStore
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	listAttachmentHandler := http.AttachmentListHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    &mockStore,
	}

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	// Attachments not enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	listAttachmentHandler.ServeHTTP(w, indexReq)

	resp := w.Result()

	if resp.StatusCode != gohttp.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			resp.StatusCode, gohttp.StatusInternalServerError)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "Attachment file not found")
}

func TestDeleteAttachment(t *testing.T) {
	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	certificationPath := "../testdata/attachments/signature-form.pdf"

	certificationBytes := readTestData(t, certificationPath)

	req := postAttachmentRequest(t, "signature-form.pdf", certificationBytes, account)
	w := httptest.NewRecorder()

	createAttachmentHandler := http.AttachmentSaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	createAttachmentHandler.ServeHTTP(w, req)

	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Fatal("Got an error back from CreateAttachment")
	}

	idBytes, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	attachmentID := string(idBytes)

	if attachmentID == "0" {
		t.Fatal("Should have gotten a real ID back instead of nothing")
	}

	// -- now delete it
	delW, delReq := standardResponseAndRequest("DELETE", "/me/attachments/"+attachmentID+"/delete", nil, account)
	delReq = mux.SetURLVars(delReq, map[string]string{
		"id": attachmentID,
	})

	delAttachmentHandler := http.AttachmentDeleteHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	delAttachmentHandler.ServeHTTP(delW, delReq)

	delResp := delW.Result()

	if delResp.StatusCode != 200 {
		t.Fatal("Got an error back from DelApplication")
	}

	// -- deleting again should return an error.

	delAgainW := httptest.NewRecorder()

	delAttachmentHandler.ServeHTTP(delAgainW, delReq)

	delAgainResp := delAgainW.Result()

	if delAgainResp.StatusCode != 404 {
		t.Fatal("Got an error back from DelApplication")
	}

	// -- now fail to get it back

	getW, getReq := standardResponseAndRequest("GET", "/me/attachments/"+attachmentID, nil, account)
	getReq = mux.SetURLVars(getReq, map[string]string{
		"id": attachmentID,
	})

	getAttachmentHandler := http.AttachmentGetHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	getAttachmentHandler.ServeHTTP(getW, getReq)

	getResp := getW.Result()

	if getResp.StatusCode != 404 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}
}
