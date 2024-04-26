package router

import (
	"github.com/gin-gonic/gin"
)

func Initialize(){
	// Initialize Router 
	router := gin.Default()

	// Initialize Routes 
	InitializeRoutes(router)

	// run the server
	router.Run("0.0.0.0:8000")
}