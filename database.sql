create database projects;

\c projects;

-- CREATE TABLE todo_app (
--     id SERIAL PRIMARY KEY,
--     text varchar(255)
-- );

CREATE TABLE todo_app (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT gen_random_uuid()
);