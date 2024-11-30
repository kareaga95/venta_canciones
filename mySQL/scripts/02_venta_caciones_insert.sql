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
('admin_user', 'admin@example.com', 'hashed_admin_password', 'admin', 1, NOW()), -- Admin
('john_doe', 'john.doe@example.com', 'hashed_password_john', 'user', 1, NOW()), -- Usuario regular
('sarah_music', 'sarah.music@example.com', 'hashed_password_sarah', 'user', 1, NOW()), -- Artista
('fanatic_123', 'fanatic123@example.com', 'hashed_password_fanatic', 'user', 1, NOW()), -- Usuario regular
('dj_rock', 'dj.rock@example.com', 'hashed_password_dj', 'user', 1, NOW()); -- Artista

-- ================================================
-- INSERTAR REGISTROS EN LA TABLA `artists`
-- ================================================
INSERT INTO `venta_canciones`.`artist` (`name`, `user_id`, `created_date`, `updated_date`)
VALUES
('Sarah Music', 3, NOW(), NOW()), -- Artista Sarah
('DJ Rock', 5, NOW(), NOW());    -- Artista DJ Rock

-- ================================================
-- INSERTAR REGISTROS EN LA TABLA `songs`
-- ================================================
INSERT INTO `venta_canciones`.`song` (`artist_id`, `title`, `genre`, `price`, `audio_file_path`, `cover_image`, `visible`, `sales_amount`, `release_date`, `file_size`, `file_type`, `created_date`, `updated_date`)
VALUES
(1, 'Harmony of Dreams', 'Jazz', 3.99, '/songs/harmony_of_dreams.mp3', '/covers/harmony.jpg', 1, 2, '2024-01-01', 5120, 'audio/mpeg', NOW(), NOW()), -- Canción Jazz
(1, 'Soulful Nights', 'R&B', 2.99, '/songs/soulful_nights.mp3', '/covers/soulful_nights.jpg', 1, 3, '2024-02-01', 4890, 'audio/mpeg', NOW(), NOW()), -- Canción R&B
(2, 'Rock the World', 'Rock', 4.49, '/songs/rock_the_world.mp3', '/covers/rock_the_world.jpg', 1, 0, '2024-03-01', 6200, 'audio/mpeg', NOW(), NOW()), -- Canción Rock
(2, 'Party Hard', 'Electronic', 3.49, '/songs/party_hard.mp3', '/covers/party_hard.jpg', 0, 0, '2024-04-01', 5300, 'audio/mpeg', NOW(), NOW()); -- Canción Electrónica (no visible)

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
