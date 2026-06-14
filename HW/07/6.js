const jsonStr = '{"title": "Post 1", "tags": ["js", "node"]}';

// 1. 將 JSON 字串轉換成 JavaScript 物件
let obj = JSON.parse(jsonStr);

// 2. 印出 tags 陣列中的第二個元素（注意：陣列索引從 0 開始計算）
console.log(obj.tags[1]);