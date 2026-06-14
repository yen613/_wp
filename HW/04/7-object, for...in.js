const cart = { apple: 50, banana: 30, orange: 40 };

function calculateTotal(cartObject) {
  let total = 0;
  for (let key in cartObject) {
    total += cartObject[key];
  }
  return total;
}
console.log(calculateTotal(cart));