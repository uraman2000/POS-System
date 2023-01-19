export default function createTables(knex) {
  knex.schema
    .createTable("Product", function (table) {
      table.string("id").notNullable();
      table.string("name").notNullable();
      table.float("cost").notNullable();
      table.float("price").notNullable();
      table.integer("quantity").notNullable();
      table.datetime("updated_at").notNullable();
    })
    .then(function () {
      console.log("Product table created!");
    });

  knex.schema
    .createTable("Transaction", function (table) {
      table.increments("id").primary();
      table.datetime("dateTime").notNullable();
      table.float("total").notNullable();
      table.integer("userId").notNullable();
      table.integer("totalNet").notNullable();
    })
    .then(function () {
      console.log("Transaction table created!");
    });

  knex.schema
    .createTable("TransactionItem", function (table) {
      table.increments("id").primary();
      table.integer("quantity").notNullable();
      table.integer("transactionId").notNullable();
      table.string("productId").notNullable();
      table.integer("totalNet").notNullable();
    })
    .then(function () {
      console.log("TransactionItem table created!");
    });

  knex.schema
    .createTable("User", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("username").notNullable();
      table.string("password").notNullable();
      table.string("type").notNullable();
      table.integer("commission").notNullable();
      table.integer("totalIncome").notNullable();
      table.datetime("updated_at").notNullable();
    })
    .then(function () {
      console.log("User table created!");
    });

  knex.schema.createIndex("Product_id_key", "Product", "id").then(function () {
    console.log("Product_id_key index created!");
  });

  knex.schema.createIndex("Transaction_userId_key", "Transaction", "userId").then(function () {
    console.log("Transaction_userId_key index created!");
  });

  knex.schema
    .createIndex("TransactionItem_transactionId_key", "TransactionItem", "transactionId")
    .then(function () {
      console.log("TransactionItem_transactionId_key index created!");
    });

  knex.schema.createIndex("TransactionItem_productId_key", "TransactionItem", "productId").then(function () {
    console.log("TransactionItem_productId_key index created!");
  });
}
