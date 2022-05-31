package test

import (
	"context"
	"github.com/shoma-mano/go-sqlc/gen/pb"
	"github.com/shoma-mano/go-sqlc/src/service"
	"testing"
)

func TestCreateTweet(t *testing.T) {
	ts := service.TweetService{}
	row, err := ts.CreateTweet(context.Background(), &pb.CreateTweetInput{
		Content:    "1",
		AccountID:  1,
		Categories: []*pb.CreateCategoryInput{{Name: "game"}, {Name: "eldenring"}, {Name: "PS5"}},
	})
	if err != nil {
		t.Error(err)
	}
	if row.AffectedRows != 1 {
		t.Error("number of affected row is not 1")
	}
}
