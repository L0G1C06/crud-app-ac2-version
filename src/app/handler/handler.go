package handler

import (
	"github.com/L0G1C06/crud-app/config"
	"gorm.io/gorm"
)

var(
	logger *config.Logger
	db *gorm.DB
)

func InitializeHandler(){
	logger = config.GetLogger("handler")
	db = config.GetSQLite()
}