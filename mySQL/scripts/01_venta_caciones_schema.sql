SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- Elimina las tablas existentes
DROP SCHEMA IF EXISTS `venta_canciones`;

-- -----------------------------------------------------
-- Schema venta_canciones
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `venta_canciones` DEFAULT CHARACTER SET utf8mb3 ;
USE `venta_canciones` ;

-- -----------------------------------------------------
-- Table `venta_canciones`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `venta_canciones`.`user` ;

CREATE TABLE IF NOT EXISTS `venta_canciones`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(70) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `rol` ENUM('user', 'admin') NULL DEFAULT 'user',
  `active` TINYINT DEFAULT 1,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  -- `emailToken` VARCHAR(255) DEFAULT NULL AFTER `password`,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `venta_canciones`.`artist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `venta_canciones`.`artist` ;

CREATE TABLE IF NOT EXISTS `venta_canciones`.`artist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT DEFAULT 1,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `venta_canciones`.`user` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `venta_canciones`.`song`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `venta_canciones`.`song` ;

CREATE TABLE IF NOT EXISTS `venta_canciones`.`song` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `artist_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `genre` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `audio_file_path` VARCHAR(400) CHARACTER SET 'utf8mb3' NOT NULL,
  `cover_image` VARCHAR(400) CHARACTER SET 'utf8mb3' NOT NULL,
  `visible` TINYINT NULL DEFAULT '1',
  `release_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `file_size` INT NULL DEFAULT NULL,
  `file_type` VARCHAR(50) NULL DEFAULT NULL,
  `sales_amount`INT NOT NULL DEFAULT 0,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `artist_id_idx` (`artist_id` ASC) VISIBLE,
  CONSTRAINT `artist_id`
    FOREIGN KEY (`artist_id`)
    REFERENCES `venta_canciones`.`artist` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `venta_canciones`.`purchase`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `venta_canciones`.`purchase` ;

CREATE TABLE IF NOT EXISTS `venta_canciones`.`purchase` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `song_id` INT NOT NULL,
  `purchase_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `song_id_idx` (`song_id` ASC) VISIBLE,
  CONSTRAINT `fk_purchase_song`
    FOREIGN KEY (`song_id`)
    REFERENCES `venta_canciones`.`song` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_purchase_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `venta_canciones`.`user` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `venta_canciones`.`cart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `venta_canciones`.`cart` ;

CREATE TABLE IF NOT EXISTS `venta_canciones`.`cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `song_id` INT NOT NULL, -- Eliminar DEFAULT CURRENT_TIMESTAMP
  `quantity` INT NULL DEFAULT 1,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `user_id_cart_idx` (`user_id` ASC) VISIBLE,
  INDEX `song_id_cart_idx` (`song_id` ASC) VISIBLE,
  CONSTRAINT `user_id_cart`
    FOREIGN KEY (`user_id`)
    REFERENCES `venta_canciones`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `song_id_cart`
    FOREIGN KEY (`song_id`)
    REFERENCES `venta_canciones`.`song` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
