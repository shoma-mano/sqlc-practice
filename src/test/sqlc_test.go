package test

import (
	"context"
	"database/sql"
	"github.com/shoma-mano/go-sqlc/gen/sqlc"
	"log"
	"testing"
)

func TestListAccounts(t *testing.T) {
	context := context.Background()
	authors, err := Queries.ListAccounts(context)
	if err != nil {
		println(err)
	}
	log.Println(authors)
}

func TestCreateCategory(t *testing.T) {
	context := context.Background()
	result, err := Queries.CreateCategory(context, sqlc.CreateCategoryParams{
		TweetID: 1,
		Content: sql.NullString{
			String: "testCreate",
			Valid:  true,
		},
	})
	if err != nil {
		println(err)
	}
	log.Println(result.RowsAffected())
}
