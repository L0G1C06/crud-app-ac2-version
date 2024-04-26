package main 

import (
	"github.com/L0G1C06/crud-app/config"
	"github.com/L0G1C06/crud-app/router"
)

func main() {
	logger := config.GetLogger("main")
	// Initialize Configs
	err := config.Init()
	if err != nil{
		logger.Errorf("config initialization error: %v", err)
		return 
	}

	// Initialize router
	router.Initialize()
}