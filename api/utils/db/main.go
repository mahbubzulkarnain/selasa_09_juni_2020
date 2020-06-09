package db

import (
	"database/sql"
	"fmt"
	"os"
	"os/user"
	"strings"
)

// ConfigDB to ensure database configuration
type ConfigDB struct {
	Host     string
	Port     string
	User     string
	Password string
	Name     string
}

// ConnectToDB to connect to database
func Connect(stageEnv string) (*sql.DB, error) {
	env := strings.ToUpper(stageEnv)
	osUser, _ := user.Current()

	dbConfig := ConfigDB{
		Port:     os.Getenv(fmt.Sprintf("%s_DB_PORT", env)),
		Host:     os.Getenv(fmt.Sprintf("%s_DB_HOST", env)),
		User:     os.Getenv(fmt.Sprintf("%s_DB_USER", env)),
		Password: os.Getenv(fmt.Sprintf("%s_DB_PASSWORD", env)),
		Name:     os.Getenv(fmt.Sprintf("%s_DB_NAME", env)),
	}

	dataSourceName := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbConfig.Host,
		dbConfig.Port,
		dbConfig.User,
		dbConfig.Password,
		dbConfig.Name,
	)
	db, err := sql.Open("postgres", dataSourceName)
	if err != nil {
		return nil, err
	}

	db.Exec(fmt.Sprintf("SET application_name = 'API %s: %s'", env, osUser.Username))

	return db, nil
}
