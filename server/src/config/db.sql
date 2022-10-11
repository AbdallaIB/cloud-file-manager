-- CREATE DATABASE filemanager;
CREATE TYPE extensionTypes AS ENUM ('image', 'video', 'audio', 'document');

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE files (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	size TEXT NOT NULL,
	owner_id INT REFERENCES users(id) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	type extensionTypes NOT NULL,
    extension TEXT NOT NULL,
	url TEXT NOT NULL
);
