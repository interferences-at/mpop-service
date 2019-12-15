/**
 * Database creation script.
 */
-- SET client_encoding = 'UTF8';

-- CREATE DATABASE mpop
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.utf8'
--     LC_CTYPE = 'en_US.utf8';

-- ALTER DATABASE mpop OWNER TO postgres;

-- \connect mpop

/**
 * The users table.
 */
CREATE TABLE users
(
  user_id BIGSERIAL PRIMARY KEY,
  user_rfid TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

/**
 * The answers table.
 */
  CREATE TABLE answers
  (
    answer_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE,
    question TEXT,
    answer INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

