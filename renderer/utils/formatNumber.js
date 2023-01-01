export const formatNumber = (n) => {
  const f = new Intl.NumberFormat("en-us", { style: "currency", currency: "PHP" }).format(n);
  // expected output: "123.456,79 €"
  return f;
};
