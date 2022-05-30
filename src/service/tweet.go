package service

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/shoma-mano/go-sqlc/gen/pb"
	"github.com/shoma-mano/go-sqlc/gen/sqlc"
	"github.com/shoma-mano/go-sqlc/src/db"
)

type TweetService struct {
}

func (a TweetService) CreateTweet(ctx context.Context, input *pb.CreateTweetInput) (*pb.AffectedRows, error) {
	query, err := db.GetQuery()
	if err != nil {
		return nil, err
	}
	fmt.Println(input)
	ac, err := query.CreateTweet(ctx, sqlc.CreateTweetParams{
		AccountID: 1,
		Content:   sql.NullString{},
	})
	affectedRows, _ := ac.RowsAffected()
	return &pb.AffectedRows{AffectedRows: affectedRows}, nil
}

//func (a TweetService) FindOneByUID(ctx context.Context, uid *pb.UID) (*pb.Tweet, error) {
//	query, err := db.GetQuery()
//	if err != nil {
//		return nil, err
//	}
//	ac, err := query.GetTweet(ctx, uid.UID)
//	if err != nil {
//		return nil, err
//	}
//	return &pb.Tweet{
//		ID:   ac.ID,
//		UID:  ac.Uid,
//		Name: ac.Name,
//		Bio:  &ac.Bio.String,
//	}, nil
//}

func ReturnTweetService() pb.TweetServiceServer {
	return TweetService{}
}
