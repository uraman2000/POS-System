-- Create the inventory table
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
   user_id INTEGER REFERENCES users (id),
);

-- Create the sales table
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  item_id INTEGER REFERENCES inventory (id),
  user_id INTEGER REFERENCES users (id),
  quantity INTEGER NOT NULL,
  total_price NUMERIC NOT NULL,
  date DATE NOT NULL
);

-- Create the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  shop TEXT NOT NULL,
  commission INTEGER NOT NULL,
  total_income INTEGER NOT NULL
);
