// 1. 定義 cleanData 函數
function cleanData(arr) {
    arr.pop();         // 移除陣列的最後一個元素 (破壞性)
    arr.unshift("Start"); // 在陣列最前面加上元素 (破壞性)
}

// 2. 驗證
let myData = [1, 2, 3];

console.log("執行前 myData:", myData); // 輸出: [1, 2, 3]

cleanData(myData);

console.log("執行後 myData:", myData); // 輸出: ["Start", 1, 2]
