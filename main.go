package main

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/shoma-mano/go-sqlc/gen/pb"
	"github.com/shoma-mano/go-sqlc/gen/sqlc"
	"github.com/shoma-mano/go-sqlc/src/db"
	"github.com/shoma-mano/go-sqlc/src/service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"log"
	"net"
	"reflect"

	_ "github.com/go-sql-driver/mysql"
)

func run() error {
	ctx := context.Background()

	err := db.InitDB()
	if err != nil {
		fmt.Println(err)
	}

	queries, err := db.GetQuery()
	if err != nil {
		fmt.Println(err)
	}

	// list all authors
	authors, err := queries.ListAccounts(ctx)
	if err != nil {
		return err
	}
	log.Println(authors)

	// create an author
	result, err := queries.CreateAccount(ctx, sqlc.CreateAccountParams{
		Name: "Brian Kernighan",
		Bio:  sql.NullString{String: "Co-author of The C Programming Language and The Go Programming Language", Valid: true},
		Uid:  "test",
	})
	if err != nil {
		return err
	}

	insertedAccountID, err := result.LastInsertId()
	if err != nil {
		return err
	}
	log.Println(insertedAccountID)

	// get the author we just inserted
	fetchedAccount, err := queries.GetAccount(ctx, "0")
	if err != nil {
		return err
	}

	// prints true
	log.Println(reflect.DeepEqual(insertedAccountID, fetchedAccount.ID))
	return nil
}

func main() {
	port := 50051
	listenPort, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	server := grpc.NewServer()
	pb.RegisterAccountServiceServer(server, service.ReturnAccountService())

	if err := run(); err != nil {
		log.Fatal(err)
	}

	reflection.Register(server)
	server.Serve(listenPort)
}
