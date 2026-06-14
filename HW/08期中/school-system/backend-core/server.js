const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const authController = require('./authController');
const courseController = require('./courseController'); // 1. 引入課程控制器
const { protect, authorize } = require('./authMiddleware'); // 2. 引入警衛中間件

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// 健康檢查
app.get('/api/health', (req, res) => {
    res.json({ status: "success", message: "Node.js 核心校務系統後端運作正常！" });
});

// --- 公開路由 ---
app.post('/api/auth/register', authController.register); 
app.post('/api/auth/login', authController.login);       

// --- 受保護路由 (新增課程：必須先登入 protect，且身分必須是 admin 才能開課) ---
app.post('/api/courses', protect, authorize('admin'), courseController.createCourse);


app.listen(PORT, () => {
    console.log(`🚀 核心後端已啟動！監聽 Port: ${PORT}`);
});