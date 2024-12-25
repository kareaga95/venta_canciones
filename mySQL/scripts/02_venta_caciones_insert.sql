-- Deshabilitar restricciones de claves foráneas
SET FOREIGN_KEY_CHECKS = 0;

-- TRUNCATE para reiniciar las tablas y los AUTO_INCREMENT
TRUNCATE TABLE `venta_canciones`.`cart`;
TRUNCATE TABLE `venta_canciones`.`purchase`;
TRUNCATE TABLE `venta_canciones`.`song`;
TRUNCATE TABLE `venta_canciones`.`artist`;
TRUNCATE TABLE `venta_canciones`.`user`;

SET FOREIGN_KEY_CHECKS = 1;

-- ================================================
-- INSERTAR REGISTROS EN LA TABLA `users`
-- ================================================
INSERT INTO `venta_canciones`.`user` (`username`, `email`, `password`, `rol`, `active`, `created_date`)
VALUES
('admin_user', 'admin@example.com', '$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u', 'admin', 1, NOW()), -- Admin
('john_doe', 'john.doe@example.com', '$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u', 'user', 1, NOW()), -- Usuario regular
('sarah_music', 'sarah.music@example.com', '$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u', 'user', 1, NOW()), -- Artista
('fanatic_123', 'fanatic123@example.com', '$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u', 'user', 1, NOW()), -- Usuario regular
('dj_rock', 'dj.rock@example.com', '$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u', 'user', 1, NOW()); -- Artista

-- ================================================
-- INSERTAR REGISTROS EN LA TABLA `artists`
-- ================================================
INSERT INTO `venta_canciones`.`artist` (`name`, `user_id`, `active`, `created_date`, `updated_date`)
VALUES
('Sarah Music', 3, 1, NOW(), NOW()), -- Artista Sarah
('DJ Rock', 5, 1, NOW(), NOW());    -- Artista DJ Rock

-- ================================================
-- INSERTAR REGISTROS EN LA TABLA `songs`
-- ================================================
INSERT INTO `venta_canciones`.`song` (`artist_id`, `title`, `genre`, `price`, `audio_file_path`, `cover_image`, `visible`, `sales_amount`, `release_date`, `file_size`, `file_type`, `created_date`, `updated_date`)
VALUES
(1, 'Harmony of Dreams', 'Jazz', 3.99, '/songs/harmony_of_dreams.mp3', '/covers/harmony.jpg', 1, 2, '2024-01-01', 5120, 'audio/mpeg', NOW(), NOW()), -- Canción Jazz
(1, 'Soulful Nights', 'R&B', 2.99, '/songs/soulful_nights.mp3', '/covers/soulful_nights.jpg', 1, 3, '2024-02-01', 4890, 'audio/mpeg', NOW(), NOW()), -- Canción R&B
(2, 'Rock the World', 'Rock', 4.49, '/songs/rock_the_world.mp3', '/covers/rock_the_world.jpg', 1, 0, '2024-03-01', 6200, 'audio/mpeg', NOW(), NOW()), -- Canción Rock
(2, 'Party Hard', 'Electronic', 3.49, '/songs/party_hard.mp3', '/covers/party_hard.jpg', 0, 0, '2024-04-01', 5300, 'audio/mpeg', NOW(), NOW()); -- Canción Electrónica (no visible)
(1, 'Dreams in Harmony', 'Jazz', 4.49, '/songs/dreams_in_harmony.mp3', '/covers/dreams_in_harmony.jpg', 1, 10, '2024-05-20', 5200, 'audio/mpeg', NOW(), NOW()),
(1, 'Jazz Delight', 'Jazz', 3.99, '/songs/jazz_delight.mp3', '/covers/jazz_delight.jpg', 1, 15, '2024-06-10', 4900, 'audio/mpeg', NOW(), NOW()),
(2, 'Electronic Pulse', 'Electronic', 5.49, '/songs/electronic_pulse.mp3', '/covers/electronic_pulse.jpg', 1, 20, '2024-06-15', 5500, 'audio/mpeg', NOW(), NOW()),
(2, 'Night Party', 'Electronic', 4.49, '/songs/night_party.mp3', '/covers/night_party.jpg', 1, 12, '2024-07-01', 5400, 'audio/mpeg', NOW(), NOW()),
(3, 'Pop Fantasy', 'Pop', 3.99, '/songs/pop_fantasy.mp3', '/covers/pop_fantasy.jpg', 1, 25, '2024-07-15', 5000, 'audio/mpeg', NOW(), NOW()),
(3, 'Sweet Harmony', 'Pop', 2.99, '/songs/sweet_harmony.mp3', '/covers/sweet_harmony.jpg', 1, 10, '2024-08-01', 4800, 'audio/mpeg', NOW(), NOW()),
(4, 'Rock Revolution', 'Rock', 5.99, '/songs/rock_revolution.mp3', '/covers/rock_revolution.jpg', 1, 18, '2024-08-15', 6000, 'audio/mpeg', NOW(), NOW()),
(4, 'Guitar Fury', 'Rock', 4.99, '/songs/guitar_fury.mp3', '/covers/guitar_fury.jpg', 1, 22, '2024-09-01', 5700, 'audio/mpeg', NOW(), NOW()),
(5, 'Soul Beats', 'Soul', 3.99, '/songs/soul_beats.mp3', '/covers/soul_beats.jpg', 1, 20, '2024-09-15', 4900, 'audio/mpeg', NOW(), NOW()),
(5, 'Golden Vibes', 'Soul', 4.49, '/songs/golden_vibes.mp3', '/covers/golden_vibes.jpg', 1, 14, '2024-10-01', 5000, 'audio/mpeg', NOW(), NOW());

