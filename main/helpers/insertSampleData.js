export default function insertSampleData(knex) {
  const products = [
    { id: "4800131593831", name: "Alchohol", cost: "100.0", price: "140.0", quantity: "75" },
    { id: "48042772", name: "Marlboro (BLUE)", cost: "140.0", price: "150.0", quantity: "83" },
    { id: "48043823", name: "Marlboro (Purple", cost: "140.0", price: "150.0", quantity: "87" },
    { id: "4896712265396", name: "lighter", cost: "13.0", price: "15.0", quantity: "85" },
    { id: "6955549320024", name: "Jack Daniels Padilla", cost: "2000.0", price: "2500.0", quantity: "93" },
  ];

  products.forEach((item) => {
    knex("Product")
      .insert(item)
      .then(function (id) {
        console.log("Inserted Product with id:", id);
      });
  });
  const users = [
    {
      id: "1",
      name: "Pol Imbing",
      username: "pol",
      password: "lOhVohd4+dLyddapy7n89ePnnQxl0TZdVnhak50lcIM=",
      type: "Owner",
      commission: "40",
      totalIncome: "0",
    },
    {
      id: "2",
      name: "Mark Ilagan",
      username: "marky",
      password: "lOhVohd4+dLyddapy7n89ePnnQxl0TZdVnhak50lcIM=",
      type: "Co-Owner",
      commission: "60",
      totalIncome: "0",
    },
    {
      id: "3",
      name: "Rizza Medina",
      username: "rizz",
      password: "lOhVohd4+dLyddapy7n89ePnnQxl0TZdVnhak50lcIM=",
      type: "Cashier",
      commission: "0",
      totalIncome: "0",
    },
  ];

  users.forEach((item) => {
    knex("User")
      .insert(item)
      .then(function (id) {
        console.log("Inserted user with id:", id);
      });
  });
}
