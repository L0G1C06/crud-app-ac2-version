package handler 

import (
	"net/http"

	"github.com/L0G1C06/crud-app/schemas"
	"github.com/gin-gonic/gin"
)

func CountUsersHandler(ctx *gin.Context) {
	var count int64
	if err := db.Model(&schemas.Credentials{}).Count(&count).Error; err != nil {
		SendError(ctx, http.StatusInternalServerError, "error counting users")
		return
	}

	SendSuccess(ctx, "count-users", count)
}