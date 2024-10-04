create database projects;

\c projects;

-- CREATE TABLE todo_app (
--     id SERIAL PRIMARY KEY,
--     text varchar(255)
-- );

CREATE TABLE todo_app (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    status varchar(10),
    user_id UUID
);

ALTER TABLE todo_app
ADD CONSTRAINT todo_app_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id);
