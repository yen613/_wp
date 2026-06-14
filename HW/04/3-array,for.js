function calculateStats(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  let average = numbers.length === 0 ? 0 : sum / numbers.length;
  return { sum: sum, average: average };
}
console.log(calculateStats([10, 20, 30, 40]));