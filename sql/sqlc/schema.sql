CREATE TABLE if not exists accounts
(
    id   BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uid  text NOT NULL,
    name text NOT NULL,
    bio  text
);

CREATE TABLE if not exists tweets
(
    id         BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT NOT NULL,
    content    text,
    CONSTRAINT FK_tweets_accounts FOREIGN KEY (account_id) references accounts (id)
);

CREATE TABLE if not exists categories
(
    id         BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tweet_id BIGINT NOT NULL,
    content    varchar(200) ,
    CONSTRAINT FK_categories_accounts FOREIGN KEY (tweet_id) references tweets (id),
    UNIQUE (content)
);
