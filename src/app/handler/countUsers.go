package handler 

import (
	"net/http"

	"github.com/L0G1C06/crud-app/schemas"
	"github.com/gin-gonic/gin"
)

// @BasePath /api/v1

// @Summary Count Users
// @Description Counts the number of users registered in the app
// @Tags Users
// @Accept json
// @Produce json
// @Success 200 {object} ListUsersReponse
// @Failure 400 {object} ErrorResponse
// @Failure 500 {object} ErrorResponse
// @Router /users/count [get]
func CountUsersHandler(ctx *gin.Context) {
	var count int64
	if err := db.Model(&schemas.Credentials{}).Count(&count).Error; err != nil {
		SendError(ctx, http.StatusInternalServerError, "error counting users")
		return
	}

	SendSuccess(ctx, "count-users", count)
}