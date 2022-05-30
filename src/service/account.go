package service

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/shoma-mano/go-sqlc/gen/pb"
	"github.com/shoma-mano/go-sqlc/gen/sqlc"
	"github.com/shoma-mano/go-sqlc/src/db"
)

type AccountService struct {
}

func (a AccountService) CreateAccount(ctx context.Context, input *pb.CreateAccountInput) (*pb.AffectedRows, error) {
	query, err := db.GetQuery()
	if err != nil {
		return nil, err
	}
	fmt.Println(input)
	ac, err := query.CreateAccount(ctx, sqlc.CreateAccountParams{
		Name: input.Name,
		Bio: sql.NullString{
			String: *input.Bio,
			Valid:  true,
		},
		Uid: input.UID,
	})
	affectedRows, _ := ac.RowsAffected()
	return &pb.AffectedRows{AffectedRows: uint64(affectedRows)}, nil
}

func (a AccountService) FindOneByUID(ctx context.Context, uid *pb.UID) (*pb.Account, error) {
	query, err := db.GetQuery()
	if err != nil {
		return nil, err
	}
	ac, err := query.GetAccount(ctx, uid.UID)
	if err != nil {
		return nil, err
	}
	return &pb.Account{
		ID:   ac.ID,
		UID:  ac.Uid,
		Name: ac.Name,
		Bio:  &ac.Bio.String,
	}, nil
}

func ReturnAccountService() pb.AccountServiceServer {
	return AccountService{}
}
