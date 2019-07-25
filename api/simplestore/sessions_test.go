package simplestore

import (
	"database/sql"
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/google/uuid"
)

func getTestObjects(t *testing.T) (SimpleStore, api.Account, string) {
	ss := getSimpleStore()
	account := createAccount(t, ss)
	UUID := uuid.New().String()
	return ss, account, UUID
}

func timeIsCloseToTime(test time.Time, expected time.Time, diff time.Duration) bool {
	lowerBound := expected.Add(-diff)
	upperBound := expected.Add(diff)

	if !(test.After(lowerBound) && test.Before(upperBound)) {
		return false
	}
	return true
}

func TestCreateSessionOverwritesPreviousRecord(t *testing.T) {
	store, account, firstSessionKey := getTestObjects(t)
	expirationDuration := 5 * time.Minute

	firstCreateErr := store.CreateOrUpdateSession(account.ID, firstSessionKey, NullString(), expirationDuration)
	if firstCreateErr != nil {
		t.Fatal(firstCreateErr)
	}

	firstFetchedAccount, _, fetchErr := store.ExtendAndFetchSessionAccount(firstSessionKey, expirationDuration)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	secondSessionKey := uuid.New().String()
	secondCreateErr := store.CreateOrUpdateSession(account.ID, secondSessionKey, NullString(), expirationDuration)
	if secondCreateErr != nil {
		t.Fatal(secondCreateErr)
	}

	secondFetchedAccount, _, fetchErr := store.ExtendAndFetchSessionAccount(secondSessionKey, expirationDuration)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	if firstFetchedAccount != secondFetchedAccount {
		t.Fatal("both fetches should return the same account")
	}

	_, _, expectedFetchErr := store.ExtendAndFetchSessionAccount(firstSessionKey, expirationDuration)
	if expectedFetchErr != api.ErrValidSessionNotFound {
		t.Fatal("using the first session key should cause an error to be thrown, since it has been overwritten")
	}
}

func TestFetchSessionReturnsAccountAndSessionOnValidSession(t *testing.T) {
	store, account, sessionKey := getTestObjects(t)
	expirationDuration := 5 * time.Minute

	createErr := store.CreateOrUpdateSession(account.ID, sessionKey, NullString(), expirationDuration)
	if createErr != nil {
		t.Fatal(createErr)
	}

	actualAccount, actualSession, err := store.ExtendAndFetchSessionAccount(sessionKey, expirationDuration)
	if err != nil {
		t.Fatal(err)
	}

	if actualAccount != account {
		t.Fatal("actual returned account does not match expected returned account")
	}

	if !(actualSession.AccountID == account.ID && actualSession.SessionKey == sessionKey && actualSession.SessionIndex == NullString()) {
		t.Fatal("Didn't get the expected session values back", actualSession)
	}

	expectedExpiration := time.Now().UTC().Add(expirationDuration)
	if !timeIsCloseToTime(actualSession.ExpirationDate, expectedExpiration, time.Second) {
		t.Fatal("The returned expiration date is different from the expected", actualSession.ExpirationDate, expectedExpiration)
	}

}

func TestFetchSessionExtendsValidSession(t *testing.T) {
	store, account, sessionKey := getTestObjects(t)

	shortInitialDuration := 5 * time.Minute

	createErr := store.CreateOrUpdateSession(account.ID, sessionKey, NullString(), shortInitialDuration)
	if createErr != nil {
		t.Fatal(createErr)
	}

	_, session, err := store.ExtendAndFetchSessionAccount(sessionKey, shortInitialDuration)
	if err != nil {
		t.Fatal(err)
	}

	expectedExpiration := time.Now().UTC().Add(shortInitialDuration)
	if !timeIsCloseToTime(session.ExpirationDate, expectedExpiration, time.Second) {
		t.Fatal("The returned expiration date is different from the expected", session.ExpirationDate, expectedExpiration)
	}

	longDuration := 5 * time.Hour
	_, secondSession, err := store.ExtendAndFetchSessionAccount(sessionKey, longDuration)
	if err != nil {
		t.Fatal(err)
	}

	expectedLongExpiration := time.Now().UTC().Add(longDuration)
	if !timeIsCloseToTime(secondSession.ExpirationDate, expectedLongExpiration, time.Second) {
		t.Fatal("The returned expiration date is different from the expected", secondSession.ExpirationDate, expectedLongExpiration)
	}

}

func TestFetchSessionReturnsErrorOnExpiredSession(t *testing.T) {
	store, account, sessionKey := getTestObjects(t)
	expirationDuration := -10 * time.Minute

	createErr := store.CreateOrUpdateSession(account.ID, sessionKey, NullString(), expirationDuration)
	if createErr != nil {
		t.Fatal(createErr)
	}

	_, _, err := store.ExtendAndFetchSessionAccount(sessionKey, expirationDuration)
	if err != api.ErrValidSessionNotFound {
		t.Fatal(err)
	}
}

func TestDeleteSessionRemovesRecord(t *testing.T) {
	store, account, sessionKey := getTestObjects(t)
	expirationDuration := 5 * time.Minute
	store.CreateOrUpdateSession(account.ID, sessionKey, NullString(), expirationDuration)

	fetchQuery := `SELECT * FROM sessions WHERE session_key = $1`
	row := api.Session{}
	store.db.Get(&row, fetchQuery, sessionKey)
	if row.SessionKey != sessionKey {
		t.Fatal("new session should have been created")
	}

	err := store.DeleteSession(sessionKey)
	if err != nil {
		t.Fatal("encountered issue when trinyg to delete session")
	}

	row = api.Session{}
	expectedErr := store.db.Get(&row, fetchQuery, sessionKey)
	if expectedErr != sql.ErrNoRows {
		t.Fatal("session should not exist")
	}
}

func TestDeleteSessionReturnsErrIfSessionNotFound(t *testing.T) {
	store := getSimpleStore()
	sessionKeyWithNoAssociatedRecord := uuid.New().String()

	err := store.DeleteSession(sessionKeyWithNoAssociatedRecord)
	if err != api.ErrValidSessionNotFound {
		t.Fatal("session should not exist")
	}
}
