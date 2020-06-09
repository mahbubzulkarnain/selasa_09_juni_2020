package http

import (
	"encoding/json"
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/middlewares"
	log "github.com/sirupsen/logrus"
	"net/http"
	"strconv"

	"github.com/labstack/echo"

	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/entities/user"
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/utils"
)

// UserHandler  represent the httphandler for user
type UserHandler struct {
	Usecase user.Usecase
}

// NewUserHandler will initialize the users/ resources endpoint
func NewUserHandler(e *echo.Echo, uu user.Usecase) {
	handler := &UserHandler{
		Usecase: uu,
	}
	e.POST("/login", handler.Login)

	e.GET("/users", handler.Fetch, middlewares.UserIsAdmin)
	e.GET("/users/:userId", handler.FetchByID)

	e.POST("/users", handler.Store, middlewares.UserIsAdmin)
	e.PUT("/users/:userId", handler.Update, middlewares.UserIsAdmin)
	e.DELETE("/users/:userId", handler.Delete, middlewares.UserIsAdmin)
}

func (handler *UserHandler) Login(c echo.Context) error {
	body := make(map[string]interface{})

	err := json.NewDecoder(c.Request().Body).Decode(&body)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]interface{}{
			"message": err.Error(),
			"data":    nil,
		})
	}
	res, err := handler.Usecase.Login(
		body["username"].(string),
		body["password"].(string),
	)
	if err != nil {
		return c.JSON(utils.GetStatusCode(err), map[string]interface{}{
			"message": err.Error(),
			"data":    nil,
		})
	}

	return c.JSON(utils.GetStatusCode(err), map[string]interface{}{
		"message": "success",
		"data":    res,
	})
}

// Fetch will fetch user list
func (handler *UserHandler) Fetch(c echo.Context) error {
	qPage := c.QueryParam("page")

	page, err := strconv.Atoi(qPage)
	if err != nil {
		page = 1
		log.Error(err)
	}

	res, err := handler.Usecase.Fetch(page)
	if err != nil {
		return c.JSON(utils.GetStatusCode(err), map[string]interface{}{
			"message": err.Error(),
			"data":    nil,
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "success",
		"data":    res,
	})
}

// Fetch will fetch user list
func (handler *UserHandler) FetchByID(c echo.Context) error {
	userID := c.Param("userId")
	res, err := handler.Usecase.FetchByID(userID)
	if err != nil {
		return c.JSON(utils.GetStatusCode(err), map[string]interface{}{
			"message": err.Error(),
			"data":    nil,
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "success",
		"data":    res,
	})
}

// Store will store the user by given request body
func (handler *UserHandler) Store(c echo.Context) error {
	body := make(map[string]interface{})

	err := json.NewDecoder(c.Request().Body).Decode(&body)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]interface{}{
			"message": err.Error(),
			"data":    nil,
		})
	}

	res, errStore := handler.Usecase.Store(body)
	if errStore != nil {
		return c.JSON(utils.GetStatusCode(errStore), map[string]interface{}{
			"message": errStore.Error(),
			"data":    nil,
		})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"message": "success",
		"data":    res,
	})
}

// Update will update user's profile
func (handler *UserHandler) Update(c echo.Context) error {
	userID := c.Param("userId")

	body := make(map[string]interface{})

	err := json.NewDecoder(c.Request().Body).Decode(&body)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, map[string]interface{}{
			"message": err.Error(),
			"data":    nil,
		})
	}

	res, err := handler.Usecase.Update(userID, body)
	if err != nil {
		return c.JSON(utils.GetStatusCode(err), map[string]interface{}{
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "success",
		"data":    res,
	})
}

func (handler *UserHandler) Delete(c echo.Context) error {
	email := c.Param("userId")

	res, err := handler.Usecase.Delete(email)

	if err != nil {
		return c.JSON(utils.GetStatusCode(err), map[string]interface{}{
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "success",
		"data":    res,
	})
}
