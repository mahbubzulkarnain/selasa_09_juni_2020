package middlewares

import (
	"github.com/labstack/echo"
	"github.com/mahbubzulkarnain/selasa_09_juni_2020/api/utils"
	"net/http"
	"strings"
)

// CheckIsAdmin function for checking user is admin
func UserIsAdmin(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		res, err := utils.JWTParser(c)
		if err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]interface{}{
				"message": `You are not authorized`,
			})
		}

		if strings.EqualFold(res["role_name"].(string), "Admin") {
			return next(c)
		}

		return c.JSON(http.StatusUnauthorized, map[string]interface{}{
			"message": `You are not authorized`,
		})
	}

}
