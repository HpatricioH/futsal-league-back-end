-- CreateTable
CREATE TABLE `comments` (
    `idcomments` INTEGER NOT NULL,
    `id_player` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `comment` VARCHAR(255) NULL,
    `likes` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `one_player_idx`(`id_player`),
    PRIMARY KEY (`idcomments`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_details` (
    `idplayer_details` INTEGER NOT NULL AUTO_INCREMENT,
    `id_player` INTEGER NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `goals` INTEGER NULL,
    `likes` INTEGER NULL,

    INDEX `player_id_idx`(`id_player`),
    PRIMARY KEY (`idplayer_details`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_info` (
    `idplayer_info` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `team_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `confirmation` VARCHAR(255) NULL,

    INDEX `idteams_idx`(`team_id`),
    INDEX `iduser_idx`(`id_user`),
    PRIMARY KEY (`idplayer_info`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_size` (
    `idplayer_size` INTEGER NOT NULL,
    `id_player` INTEGER NOT NULL,
    `weigh` VARCHAR(45) NOT NULL,
    `height` VARCHAR(45) NOT NULL,

    INDEX `idPlayer_idx`(`id_player`),
    PRIMARY KEY (`idplayer_size`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `representative` (
    `idrepresentative` INTEGER NOT NULL AUTO_INCREMENT,
    `id_player` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `province` VARCHAR(255) NOT NULL,
    `postal_code` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `email` VARCHAR(255) NOT NULL,

    INDEX `player_id_idx`(`id_player`),
    PRIMARY KEY (`idrepresentative`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_profile` (
    `idsocial_profile` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `user_session` VARCHAR(255) NULL,
    `user_name` VARCHAR(255) NOT NULL,
    `user_avatar` VARCHAR(255) NULL,
    `user_emai` VARCHAR(255) NOT NULL,

    INDEX `iduser_idx`(`user_id`),
    PRIMARY KEY (`idsocial_profile`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams` (
    `idteams` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idteams`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `iduser` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` BINARY(20) NOT NULL,

    PRIMARY KEY (`iduser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `one_player` FOREIGN KEY (`id_player`) REFERENCES `player_info`(`idplayer_info`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_details` ADD CONSTRAINT `playerid` FOREIGN KEY (`id_player`) REFERENCES `player_info`(`idplayer_info`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_info` ADD CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user`(`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_info` ADD CONSTRAINT `idteams` FOREIGN KEY (`team_id`) REFERENCES `teams`(`idteams`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_size` ADD CONSTRAINT `idPlayer` FOREIGN KEY (`id_player`) REFERENCES `player_info`(`idplayer_info`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `representative` ADD CONSTRAINT `player_id` FOREIGN KEY (`id_player`) REFERENCES `player_info`(`idplayer_info`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `social_profile` ADD CONSTRAINT `iduser` FOREIGN KEY (`user_id`) REFERENCES `user`(`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
