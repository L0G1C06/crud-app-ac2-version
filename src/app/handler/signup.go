package handler

import (
	"net/http"

	"github.com/L0G1C06/crud-app/schemas"
	"github.com/gin-gonic/gin"
)

func SignupHandler(ctx *gin.Context) {
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

	// Check if username already exists
	existingUser := schemas.Credentials{}
	if err := db.Where("username = ?", request.Username).First(&existingUser).Error; err == nil {
		SendError(ctx, http.StatusConflict, "username already exists")
		return
	}

	signup := schemas.Credentials{
		Username: request.Username,
		Email:    request.Email,
		Password: request.Password,
		Role:     request.Role,
	}

	if err := db.Create(&signup).Error; err != nil {
		logger.Errorf("error creating user: %v", err.Error())
		SendError(ctx, http.StatusInternalServerError, "error creating user on database")
		return
	}

	SendSuccess(ctx, "signup", signup)
}