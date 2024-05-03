package handler

import (
	"net/http"

	"github.com/L0G1C06/crud-app/config"
	"github.com/L0G1C06/crud-app/schemas"
	"github.com/gin-gonic/gin"
)

// @BasePath /api/v1

// @Summary Signup User
// @Description Create admin user
// @Tags User
// @Accept json
// @Produce json
// @Param request body SignupRequest true "Request body"
// @Success 200 {object} SignupResponse
// @Failure 400 {object} ErrorResponse
// @Failure 500 {object} ErrorResponse
// @Router /user/signup [post]
func SignupHandler(ctx *gin.Context) {
	var request SignupRequest

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
	existingUser := schemas.Signup{}
	if err := db.Where("username = ?", request.Username).First(&existingUser).Error; err == nil {
		SendError(ctx, http.StatusConflict, "username already exists")
		return
	}

	// Hash the password
	hashedPassword, err := config.HashPassword(request.Password)
	if err != nil {
		logger.Errorf("error hashing password: %v", err.Error())
		SendError(ctx, http.StatusInternalServerError, "error hashing password")
		return
	}

	signup := schemas.Signup{
		Username: request.Username,
		Email:    request.Email,
		Password: hashedPassword, // Use the hashed password
	}

	if err := db.Create(&signup).Error; err != nil {
		logger.Errorf("error creating user: %v", err.Error())
		SendError(ctx, http.StatusInternalServerError, "error creating user on database")
		return
	}

	SendSuccess(ctx, "signup", signup)
}
