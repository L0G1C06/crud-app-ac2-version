package handler 

import (
	"net/http"

	"github.com/L0G1C06/crud-app/schemas"
	"github.com/gin-gonic/gin"
)

func AddHandler(ctx *gin.Context){
	var request CreateCrudRequest
	if err := ctx.ShouldBindJSON(&request); err != nil{
		SendError(ctx, http.StatusBadRequest, err.Error())
		return 
	}

	if err := request.Validate(); err != nil{
		logger.Errorf("validation error: %v", err.Error())
		SendError(ctx, http.StatusBadRequest, err.Error())
		return 
	}

	addUser := schemas.Credentials{
		Username: request.Username,
		Email: request.Email,
		Password: request.Password,
		Role: request.Role,
	}

	if err := db.Create(&addUser).Error; err != nil{
		logger.Errorf("error adding user: %v", err.Error())
		SendError(ctx, http.StatusInternalServerError, "error adding user on database")
		return 
	}

	SendSuccess(ctx, "add-user", addUser.Username)
}