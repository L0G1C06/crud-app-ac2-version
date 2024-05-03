package handler

import (
	"fmt"
	"net/http"

	"github.com/L0G1C06/crud-app/schemas"
	"github.com/gin-gonic/gin"
)

// @BasePath /api/v1

// @Summary Delete Users
// @Description Delete users from the app
// @Tags User
// @Accept json
// @Produce json
// @Param request body CreateCrudRequest true "Request body"
// @Success 200 {object} DeleteUserResponse
// @Failure 400 {object} ErrorResponse
// @Failure 500 {object} ErrorResponse
// @Router /user/delete [delete]
func DeleteUserHandler(ctx *gin.Context) {
	var requestBody struct {
		Username string `json:"username" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	username := requestBody.Username
	credentials := schemas.Credentials{}
	signupCredentials := schemas.Signup{}

	// Find User
	if err := db.First(&credentials, "username = ?", username).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("User with username: %s not found", username)})
		return
	}

	// Delete User
	if err := db.Delete(&credentials).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("error deleting user with username: %s", username)})
		return
	}

	// Find User
	if err := db.First(&signupCredentials, "username = ?", username).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("User with username: %s not found", username)})
		return
	}

	//// Delete User
	if err := db.Delete(&signupCredentials).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("error deleting user with username: %s", username)})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User deleted successfully", "data": credentials})
}