// 1. 定義 checkAdmin 函數
function checkAdmin(role, callback) {
  if (role !== "admin") {
    // 發生錯誤：第一個參數傳入錯誤訊息字串（或 Error 物件），第二個參數不傳
    return callback("Access Denied");
  }
  
  // 驗證成功：第一個參數傳入 null，第二個參數傳入成功的資料
  callback(null, "Welcome");
}

// ==========================================
// 2. 測試情境一：非 admin 登入（預期會觸發錯誤）
// ==========================================
checkAdmin("guest", (err, message) => {
  // 關鍵的核心判斷：一進來先檢查有沒有錯誤！
  if (err) {
    console.error("【失敗】拒絕存取，原因：", err);
    return; // 這裡的 return 很重要，用來中斷執行，防止後續程式碼跑起來
  }
  
  // 如果沒有 err 才會走到這裡
  console.log("【成功】歡迎訊息：", message);
});


// ==========================================
// 3. 測試情境二：admin 登入（預期順利通過）
// ==========================================
checkAdmin("admin", (err, message) => {
  if (err) {
    console.error("【失敗】拒絕存取，原因：", err);
    return;
  }
  
  // 順利通過驗證
  console.log("【成功】歡迎訊息：", message);
});