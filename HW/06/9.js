const tasks = ["Task", "Completed"];

// 使用 setTimeout 延遲 2 秒執行
setTimeout(() => {
    // 使用 join(" ") 將陣列元素用空格組合起來
    const result = tasks.join(" ");
    console.log(result);
}, 2000); // 2000 毫秒等於 2 秒