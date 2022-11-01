/*
  Warnings:

  - You are about to drop the `player_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player_size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `representative` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_emai]` on the table `social_profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `one_player`;

-- DropForeignKey
ALTER TABLE `player_details` DROP FOREIGN KEY `playerid`;

-- DropForeignKey
ALTER TABLE `player_info` DROP FOREIGN KEY `id_user`;

-- DropForeignKey
ALTER TABLE `player_info` DROP FOREIGN KEY `idteams`;

-- DropForeignKey
ALTER TABLE `player_size` DROP FOREIGN KEY `idPlayer`;

-- DropForeignKey
ALTER TABLE `representative` DROP FOREIGN KEY `player_id`;

-- AlterTable
ALTER TABLE `comments` MODIFY `idcomments` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `likes` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `user_name` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `player_details`;

-- DropTable
DROP TABLE `player_info`;

-- DropTable
DROP TABLE `player_size`;

-- DropTable
DROP TABLE `representative`;

-- CreateTable
CREATE TABLE `players` (
    `player_id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `team_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `confirmation` ENUM('absent', 'present') NULL,
    `position` VARCHAR(255) NOT NULL,
    `goals` INTEGER NOT NULL DEFAULT 0,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `weigh` VARCHAR(45) NOT NULL,
    `height` VARCHAR(45) NOT NULL,

    INDEX `idteams_idx`(`team_id`),
    INDEX `iduser_idx`(`id_user`),
    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `games` (
    `idgames` INTEGER NOT NULL AUTO_INCREMENT,
    `teamsid` INTEGER NOT NULL,
    `team_one` VARCHAR(255) NULL,
    `team_two` VARCHAR(255) NULL,
    `longitude` DECIMAL(18, 10) NULL,
    `latitude` DECIMAL(18, 10) NULL,
    `adress` VARCHAR(255) NULL,
    `date` VARCHAR(255) NULL,
    `time` VARCHAR(255) NULL,

    INDEX `idteams_idx`(`teamsid`),
    PRIMARY KEY (`idgames`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_emai_UNIQUE` ON `social_profile`(`user_emai`);

-- CreateIndex
CREATE UNIQUE INDEX `email_UNIQUE` ON `user`(`email`);

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `id_player` FOREIGN KEY (`id_player`) REFERENCES `players`(`player_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user`(`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `idteams` FOREIGN KEY (`team_id`) REFERENCES `teams`(`idteams`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `games` ADD CONSTRAINT `teamsid` FOREIGN KEY (`teamsid`) REFERENCES `teams`(`idteams`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `comments` RENAME INDEX `one_player_idx` TO `id_player_idx`;
