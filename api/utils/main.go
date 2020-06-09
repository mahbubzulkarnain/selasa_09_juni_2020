package utils

import (
	"errors"
	"net/http"
	"regexp"

	"github.com/lib/pq"
	log "github.com/sirupsen/logrus"

	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/models"
)

// GetStatusCode represent the statusCode
func GetStatusCode(err error) int {
	if err == nil {
		return http.StatusOK
	}
	switch err {
	case models.ErrInternalServerError:
		return http.StatusInternalServerError
	case models.ErrNotFound:
		return http.StatusNotFound
	case models.ErrConflict:
		return http.StatusConflict
	default:
		return http.StatusInternalServerError
	}
}

// IsValidUUID for validation is uuid
func IsValidUUID(uuid string) bool {
	r := regexp.MustCompile("^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[8|9|aA|bB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$")
	return r.MatchString(uuid)
}

// Check for fixing "Error return value of '' is not checked (errcheck)"
func Check(f func() error) {
	if err := f(); err != nil {
		log.Error(err)
	}
}

// PQErrorParser function for handle error from PostgreSQL
func PQErrorParser(err error) error {
	if err == nil {
		return nil
	}

	log.Error(err)

	if pqError, ok := err.(*pq.Error); ok {
		switch pqError.Code {
		case "23502":
			return errors.New("missing or invalid variable")
		case "23503":
			return errors.New("missing or invalid foreign key")
		case "23505":
			return errors.New("already exist")
		case "28000":
			return errors.New(pqError.Message)
		}
	}
	return errors.New("internal server error")
}
