package user

import (
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/models"
)

// Repository represent the user's repository contract
type Repository interface {
	Login(username string, password string) (*models.UserLogin, error)
	Fetch(page int) ([]*models.UserFetch, error)
	FetchByID(ID string) (*models.UserFetchByID, error)
	Store(d map[string]interface{}) (res map[string]interface{}, err error)
	Update(string, map[string]interface{}) (map[string]interface{}, error)
	Delete(ID string) (bool, error)
}
