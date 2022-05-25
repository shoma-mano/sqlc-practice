package main

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/shoma-mano/go-sqlc/sqlc"
	"github.com/shoma-mano/go-sqlc/src/db"
	"log"
	"reflect"

	_ "github.com/go-sql-driver/mysql"
)

func run() error {
	ctx := context.Background()

	//db, err := sql.Open("mysql", "root:root@(127.0.0.1:3309)/test")
	//if err != nil {
	//	return err
	//}
	//
	//queries := tutorial.New(db)

	err := db.InitDB()
	if err != nil {
		fmt.Println(err)
	}

	queries, err := db.GetQuery()
	if err != nil {
		fmt.Println(err)
	}

	// list all authors
	authors, err := queries.ListAuthors(ctx)
	if err != nil {
		return err
	}
	log.Println(authors)

	// create an author
	result, err := queries.CreateAuthor(ctx, sqlc.CreateAuthorParams{
		Name: "Brian Kernighan",
		Bio:  sql.NullString{String: "Co-author of The C Programming Language and The Go Programming Language", Valid: true},
		Uid:  "test",
	})
	if err != nil {
		return err
	}

	insertedAuthorID, err := result.LastInsertId()
	if err != nil {
		return err
	}
	log.Println(insertedAuthorID)

	// get the author we just inserted
	fetchedAuthor, err := queries.GetAuthor(ctx, insertedAuthorID)
	if err != nil {
		return err
	}

	// prints true
	log.Println(reflect.DeepEqual(insertedAuthorID, fetchedAuthor.ID))
	return nil
}

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}
