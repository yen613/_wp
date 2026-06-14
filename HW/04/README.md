## 習題 4

## 我的測試結果

```sh
PS C:\Users\0613\OneDrive\Documents\GitHub\_wp\HW\04> node 1-if.js
Even
Odd

PS C:\Users\0613\OneDrive\Documents\GitHub\_wp\HW\04>node 2-while.js
3
2
1
0

PS C:\Users\0613\OneDrive\Documents\GitHub\_wp\HW\04> node 3-array,for.js
{ sum: 100, average: 25 }

PS C:\Users\0613\OneDrive\Documents\GitHub\_wp\HW\04>node "4-array, for, if.js"
9

PS C:\Users\0613\OneDrive\Documents\GitHub\_wp\HW\04> node "5-array, function, if.js"
[ 5, 10 ]

PS C:\Users\0613\OneDrive\Documents\GitHub\_wp\HW\04> node "6-object.js"
Hi, I am Alex, I know JavaScript, HTML, CSS.

PS C:\Users\0613\OneDrive\Documents\GitHub\_wp\HW\04> node "7-object, for...in.js"
120

PS C:\Users\0613\OneDrive\Documents\GitHub\_wp\HW\04> node "8-json, object.js"
{ title: 'JavaScript Book', price: 450 }

PS C:\Users\0613\OneDrive\Documents\GitHub\_wp\HW\04> node "9-array, object, for, if.js" 
[ 'Alice', 'Charlie' ]

PS C:\Users\0613\OneDrive\Documents\GitHub\_wp\HW\04> node "10-while, array.js"
[ 0, 1, 1, 2, 3 ]
[
  0, 1, 1,  2,
  3, 5, 8, 13
]
```

AI 問答 -- https://gemini.google.com/share/ff17bbe0d0ab

## 摘要

這是一份為你準備的 JavaScript 基礎程式練習題目集。內容涵蓋了 `if` 判斷式、`for` 與 `while` 迴圈、`function` 函式，以及 `array`、`object` 與 `json` 的操作。

你可以先把 **README** 的部分複製過去練習，寫完後再回來對照下面的**參考答案**。

---

# README.md

## 🚀 JavaScript 基礎程式練習題

本練習旨在幫助你熟悉 JavaScript 的核心語法。請嘗試不看答案，自己動手寫寫看！

### 📋 題目列表

#### 1. 奇偶數判斷 (if)

* **題目**：寫一個函式 `checkEvenOdd(num)`，接收一個整數。如果該整數是偶數，回傳 `"Even"`；如果是奇數，回傳 `"Odd"`。

#### 2. 倒數計時器 (while)

* **題目**：寫一個函式 `countdown(start)`，接收一個正整數。利用 `while` 迴圈，從該數字一路印到 0（包含 0）。

#### 3. 陣列總和與平均 (array, for)

* **題目**：寫一個函式 `calculateStats(numbers)`，接收一個數字陣列。回傳一個物件，包含該陣列的「總和 (sum)」與「平均值 (average)」。

#### 4. 尋找最大值 (array, for, if)

* **題目**：寫一個函式 `findMax(arr)`，接收一個數字陣列，並回傳陣列中的最大值。不可以使用 `Math.max()`。

#### 5. 陣列過濾器 (array, function, if)

* **題目**：寫一個函式 `filterPositive(arr)`，接收一個包含正負數的陣列，並回傳一個「只包含正數（大於 0）」的新陣列。

#### 6. 打造個人檔案物件 (object)

* **題目**：建立一個名為 `user` 的物件，包含 `name`（字串）、`age`（數字）與 `skills`（字串陣列）。並寫一個函式 `introduce(person)`，傳入該物件後，印出：`"Hi, I am [name], I know [skills的內容]."`

#### 7. 蔬果購物車計算 (object, for...in)

* **題目**：有一個購物車物件如下，請寫一個函式 `calculateTotal(cart)` 來計算並回傳購物車的總金額。
```javascript
const cart = { apple: 50, banana: 30, orange: 40 };

```



#### 8. JSON 資料解析與轉換 (json, object)

