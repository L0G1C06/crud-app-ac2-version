package schemas 

import (
	"gorm.io/gorm"
	"time"
)

// Database structure
type Credentials struct{
	gorm.Model
	Username string 
	Email string 
	Password string  // hash in code, before insert into database
	Role string
}

// API Response
type Response struct{
	ID uint `json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedtAt"`
	DeletedAt time.Time `json:"deletedAt"`
	Username string `json:"username"`
	Role string `json:"role"`
}