const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 引入資料庫連線模組，啟動時會自動測試連線
const db = require('./db');
const authController = require('./authController');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// 基礎健康檢查
app.get('/api/health', (req, res) => {
    res.json({ status: "success", message: "Node.js 核心校務系統後端運作正常！" });
});

// --- 身分驗證相關路由 ---
app.post('/api/auth/register', authController.register); // 註冊 API
app.post('/api/auth/login', authController.login);       // 登入 API


app.listen(PORT, () => {
    console.log(`🚀 核心後端已啟動！監聽 Port: ${PORT}`);
});