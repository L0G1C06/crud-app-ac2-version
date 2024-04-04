package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
	"github.com/rs/cors"
)

type RegisterUser struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginUser struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func main() {
	db, err := sql.Open("sqlite3", "./database/signup.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	createUsersTable(db)

	mux := http.NewServeMux()
	mux.HandleFunc("/api/register", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var regUser RegisterUser
		if err := DecodeJSONBody(w, r, &regUser); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err := saveUser(db, regUser)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Fprintf(w, "User successfuly registered!")
	})
	mux.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var logUser LoginUser
		if err := DecodeJSONBody(w, r, &logUser); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err := retrieveUser(db, logUser)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Fprintf(w, "Login data requested successfully")
	})
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	})
	handler := c.Handler(mux)
	log.Println("API server created and listening in :8000")
	log.Fatal(http.ListenAndServe(":8000", handler))
}

func createUsersTable(db *sql.DB) {
	sqlStmt := `
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			email TEXT UNIQUE NOT NULL,
			username TEXT UNIQUE NOT NULL,
			password TEXT NOT NULL
		);
	`
	_, err := db.Exec(sqlStmt)
	if err != nil {
		log.Fatalf("Error creating the user table: %v\n", err)
	}
}

func saveUser(db *sql.DB, regUser RegisterUser) error {
	stmt, err := db.Prepare("INSERT INTO users(email, username, password) VALUES (?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(regUser.Email, regUser.Username, regUser.Password)
	if err != nil {
		return err
	}
	return nil
}

func retrieveUser(db *sql.DB, logUser LoginUser) error {
	stmt, err := db.Prepare("SELECT username, password FROM users WHERE username = ?")
	if err != nil{
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(logUser.Username)
	if err != nil{
		return err
	}
	return nil
}

func DecodeJSONBody(w http.ResponseWriter, r *http.Request, data interface{}) error {
	if r.Header.Get("Content-Type") != "application/json" {
		return fmt.Errorf("the content type of the request body must be application/json")
	}

	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()

	err := decoder.Decode(data)
	if err != nil {
		return err
	}
	return nil
}
