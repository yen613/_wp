const users = [
    { name: "Alice", age: 25 }, 
    { name: "Bob", age: 17 }
];

// 使用 filter 方法，搭配箭頭函數來篩選物件屬性
const adults = users.filter(user => user.age >= 18);

console.log(adults);
// 輸出結果：[ { name: "Alice", age: 25 } ]