/*
  Warnings:

  - You are about to drop the column `create_at` on the `menu_items` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `menu_items` table. All the data in the column will be lost.
  - You are about to drop the column `oder_id` on the `order_detail` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category_item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `Menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Menu_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Order_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Order_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cart_id` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `menu_items` DROP FOREIGN KEY `Menu_items_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_detail` DROP FOREIGN KEY `Order_detail_oder_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `Orders_user_id_fkey`;

-- AlterTable
ALTER TABLE `menu_items` DROP COLUMN `create_at`,
    DROP COLUMN `update_at`,
    ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `order_detail` DROP COLUMN `oder_id`,
    ADD COLUMN `count` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `order_id` INTEGER NOT NULL,
    ADD COLUMN `price` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `total` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `create_at`,
    DROP COLUMN `totalAmount`,
    DROP COLUMN `user_id`,
    ADD COLUMN `cart_id` INTEGER NOT NULL,
    ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `customer_id` INTEGER NOT NULL,
    ADD COLUMN `status` ENUM('SUCCESS', 'PENDING', 'CANCEL') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `total` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `create_at`,
    DROP COLUMN `update_at`,
    ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL;

-- DropTable
DROP TABLE `category_item`;

-- CreateTable
CREATE TABLE `Category_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `rating` ENUM('GOOD', 'AVERAGE', 'BAD') NOT NULL DEFAULT 'AVERAGE',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('SUCCESS', 'PENDING', 'CANCEL') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart_Items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cart_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 1,
    `total` DECIMAL(10, 2) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Carts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu_items` ADD CONSTRAINT `Menu_items_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_detail` ADD CONSTRAINT `Order_detail_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart_Items` ADD CONSTRAINT `Cart_Items_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Carts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart_Items` ADD CONSTRAINT `Cart_Items_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Menu_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
