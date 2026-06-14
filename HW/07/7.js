// 1. 定義模擬資料庫查詢的函數 fakeGet
function fakeGet(sql, params, callback) {
  // 內部邏輯：不管收到的 SQL 和參數是什麼，都假裝查詢成功
  // 依照「錯誤優先」原則，第一個參數傳 null，第二個傳模擬的資料物件
  callback(null, { title: "Fake Title" });
}

// 2. 測試：呼叫 fakeGet 函數
// 我們傳入一段假的 SQL 指令、參數陣列 [1]，以及用來接收結果的 Callback 函數
fakeGet("SELECT * FROM posts WHERE id = ?", [1], (err, row) => {
  if (err) {
    console.error("資料庫查詢失敗：", err);
    return;
  }
  
  // 成功拿到資料，印出標題
  console.log("從資料庫捞出的文章標題為：", row.title); 
});