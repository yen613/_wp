const prices = [100, 200, 300, 400];

// 使用 map 方法結合精簡的箭頭函數
const discountedPrices = prices.map(price => price * 0.8);

console.log(discountedPrices); 
// 輸出結果：[80, 160, 240, 320]