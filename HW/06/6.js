// 1. 手寫實作 myFilter 函數
function myFilter(arr, callback) {
    // 建立一個新陣列，用來存放符合條件的元素（保證不破壞原陣列）
    const result = [];
    
    // 遍歷傳進來的 arr
    for (let i = 0; i < arr.length; i++) {
        // 將當前的元素、索引值、以及原陣列傳給 callback 檢查
        // 如果 callback 回傳 true（或真值），就把元素推進新陣列
        if (callback(arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }
    
    // 回傳篩選後的全新陣列
    return result;
}

// 2. 驗證測試
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 測試一：篩選出所有偶數
const evenNumbers = myFilter(numbers, (item) => item % 2 === 0);
console.log("偶數篩選結果：", evenNumbers); // 輸出: [2, 4, 6, 8, 10]

// 測試二：篩選出大於 5 的數字
const greaterThanFive = myFilter(numbers, (item) => item > 5);
console.log("大於 5 的結果：", greaterThanFive); // 輸出: [6, 7, 8, 9, 10]
