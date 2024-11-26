-- ================================================
-- INSERTAR REGISTROS EN LA TABLA `user`
-- ================================================
INSERT INTO `user` (`id`, `username`, `email`, `password`, `rol`, `active`, `created_date`)
VALUES
(1, 'admin_user', 'admin@example.com', 'hashed_admin_password', 'admin', 1, NOW()), -- Administrador
(2, 'john_doe', 'john.doe@example.com', 'hashed_password_john', 'user', 1, NOW()), -- Usuario regular
(3, 'sarah_music', 'sarah.music@example.com', 'hashed_password_sarah', 'user', 1, NOW()), -- Artista
(4, 'fanatic_123', 'fanatic123@example.com', 'hashed_password_fanatic', 'user', 1, NOW()), -- Usuario regular
(5, 'dj_rock', 'dj.rock@example.com', 'hashed_password_dj', 'user', 1, NOW()); -- Artista

-- ================================================
-- INSERTAR REGISTROS EN LA TABLA `artists`
-- ================================================
INSERT INTO `artist` (`id`, `name`, `user_id`, `created_date`, `updated_date`)
VALUES
(1, 'Sarah Music', 3, NOW(), NOW()), -- Artista Sarah
(2, 'DJ Rock', 5, NOW(), NOW());    -- Artista DJ Rock

-- ================================================
-- INSERTAR REGISTROS EN LA TABLA `songs`
-- ================================================
INSERT INTO `song` (`id`, `artist_id`, `title`, `genre`, `price`, `audio_file_path`, `cover_image`, `visible`, `release_date`, `file_size`, `file_type`, `created_date`, `updated_date`)
VALUES
(1, 1, 'Harmony of Dreams', 'Jazz', 3.99, '/songs/harmony_of_dreams.mp3', '/covers/harmony.jpg', 1, '2024-01-01', 5120, 'audio/mpeg', NOW(), NOW()),
(2, 1, 'Soulful Nights', 'R&B', 2.99, '/songs/soulful_nights.mp3', '/covers/soulful_nights.jpg', 1, '2024-02-01', 4890, 'audio/mpeg', NOW(), NOW()),
(3, 2, 'Rock the World', 'Rock', 4.49, '/songs/rock_the_world.mp3', '/covers/rock_the_world.jpg', 1, '2024-03-01', 6200, 'audio/mpeg', NOW(), NOW()),
(4, 2, 'Party Hard', 'Electronic', 3.49, '/songs/party_hard.mp3', '/covers/party_hard.jpg', 0, '2024-04-01', 5300, 'audio/mpeg', NOW(), NOW());

-- ================================================
-- INSERTAR REGISTROS EN LA TABLA `purchases`
-- ================================================
INSERT INTO `purchase` (`id`, `user_id`, `song_id`, `purchase_date`)
VALUES
(1, 2, 1, NOW()), -- John Doe compra 'Harmony of Dreams'
(2, 4, 2, NOW()), -- Fanatic 123 compra 'Soulful Nights'
(3, 2, 3, NOW()), -- John Doe compra 'Rock the World'
(4, 4, 4, NOW()); -- Fanatic 123 compra 'Party Hard'
