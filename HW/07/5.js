// 1. 定義函數，接受 id 與 callback 兩個參數
function fetchData(id, callback) {
  // 2. 邏輯：在函數內宣告資料物件
  const data = { 
    id: id, 
    status: "success" 
  };
  
  // 3. 執行：呼叫 callback，第一個參數傳 error (null)，第二個傳資料 (data)
  callback(null, data);
}

// 4. 實際呼叫 fetchData 進行測試
fetchData(42, (err, result) => {
  if (err) {
    console.error("發生錯誤了：", err);
    return;
  }
  
  // 如果沒有錯誤，順利拿到資料
  console.log("成功取得資料：", result);
});