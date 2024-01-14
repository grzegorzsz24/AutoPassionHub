insert into
    users (first_name, last_name, nickname, email, password, date_of_birth, public_profile)
values
    ('Grzegorz', 'Szymanek', 'grzesio123','admin@example.com', '$2y$10$JWEb5SnD85PRljcBAfcBhu7NuSrTbZUa7krEIxTFzty.lFCKP2G0a', '2001-12-11', true),
    ('Kacper', 'Stepien', 'kacper123','kacper@example.com', '$2y$10$JWEb5SnD85PRljcBAfcBhu7NuSrTbZUa7krEIxTFzty.lFCKP2G0a', '2001-12-11', true),
    ('Dawid', 'Szafka', 'dawid123','dawid@example.com', '$2y$10$JWEb5SnD85PRljcBAfcBhu7NuSrTbZUa7krEIxTFzty.lFCKP2G0a', '2001-12-11', true),
    ('Piotr', 'Szpak', 'piotr123','piotr@example.com', '$2y$10$JWEb5SnD85PRljcBAfcBhu7NuSrTbZUa7krEIxTFzty.lFCKP2G0a', '2001-12-11', true);


insert into
    roles (name)
values
    ('USER'),
    ('ADMIN');

insert into
    user_role (user_id, role_id)
values
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2);