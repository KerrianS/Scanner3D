CREATE TABLE IF NOT EXISTS `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insertion de plusieurs utilisateurs de test
INSERT INTO user (email, password, createdAt) VALUES
    ('admin', 'admin', CURRENT_TIMESTAMP),
    ('john.doe@example.com', 'john123', CURRENT_TIMESTAMP),
    ('jane.smith@example.com', 'jane123', CURRENT_TIMESTAMP),
    ('test.user@example.com', 'test123', CURRENT_TIMESTAMP),
    ('developer@example.com', 'dev123', CURRENT_TIMESTAMP); 