// 測試情境一：user 有值
const user1 = "Guest";
const html1 = `<h1>Welcome, ${user1 ? user1 : "Stranger"}</h1>`;
console.log(html1); // 輸出: <h1>Welcome, Guest</h1>

// 測試情境二：user 沒有值 (空字串、null 或 undefined)
const user2 = "";
const html2 = `<h1>Welcome, ${user2 ? user2 : "Stranger"}</h1>`;
console.log(html2); // 輸出: <h1>Welcome, Stranger</h1>