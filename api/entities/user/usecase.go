package user

import (
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/models"
)

// Usecase represent the user's usecases
type Usecase interface {
	Login(username string, password string) (string, error)
	Fetch(page int) ([]*models.UserFetch, error)
	FetchByID(ID string) (*models.UserFetchByID, error)
	Store(map[string]interface{}) (map[string]interface{}, error)
	Update(string, map[string]interface{}) (map[string]interface{}, error)
	Delete(ID string) (bool, error)
}
