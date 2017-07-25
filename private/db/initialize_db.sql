CREATE DATABASE nameTBD;

-- Run this terminal command to connect to the database:
-- \c nameTBD;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  picture TEXT,
  birthday DATE,
  h_color TEXT,
  e_color TEXT,
  hobby TEXT,
  gender TEXT
);

CREATE TABLE friends (
  user_id INT not null,
  friend_id INT not null,
  FOREIGN KEY ( user_id ) REFERENCES users( id ),
  FOREIGN KEY ( friend_id ) REFERENCES users( id )
);

