const posts = [
  { id: 1, t: "A" },
  { id: 2, t: "B" }
];

// 宣告一個空字串，準備用來累積 HTML 結構
let html = "";

// 使用 forEach 遍歷陣列，並透過樣板字串（Template Literals）拼接
posts.forEach(post => {
  html += `<div>${post.t}</div>`;
});

// 印出最終結果
console.log(html); 
// 輸出: <div>A</div><div>B</div>