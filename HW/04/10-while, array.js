function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  let fib = [0, 1];
  while (fib.length < n) {
    let nextNum = fib[fib.length - 1] + fib[fib.length - 2];
    fib.push(nextNum);
  }
  return fib;
}
console.log(generateFibonacci(5));
console.log(generateFibonacci(8));