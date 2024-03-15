USE `contacts`;
DROP TABLE IF EXISTS `contact_db`;
CREATE TABLE `contact_db` (
  `id` bigint NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `contact` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
