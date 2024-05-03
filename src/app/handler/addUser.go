package handler

import (
	"net/http"

	"github.com/L0G1C06/crud-app/schemas"
	"github.com/gin-gonic/gin"
)

// @BasePath /api/v1

// @Summary Add User
// @Description Create a new non-admin user from inside the app
// @Tags User
// @Accept json
// @Produce json
// @Param request body CreateCrudRequest true "Request body"
// @Success 200 {object} SignupResponse
// @Failure 400 {object} ErrorResponse
// @Failure 500 {object} ErrorResponse
// @Router /user/add [post]
func AddHandler(ctx *gin.Context) {
	var request CreateCrudRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		SendError(ctx, http.StatusBadRequest, err.Error())
		return
	}

	if err := request.Validate(); err != nil {
		logger.Errorf("validation error: %v", err.Error())
		SendError(ctx, http.StatusBadRequest, err.Error())
		return
	}

	addUser := schemas.Credentials{
		Username: request.Username,
		Email:    request.Email,
		Password: request.Password,
		Role:     request.Role,
	}

	if err := db.Create(&addUser).Error; err != nil {
		logger.Errorf("error adding user: %v", err.Error())
		SendError(ctx, http.StatusInternalServerError, "error adding user on database")
		return
	}

	SendSuccess(ctx, "add-user", addUser.Username)
}
