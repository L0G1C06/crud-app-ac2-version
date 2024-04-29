package config

import (
	"fmt"

	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
)

var(
	db *gorm.DB
	logger *Logger 
)

func Init() error{
	var err error

	// Initialize SQLite
	db, err = InitializeSQLite()

	if err != nil{
		return fmt.Errorf("error initializing sqlite: %v", err)
	}

	return nil 
}

func GetSQLite() *gorm.DB{
	return db
}

func GetLogger(p string) *Logger{
	// Initialize logger 
	logger := NewLogger(p)
	return logger 
}

func HashPassword(password string) (string, error){
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}