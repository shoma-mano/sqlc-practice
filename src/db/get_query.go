package db

import (
	"database/sql"
	"github.com/shoma-mano/go-sqlc/sqlc"
)

var DB sqlc.DBTX

func InitDB() error {
	db, err := sql.Open("mysql", "root:root@(127.0.0.1:3309)/test")
	if err != nil {
		return err
	}
	DB = db
	return nil
}

func GetQuery() (*sqlc.Queries, error) {
	return sqlc.New(DB), nil
}
