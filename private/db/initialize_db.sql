CREATE DATABASE nametdb;

-- Run this terminal command to connect to the database:
-- \c nametdb;

CREATE TABLE users (
  id TEXT not null UNIQUE,
  picture TEXT,
  birthday DATE,
  h_color TEXT,
  e_color TEXT,
  hobby TEXT,
  gender TEXT,
  first TEXT,
  last TEXT
);

CREATE TABLE friends (
  user_id TEXT not null,
  friend_id TEXT not null,
  FOREIGN KEY ( user_id ) REFERENCES users( id ),
  FOREIGN KEY ( friend_id ) REFERENCES users( id )
);

