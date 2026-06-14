// 1. 定義 calculateTotal 函數
function calculateTotal(cart, discountFunc) {
    // 步驟一：將 cart 內的所有數字相加得到總和
    // 這裡使用內建的 reduce 方法來累加，你也可以使用一般的 for 迴圈
    const sum = cart.reduce((total, price) => total + price, 0);
    
    // 步驟二：將總和傳入 discountFunc 處理後，並將最終結果回傳
    return discountFunc(sum);
}

// 2. 測試驗證
const myCart = [100, 200, 300];

// 呼叫函數，並傳入一個「扣除 50 元」的匿名箭頭函數
const finalPrice = calculateTotal(myCart, (total) => total - 50);

console.log(`原價：600，折價後最終金額為：${finalPrice}`); 
// 輸出結果：550
