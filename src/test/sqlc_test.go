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
	result, err := Queries.CreateCategory(context, sql.NullString{
		String: "testCreate",
		Valid:  true,
	},
	)
	if err != nil {
		println(err)
	}
	log.Println(result.RowsAffected())
}

func TestCreateTweetQuery(t *testing.T) {
	context := context.Background()
	result, err := Queries.CreateTweet(context, sqlc.CreateTweetParams{
		Content: sql.NullString{
			String: "testCreate",
			Valid:  true,
		},
		AccountID: 1,
	})
	if err != nil {
		println(err)
	}
	log.Println(result.RowsAffected())
}
