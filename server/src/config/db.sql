-- CREATE DATABASE filemanager;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL
);

CREATE TABLE files (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	size TEXT NOT NULL,
	owner_id INT REFERENCES users(id) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	type TEXT NOT NULL,
	url TEXT NOT NULL
);

CREATE TABLE folders (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	owner_id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE folder_in_folder (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	parent_folder_id INT REFERENCES folders(id) NOT NULL
);

CREATE TABLE file_in_folder (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	size TEXT NOT NULL,
	parent_folder_id INT REFERENCES folders(id) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	type TEXT NOT NULL,
	url TEXT NOT NULL
);