* **題目**：有一組從伺服器傳來的 JSON 字串。請寫一個函式 `parseAndExtract(jsonString)`，將其解析為 JavaScript 物件後，取出 `title` 與 `price` 並組合成一個新物件回傳。
```javascript
const jsonStr = '{"id": 101, "title": "JavaScript Book", "price": 450, "instock": true}';

```



#### 9. 陣列物件篩選 (array, object, for, if)

* **題目**：有一個學生陣列，請寫一個函式 `getPassedStudents(students)`，篩選出分數（score）大於或等於 60 分的學生**名字陣列**。
```javascript
const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 50 },
  { name: "Charlie", score: 75 }
];

```



#### 10. 費氏數列產生器 (while, array)

* **題目**：寫一個函式 `generateFibonacci(n)`，接收一個數字 $n$，利用 `while` 迴圈產生一個包含 $n$ 個元素的費氏數列陣列（前兩個數字固定為 0 和 1，之後的數字為前兩個數字相加）。
* *範例*：`generateFibonacci(5)` 應回傳 `[0, 1, 1, 2, 3]`



---

# 參考答案 (Answers)

以下是這 10 道題目的參考解答與測試程式碼：

```javascript
// 1. 奇偶數判斷 (if)
function checkEvenOdd(num) {
  if (num % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}
console.log("Q1:", checkEvenOdd(4)); // Even
console.log("Q1:", checkEvenOdd(7)); // Odd


// 2. 倒數計時器 (while)
function countdown(start) {
  console.log(`Q2 Countdown from ${start}:`);
  while (start >= 0) {
    console.log(start);
    start--;
  }
}
countdown(3); // 印出 3, 2, 1, 0


// 3. 陣列總和與平均 (array, for)
function calculateStats(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  let average = numbers.length === 0 ? 0 : sum / numbers.length;
  return { sum: sum, average: average };
}
console.log("Q3:", calculateStats([10, 20, 30, 40])); // { sum: 100, average: 25 }


// 4. 尋找最大值 (array, for, if)
function findMax(arr) {
  if (arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
console.log("Q4:", findMax([1, 5, 3, 9, 2])); // 9


// 5. 陣列過濾器 (array, function, if)
function filterPositive(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log("Q5:", filterPositive([-3, 5, 0, -1, 10])); // [5, 10]


// 6. 打造個人檔案物件 (object)
const user = {
  name: "Alex",
  age: 25,
  skills: ["JavaScript", "HTML", "CSS"]
};

function introduce(person) {
  console.log(`Q6: Hi, I am ${person.name}, I know ${person.skills.join(", ")}.`);
}
introduce(user); // Hi, I am Alex, I know JavaScript, HTML, CSS.


// 7. 蔬果購物車計算 (object, for...in)
const cart = { apple: 50, banana: 30, orange: 40 };

function calculateTotal(cartObject) {
  let total = 0;
  for (let key in cartObject) {
    total += cartObject[key];
  }
  return total;
}
console.log("Q7 Total Price:", calculateTotal(cart)); // 120


// 8. JSON 資料解析與轉換 (json, object)
const jsonStr = '{"id": 101, "title": "JavaScript Book", "price": 450, "instock": true}';

function parseAndExtract(jsonString) {
  // 將 JSON 字串轉為 JS 物件
  const obj = JSON.parse(jsonString); 
  return {
    title: obj.title,
    price: obj.price
  };
}
console.log("Q8:", parseAndExtract(jsonStr)); // { title: 'JavaScript Book', price: 450 }


// 9. 陣列物件篩選 (array, object, for, if)
const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 50 },
  { name: "Charlie", score: 75 }
];

function getPassedStudents(studentList) {
  let passedNames = [];
  for (let i = 0; i < studentList.length; i++) {
    if (studentList[i].score >= 60) {
      passedNames.push(studentList[i].name);
    }
  }
  return passedNames;
}
console.log("Q9 Passed:", getPassedStudents(students)); // ['Alice', 'Charlie']


// 10. 費氏數列產生器 (while, array)
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
console.log("Q10 Fibonacci(5):", generateFibonacci(5)); // [0, 1, 1, 2, 3]
console.log("Q10 Fibonacci(8):", generateFibonacci(8)); // [0, 1, 1, 2, 3, 5, 8, 13]

```