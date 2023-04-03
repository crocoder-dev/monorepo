CREATE TABLE `editions` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`date` timestamp NOT NULL,
	`title` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL
);

CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`published_at` timestamp,
	`title` varchar(191) NOT NULL,
	`summary` longtext NOT NULL,
	`insight` longtext NOT NULL,
	`url` varchar(191) NOT NULL,
	`author` varchar(191),
	`organization` varchar(191),
	`edition_id` int,
	`order` int
);

CREATE UNIQUE INDEX `slug_idx` ON `editions` (`slug`);