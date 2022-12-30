CREATE TABLE products (
  product_id CHAR(13) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL
);

CREATE UNIQUE INDEX product_id_index ON products (product_id);

CREATE TABLE transactions (
  transaction_id INT PRIMARY KEY AUTO_INCREMENT,
  date_time DATETIME NOT NULL,
  total DECIMAL(10,2) NOT NULL
);

CREATE TABLE transaction_items (
  transaction_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
-- pull data users for every transaction

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  commission INTEGER NOT NULL,
  total_income INTEGER NOT NULL
);
