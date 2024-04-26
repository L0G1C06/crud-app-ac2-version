package router

import (
	docs "github.com/L0G1C06/crud-app/docs"
	"github.com/L0G1C06/crud-app/handler"
	"github.com/gin-gonic/gin"
	"github.com/swaggo/files"
	"github.com/swaggo/gin-swagger"
)

func InitializeRoutes(router *gin.Engine){
	// Initialize handler (logger and database)
	handler.InitializeHandler()
	basePath := "/api/v1"
	docs.SwaggerInfo.BasePath = basePath
	v1 := router.Group(basePath)
	{
		v1.POST("/user/login", handler.LoginHandler)
		v1.POST("/user/signup", handler.SignupHandler)
		v1.DELETE("/user/delete", handler.DeleteUserHandler)
		v1.PUT("/user/update", handler.UpdateUserHandler)
		v1.GET("/users/list", handler.ListUsersHandler)
	}

	// Initialize swagger
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
}