// 1. 建立一個空的 params 物件（模擬剛收到請求時，尚未解析參數的狀態）
const params = {};

// 2. 動態新增鍵為 "id"，值為 99 的屬性
params["id"] = 99; // 或者寫 params.id = 99;

// 3. 印出這個物件
console.log(params);