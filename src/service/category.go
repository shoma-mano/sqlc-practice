package service

//
//import (
//	"context"
//	"database/sql"
//	"fmt"
//	"github.com/shoma-mano/go-sqlc/pb"
//	"github.com/shoma-mano/go-sqlc/sqlc"
//	"github.com/shoma-mano/go-sqlc/src/db"
//)
//
//type CategoryService struct {
//}
//
//func (a CategoryService) CreateCategory(ctx context.Context, input *pb.CreateCategoryInput) (*pb.AffectedRows, error) {
//	query, err := db.GetQuery()
//	if err != nil {
//		return nil, err
//	}
//	fmt.Println(input)
//	ac, err := query.CreateCategory(ctx, sqlc.CreateCategoryParams{
//		Name: input.Name,
//		Bio: sql.NullString{
//			String: *input.Bio,
//			Valid:  true,
//		},
//		Uid: input.UID,
//	})
//	affectedRows, _ := ac.RowsAffected()
//	return &pb.AffectedRows{AffectedRows: affectedRows}, nil
//}
//
//func (a CategoryService) FindOneByUID(ctx context.Context, uid *pb.UID) (*pb.Category, error) {
//	query, err := db.GetQuery()
//	if err != nil {
//		return nil, err
//	}
//	ac, err := query.GetCategory(ctx, uid.UID)
//	if err != nil {
//		return nil, err
//	}
//	return &pb.Category{
//		ID:   ac.ID,
//		UID:  ac.Uid,
//		Name: ac.Name,
//		Bio:  &ac.Bio.String,
//	}, nil
//}
//
//func ReturnCategoryService() pb.CategoryServiceServer {
//	return CategoryService{}
//}
