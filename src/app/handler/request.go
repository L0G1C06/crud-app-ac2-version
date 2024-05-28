package handler

import "fmt"

func errParamIsRequired(name, typ string) error{
	return fmt.Errorf("param: %s (type: %s) is required", name, typ)
}

// Create Crud operations 
type CreateCrudRequest struct{
	Username string `json:"username"`
	Email string `json:"email"`
	Password string `json:"password"`
	Role string `json:"role"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type SignupRequest struct{
	Username string `json:"username"`
	Email string `json:"email"`
	Password string `json:"password"`
}

type UpdateUserRequest struct{
	Username string `json:"username"`
	Email string `json:"email"`
	Password string `json:"password"`
	Role string `json:"role"`
}

func (r *CreateCrudRequest) Validate() error{
	if r.Username == "" && r.Email == "" && r.Password == "" && r.Role == ""{
		return fmt.Errorf("request body is empty")
	}	
	if r.Username == ""{
		return errParamIsRequired("username", "string")
	}
	if r.Email == ""{
		return errParamIsRequired("email", "string")
	}
	if r.Password == ""{
		return errParamIsRequired("password", "string")
	}
	if r.Role == ""{
		return errParamIsRequired("role", "string")
	}
	return nil 
}

func (r *UpdateUserRequest) Validate() error{
	// If any field is provided, validation is valid
	if r.Username != "" || r.Email != "" || r.Password != "" || r.Role != ""{
		return nil 
	}
	// If none of the fields were provided, return falsy
	return fmt.Errorf("at least one valid field must be provided")
}

func (r *SignupRequest) Validate() error{
	if r.Username == "" && r.Email == "" && r.Password == ""{
		return fmt.Errorf("request body is empty")
	}	
	if r.Username == ""{
		return errParamIsRequired("username", "string")
	}
	if r.Email == ""{
		return errParamIsRequired("email", "string")
	}
	if r.Password == ""{
		return errParamIsRequired("password", "string")
	}
	return nil 
}