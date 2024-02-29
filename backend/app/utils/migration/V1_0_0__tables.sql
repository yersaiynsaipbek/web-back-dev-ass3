CREATE TABLE `users` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(35),
    `password` VARCHAR(255),
    `role_name` VARCHAR(35),
    `phone_number` VARCHAR(20)
);