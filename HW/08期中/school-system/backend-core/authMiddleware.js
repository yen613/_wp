const jwt = require('jsonwebtoken');

// 警衛 A：負責檢查有沒有登入 (驗證 Token 是否合法)
const protect = (req, res, next) => {
    let token;

    // 規定前端要把 Token 放在 Headers 的 Authorization 裡，格式為: Bearer <TOKEN>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            // 解密 Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 把解密出來的使用者資料 (id, role) 塞進 req 裡，讓後面的 API 可以用
            req.user = decoded;
            
            next(); // 通關！前往下一個邏輯
        } catch (error) {
            return res.status(401).json({ message: 'Token 驗證失敗，權限不足！' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: '未提供 Token，拒絕存取！' });
    }
};

// 警衛 B：負責檢查角色夠不夠大 (例如：限管理員才能進)
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `您的身分是 ${req.user?.role || '未知'}，無權使用此功能！` });
        }
        next(); // 角色符合，通關！
    };
};

module.exports = { protect, authorize };