package main

import (
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"

	http2 "github.com/mahbubzulkarnain/selasa_09_juni_2020/api/entities/user/delivery/http"
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/entities/user/repository"
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/entities/user/usecase"
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/utils"
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/utils/db"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("error getting env, %v", err)
	}

	stageEnv := os.Getenv("GO_ENV")

	// connect to db
	dbConn, errConn := db.Connect(stageEnv)
	if errConn != nil {
		panic(errConn)
	}

	defer utils.Check(dbConn.Close)

	e := echo.New()

	e.GET("/ping", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]interface{}{
			"message": "pong!!",
		})
	})

	// User
	userRepository := repository.NewPostgreUserRepository(dbConn)
	userUsecase := usecase.NewUserUsecase(userRepository)
	http2.NewUserHandler(e, userUsecase)

	log.Fatal(e.Start(":9000"))
}
