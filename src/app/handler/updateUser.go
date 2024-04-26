package handler 

import (
	"net/http"

	"github.com/L0G1C06/crud-app/schemas"
	"github.com/gin-gonic/gin"
)

func UpdateUserHandler(ctx *gin.Context) {
	var request UpdateUserRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		SendError(ctx, http.StatusBadRequest, err.Error())
		return
	}

	if err := request.Validate(); err != nil {
		logger.Errorf("validation error: %v", err.Error())
		SendError(ctx, http.StatusBadRequest, err.Error())
		return
	}

	username := request.Username 

	credentials := schemas.Credentials{}
	if err := db.First(&credentials, "username = ?", username).Error; err != nil {
		SendError(ctx, http.StatusNotFound, "user not found")
		return
	}

	if request.Username != "" {
		credentials.Username = request.Username
	}
	if request.Password != "" {
		credentials.Password = request.Password
	}
	if request.Email != "" {
		credentials.Email = request.Email
	}
	if request.Role != "" {
		credentials.Role = request.Role
	}

	if err := db.Save(&credentials).Error; err != nil {
		logger.Errorf("error updating user: %v", err.Error())
		SendError(ctx, http.StatusInternalServerError, "error updating user")
		return
	}

	SendSuccess(ctx, "update-user", credentials)
}
