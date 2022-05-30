#reset table
 docker exec -i tweet_driven_db mysql -u root -proot test < ./sql/reset.sql
 docker exec -i tweet_driven_db mysql -u root -proot test < ./sql/schema.sql
 docker exec -i tweet_driven_db mysql -u root -proot test < ./sql/seed.sql
