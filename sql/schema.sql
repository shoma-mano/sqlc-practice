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
    CONSTRAINT FK_tweets_accounts FOREIGN KEY (account_id) references account (id)
);

CREATE TABLE if not exists categories
(
    id         BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT NOT NULL,
    content    text,
    CONSTRAINT FK_categories_accounts FOREIGN KEY (account_id) references account (id)
);
