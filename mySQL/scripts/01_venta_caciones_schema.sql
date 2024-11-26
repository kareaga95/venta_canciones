SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema venta_canciones
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `venta_canciones`;

CREATE SCHEMA IF NOT EXISTS `venta_canciones` DEFAULT CHARACTER SET utf8;
USE `venta_canciones`;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(70) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `rol` ENUM('user', 'admin') NULL DEFAULT 'user',
  `active` TINYINT NULL DEFAULT 1,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username`),
  UNIQUE INDEX `email_UNIQUE` (`email`)
);

-- -----------------------------------------------------
-- Table `artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `artist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(70) NOT NULL,
  `user_id` INT NOT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name`),
  CONSTRAINT `fk_artist_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user`(`id`)
    ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `song` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `artist_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `genre` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `audio_file_path` NVARCHAR(400) NOT NULL,
  `cover_image` NVARCHAR(400) NOT NULL,
  `visible` TINYINT NULL DEFAULT 1,
  `release_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `file_size` INT NULL,
  `file_type` VARCHAR(50) NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_song_artist_id`
    FOREIGN KEY (`artist_id`)
    REFERENCES `artist`(`id`)
    ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `purchase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `purchase` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `song_id` INT NOT NULL,
  `purchase_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_purchase_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `user`(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_purchase_song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `song`(`id`)
    ON DELETE CASCADE
);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
