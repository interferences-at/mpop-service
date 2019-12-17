/**
 * Database creation script.
 */

/**
 * The users table.
 */
CREATE TABLE users
(
    user_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    user_rfid VARCHAR(255) NOT NULL,
    user_status ENUM('active', 'inactive'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/**
 * The answers table.
 */
CREATE TABLE answers
(
    answer_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    question_identifier VARCHAR(255) NOT NULL,
    answer INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

