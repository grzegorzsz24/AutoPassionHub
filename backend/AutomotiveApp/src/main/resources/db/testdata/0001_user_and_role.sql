insert into
    users (first_name, last_name, nickname, email, password, date_of_birth, public_profile)
values
    ('Grzegorz', 'Szymanek', 'grzesio123','admin@example.com', '$2y$10$H9B0umVBgUUE4AZVvzvomONcA.aXjo6ZaL7Wuvku719Nl8PGESsN6', '2001-12-11', true);

insert into
    roles (name)
values
    ('USERTEST');

insert into
    user_role (user_id, role_id)
values
    (1, 1);