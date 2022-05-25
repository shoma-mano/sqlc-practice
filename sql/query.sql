-- name: GetAuthor :one
SELECT * FROM accounts
WHERE id = ? LIMIT 1;

-- name: ListAuthors :many
SELECT * FROM accounts
ORDER BY name;

-- name: CreateAuthor :execresult
INSERT INTO accounts (
  name, bio ,uid
) VALUES (
  ?, ? ,?
);

-- name: DeleteAuthor :exec
DELETE FROM accounts
WHERE id = ?;

-- name: GetFollowRelation :exec