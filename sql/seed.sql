delimiter #
drop procedure if exists load_accounts_data;
create procedure load_accounts_data()
begin
    declare max int unsigned default 10;
    declare counter int unsigned default 0;
    while counter < max do
      insert into accounts values (null,uid+counter,concat("test",counter),concat("test",counter));
      set counter = counter + 1;
    end while;
end #
delimiter ;
call load_accounts_data();
INSERT INTO test.tweets (account_id, content) VALUES (1, 'eldenring is fun!
      ');
INSERT INTO test.categories (tweet_id, content) VALUES (1, 'game');
INSERT INTO test.categories (tweet_id, content) VALUES (1, 'eldenring');
