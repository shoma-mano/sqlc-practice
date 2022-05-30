package db

import (
	"database/sql"
	"fmt"
	"github.com/shoma-mano/go-sqlc/gen/sqlc"
	"os"
)

var DB sqlc.DBTX

func InitDB() error {
	addr := os.Getenv("DB_ADDR")
	if addr == "" {
		addr = "127.0.0.1"
	}
	port := os.Getenv("DB_PORT")
	if port == "" {
		port = "3309"
	}
	db, err := sql.Open("mysql", fmt.Sprintf("root:root@(%s:%s)/test", addr, port))
	if err != nil {
		return err
	}
	DB = db
	return nil
}

func GetQuery() (*sqlc.Queries, error) {
	return sqlc.New(DB), nil
}
