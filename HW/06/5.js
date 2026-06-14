// 1. 定義 multiplier 函數，它會回傳一個箭頭函數
function multiplier(factor) {
    // 回傳一個接受參數 n 的箭頭函數
    return (n) => n * factor;
}

// 2. 驗證範例用法
const double = multiplier(2);  // 建立一個「乘以 2」的專屬函數
console.log(double(10));      // 輸出：20

const triple = multiplier(3);  // 建立一個「乘以 3」的專屬函數
console.log(triple(10));      // 輸出：30