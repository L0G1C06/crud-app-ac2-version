package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Initialize(){
	// Initialize Router 
	router := gin.Default()

	// Configure midleware CORS
	router.Use(cors.New(cors.Config{
        AllowOrigins: []string{"*"},
        AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
    }))

	// Initialize Routes 
	InitializeRoutes(router)

	// run the server
	router.Run("0.0.0.0:8000")
}