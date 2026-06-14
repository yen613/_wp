// 1. 定義 mathTool 函數
function mathTool(num1, num2, action) {
    // 呼叫傳進來的 action 函數，並將 num1 和 num2 當作參數帶入
    return action(num1, num2);
}

// 2. 測試：傳入「相加」的匿名函數
const addResult = mathTool(10, 5, function(a, b) {
    return a + b;
});
console.log(`相加結果：${addResult}`); // 輸出：10 + 5 = 15

// 3. 測試：傳入「相減」的匿名函數（這裡使用更精簡的箭頭函數寫法）
const subtractResult = mathTool(10, 5, (a, b) => a - b);
console.log(`相減結果：${subtractResult}`); // 輸出：10 - 5 = 5