-- ================================================
-- INSERTAR REGISTROS EN LA TABLA `purchases`
-- ================================================
INSERT INTO `venta_canciones`.`purchase` (`user_id`, `song_id`, `purchase_date`)
VALUES
(2, 1, NOW()), -- John Doe compra 'Harmony of Dreams'
(4, 2, NOW()), -- Fanatic 123 compra 'Soulful Nights'
(2, 3, NOW()), -- John Doe compra 'Rock the World'
(4, 4, NOW()); -- Fanatic 123 compra 'Party Hard'

-- ================================================
-- INSERTAR REGISTROS EN LA TABLA `cart`
-- ================================================
INSERT INTO `venta_canciones`.`cart` (`user_id`, `song_id`, `quantity`, `created_date`, `updated_date`)
VALUES
(2, 2, 1, NOW(), NOW()), -- John Doe añade 'Soulful Nights' al carrito
(2, 3, 1, NOW(), NOW()), -- John Doe añade 'Rock the World' al carrito
(4, 1, 2, NOW(), NOW()), -- Fanatic 123 añade 2 copias de 'Harmony of Dreams' al carrito
(4, 4, 1, NOW(), NOW()); -- Fanatic 123 añade 'Party Hard' al carrito
(2, 35, NOW()), -- John Doe compra 'Dreams in Harmony'
(4, 36, NOW()), -- Fanatic 123 compra 'Jazz Delight'
(3, 37, NOW()), -- Sarah Music compra 'Electronic Pulse'
(5, 38, NOW()), -- DJ Rock compra 'Night Party'
(6, 39, NOW()), -- Rhythm Queen compra 'Pop Fantasy'
(7, 40, NOW()), -- DJ Flash compra 'Sweet Harmony'
(8, 41, NOW()), -- Melody Star compra 'Rock Revolution'
(9, 42, NOW()), -- Beat Genius compra 'Guitar Fury'
(10, 43, NOW()), -- Rhythm Masters compra 'Soul Beats'
(11, 44, NOW()); -- Guitar Hero compra 'Golden Vibes'