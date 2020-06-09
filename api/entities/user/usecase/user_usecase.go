package usecase

import (
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/entities/user"
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/models"
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/utils"
)

type userUsecase struct {
	userRepo user.Repository
}

// NewUserUsecase will create new an userUsecase object representation of user.Usecase interface
func NewUserUsecase(u user.Repository) user.Usecase {
	return &userUsecase{
		userRepo: u,
	}
}

func (uu *userUsecase) Login(username string, password string) (string, error) {
	u, err := uu.userRepo.Login(username, password)
	if err != nil {
		return "", err
	}
	return utils.CreateToken(u.UserID, u.RoleName)
}

func (uu *userUsecase) Fetch(page int) ([]*models.UserFetch, error) {
	return uu.userRepo.Fetch(page)
}

func (uu *userUsecase) FetchByID(ID string) (*models.UserFetchByID, error) {
	return uu.userRepo.FetchByID(ID)
}

func (uu *userUsecase) Store(m map[string]interface{}) (map[string]interface{}, error) {
	res, err := uu.userRepo.Store(m)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (uu *userUsecase) Update(userID string, u map[string]interface{}) (map[string]interface{}, error) {
	res, err := uu.userRepo.Update(userID, u)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (uu *userUsecase) Delete(email string) (bool, error) {
	res, err := uu.userRepo.Delete(email)

	if err != nil {
		return false, err
	}

	return res, nil
}
