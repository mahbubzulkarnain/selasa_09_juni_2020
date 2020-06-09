package repository

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/gofrs/uuid"
	"github.com/lib/pq"
	log "github.com/sirupsen/logrus"

	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/entities/user"
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/models"
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/utils"
)

type postgreRepository struct {
	Conn *sql.DB
}

// NewPostgreAccessTypeRepository will create an object that represent the accessType.Repository interface
func NewPostgreUserRepository(Conn *sql.DB) user.Repository {
	return &postgreRepository{
		Conn,
	}
}

func (pr *postgreRepository) Login(username string, password string) (*models.UserLogin, error) {
	u := new(models.UserLogin)
	err := pr.Conn.QueryRow(`
		SELECT 
			u.id as "user_id", 
			r.role_name
		FROM users u
		INNER JOIN (
			SELECT id, trim('"' FROM ("data" -> 'role_name')::text) AS "role_name" FROM roles WHERE deleted_at ISNULL 
		) r ON r.id = u.role_id
		WHERE u.deleted_at IS NULL AND u.data->>'username' = $1 AND u.DATA->>'is_active'= 'true';
	`, username).Scan(&u.UserID, &u.RoleName)

	return u, pqErrorParser(err)
}

func (pr *postgreRepository) Fetch(page int) ([]*models.UserFetch, error) {
	limit := 5
	offset := limit * (page - 1)

	stmt := fmt.Sprintf(`
		SELECT 
		    trim('"' FROM ("data"->'username')::text) AS "username", 
			trim('"' FROM ("data"->'email')::text)  AS "email",
			"data"->'is_active' AS "status"
		FROM users OFFSET %v LIMIT %v;
	`, offset, limit)

	rows, err := pr.Conn.Query(stmt)
	if err != nil {
		log.Error(err)

		return []*models.UserFetch{}, err
	}
	defer utils.Check(rows.Close)

	result := make([]*models.UserFetch, 0)
	for rows.Next() {
		u := new(models.UserFetch)
		err := rows.Scan(
			&u.Username,
			&u.Email,
			&u.Status,
		)

		if err != nil {
			log.Error(err)
			return []*models.UserFetch{}, pqErrorParser(err)
		}

		result = append(result, u)
	}

	return result, nil
}

func (pr *postgreRepository) FetchByID(ID string) (*models.UserFetchByID, error) {
	u := new(models.UserFetchByID)
	err := pr.Conn.QueryRow(`
		SELECT 
			u.id as "user_id", 
		   	trim('"' FROM (u."data"->'username')::text) AS "username", 
			trim('"' FROM (u."data"->'email')::text) AS "email",
			r.role_name
		FROM users u
		INNER JOIN (
			SELECT id, trim('"' FROM ("data" -> 'role_name')::text) AS "role_name" FROM roles WHERE deleted_at ISNULL 
		) r ON r.id = u.role_id
		WHERE u.deleted_at IS NULL AND u.id = $1;
	`, ID).Scan(&u.UserID, &u.Username, &u.Email, &u.RoleName)

	return u, pqErrorParser(err)
}

func (pr *postgreRepository) Store(d map[string]interface{}) (map[string]interface{}, error) {
	newUUID, errNewUUID := uuid.NewV4()
	if errNewUUID != nil {
		log.Fatalf("failed to generate UUID: %v", errNewUUID)
		return nil, errNewUUID
	}

	data, errParse := json.Marshal(d["data"])
	if errParse != nil {
		return nil, errParse
	}

	stmt := `
		INSERT INTO "users" ("id", "data", "role_id")
		VALUES ($1, $2, $3)`
	_, err := pr.Conn.Exec(stmt, newUUID, string(data), d["role_id"])
	if err != nil {
		log.Error(err)
		return nil, pqErrorParser(err)
	}

	var res = map[string]interface{}{
		"id": newUUID,
	}

	return res, nil
}

func (pr *postgreRepository) Update(userID string, u map[string]interface{}) (map[string]interface{}, error) {
	if valid := utils.IsValidUUID(userID); !valid {
		return nil, errors.New("user id of user is not valid")
	}

	stmt := fmt.Sprintf(`SELECT id from "users" WHERE id = $$%s$$ AND "deleted_at" IS NULL`, userID)

	if err := pr.Conn.QueryRow(stmt).Scan(&userID); err != nil {
		log.Error(err)
		return nil, errors.New("not found user with userId: " + userID)
	}

	data, errParse := json.Marshal(u["data"])
	if errParse != nil {
		return nil, errParse
	}

	stmt = `
		UPDATE "users" SET "data" = $2, "role_id" = $3
		WHERE id = $1`
	_, err := pr.Conn.Exec(stmt, userID, string(data), u["role_id"])
	if err != nil {
		return nil, pqErrorParser(err)
	}
	return u, nil
}

func (pr *postgreRepository) Delete(ID string) (bool, error) {
	stmt := `UPDATE "users" SET "deleted_at" = NOW() WHERE id = $1;`

	_, err := pr.Conn.Exec(stmt, ID)

	if err != nil {
		return false, pqErrorParser(err)
	}

	return true, nil
}

func pqErrorParser(err error) error {
	if pqError, ok := err.(*pq.Error); ok {
		switch pqError.Code {
		case "23505":
			log.Error(err)
			return errors.New("user already exist")
		}
	}
	return utils.PQErrorParser(err)
}
