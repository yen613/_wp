const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// 允許跨網域請求 (讓前端 Next.js 可以連過來)
app.use(cors());
// 讓伺服器看得懂 JSON 格式的資料
app.use(express.json());

// 測試用 API 路由
app.get('/api/health', (req, res) => {
    res.json({ 
        status: "success", 
        message: "Node.js 核心校務系統後端運作正常！" 
    });
});

// 啟動監聽
app.listen(PORT, () => {
    console.log(`🚀 核心後端已啟動！監聽 Port: ${PORT}`);
});