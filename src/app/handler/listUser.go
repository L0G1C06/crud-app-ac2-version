package handler

import (
	"net/http"

	"github.com/L0G1C06/crud-app/schemas"
	"github.com/gin-gonic/gin"
)

func ListUsersHandler(ctx *gin.Context) {
	credentials := []schemas.Credentials{}

	if err := db.Find(&credentials).Error; err != nil {
		SendError(ctx, http.StatusInternalServerError, "error listing users")
		return
	}

	SendSuccess(ctx, "list-openings", credentials)
}