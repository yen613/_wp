function filterPositive(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(filterPositive([-3, 5, 0, -1, 10]));