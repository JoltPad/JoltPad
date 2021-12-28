SET timezone = 'America/New_York'

CREATE TABLE users (
  "user_id" serial NOT NULL PRIMARY KEY,
  "first_name" (25) varchar NOT NULL,
  "last_name" (25) varchar NOT NULL,
  "email" (60) varchar UNIQUE NOT NULL,
  "username" (25) varchar UNIQUE NOT NULL,
  "phone" integer,
  "avatar_path" varchar,
  "password_hash" (60) varchar NOT NULL
)

CREATE TABLE notes (
  "note_id" serial NOT NULL PRIMARY KEY,
  "user_id" integer,
  "category_id" integer,
  "created_at" date DEFAULT CURRENT_DATE,
  "contents" varchar,
  FOREIGN KEY ("user_id") REFERENCES users("user_id"),
  FOREIGN KEY ("category_id") REFERENCES categories("category_id")
)

CREATE TABLE categories (
  "category_id" serial NOT NULL PRIMARY KEY, 
  "category_name" varchar
)
