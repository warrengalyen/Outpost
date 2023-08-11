CREATE TABLE IF NOT EXISTS `products` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` text,
	`price` decimal,
	`description` text,
	`inventory` decimal,
	`store_id` int
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `stores` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`store_name` text
);
