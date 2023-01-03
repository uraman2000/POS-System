export default function insertSampleData(knex) {
  knex("Product")
    .insert({
      id: "123",
      name: "Product 1",
      cost: 10,
      price: 20,
      quantity: 5,
    })
    .then(function (id) {
      console.log("Inserted product with id:", id);
    });
  knex("Transaction")
    .insert({
      dateTime: "2022-01-01 12:00:00",
      total: 100,
      userId: 1,
    })
    .then(function (id) {
      console.log("Inserted transaction with id:", id);
    });
  knex("TransactionItem")
    .insert({
      quantity: 2,
      transactionId: 1,
      productId: "123",
    })
    .then(function (id) {
      console.log("Inserted transaction item with id:", id);
    });
  knex("User")
    .insert({
      name: "John",
      username: "john123",
      password: "abc123",
      commission: 10,
      totalIncome: 100,
    })
    .then(function (id) {
      console.log("Inserted user with id:", id);
    })
    .catch((e) => {
      console.log(e);
    });
}
