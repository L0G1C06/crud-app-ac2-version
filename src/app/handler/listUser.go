package handler

import (
	"net/http"

	"github.com/L0G1C06/crud-app/schemas"
	"github.com/gin-gonic/gin"
)

// @BasePath /api/v1

// @Summary List Active Users
// @Description List active users in the app
// @Tags Users
// @Accept json
// @Produce json
// @Success 200 {object} ListUsersReponse
// @Failure 400 {object} ErrorResponse
// @Failure 401 {object} ErrorResponse
// @Failure 500 {object} ErrorResponse
// @Router /users/list [get]
func ListUsersHandler(ctx *gin.Context) {
	credentials := []schemas.Credentials{}

	if err := db.Find(&credentials).Error; err != nil {
		SendError(ctx, http.StatusInternalServerError, "error listing users")
		return
	}

	SendSuccess(ctx, "list-openings", credentials)
}