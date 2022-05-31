-- name: GetAccount :one
SELECT *
FROM accounts
WHERE uid = ?
LIMIT 1;

-- name: ListAccounts :many
SELECT *
FROM accounts
ORDER BY name;

-- name: CreateAccount :execresult
INSERT INTO accounts (name, bio, uid)
VALUES (?, ?, ?);

-- name: DeleteAuthor :exec
DELETE
FROM accounts
WHERE id = ?;

-- name: CreateCategory :execresult
INSERT IGNORE INTO categories (content)
VALUES (?)
;

-- name: CreateTweet :execresult
INSERT IGNORE INTO tweets (account_id, content)
VALUES (?, ?)
;

-- name: AddCategoryToTweet :execresult
INSERT IGNORE INTO tweets_categories (tweet_id, category_id)
VALUES (?, (select id from categories where content = ?))
;