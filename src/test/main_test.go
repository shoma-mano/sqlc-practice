package test

import (
	"context"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/shoma-mano/go-sqlc/gen/sqlc"
	"github.com/shoma-mano/go-sqlc/src/db"
	"log"
	"os"
	"testing"
)

var Queries *sqlc.Queries

func TestMain(m *testing.M) {
	err := db.InitDB()
	if err != nil {
		fmt.Println(err)
	}
	queries, err := db.GetQuery()
	if err != nil {
		fmt.Println(err)
	}
	Queries = queries
	context := context.Background()
	authors, err := Queries.ListAccounts(context)
	if err != nil {
		println(err)
	}
	log.Println(authors)
	code := m.Run()
	os.Exit(code)
}
