-- Seed data with a fake user for testing (Password: plainSnow41)

insert into users (name, age, pet, email, entries, joined) values ('barry', 33, 'racoon', 'barry@h.com', 5, '2021-01-01');
insert into login (hash, email) values ('$2a$10$1pisEFpc6SiFyzq.hBD7F.Y3bDl5ew8xThwNZM5XLIXuubSZ8xgH.', 'barry@h.com');