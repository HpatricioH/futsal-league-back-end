/*
  Warnings:

  - Made the column `id_player` on table `comments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `id_player`;

-- AlterTable
ALTER TABLE `comments` MODIFY `id_player` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `id_player` FOREIGN KEY (`id_player`) REFERENCES `players`(`player_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
