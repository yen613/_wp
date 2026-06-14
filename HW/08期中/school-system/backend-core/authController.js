const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. 使用者註冊 (行政人員幫學生/教授開戶，或開放註冊)
exports.register = async (req, res) => {
    const { username, password, real_name, role } = req.body;
    
    try {
        // 檢查帳號是否已被註冊
        const userExist = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: '此帳號已被使用！' });
        }

        // 使用 bcrypt 雜湊密碼，安全第一
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 寫入資料庫
        const newUser = await db.query(
            'INSERT INTO users (username, password_hash, real_name, role) VALUES ($1, $2, $3, $4) RETURNING id, username, real_name, role',
            [username, passwordHash, real_name, role]
        );

        res.status(201).json({ message: '註冊成功！', user: newUser.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '伺服器出錯' });
    }
};

// 2. 使用者登入驗證
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 尋找使用者
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: '帳號或密碼錯誤！' });
        }

        const user = result.rows[0];

        // 比對密碼是否正確
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: '帳號或密碼錯誤！' });
        }

        // 登入成功，簽發 JWT 通行證 (內含使用者 ID 與 角色權限，有效期限 1 天)
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: '登入成功！',
            token,
            user: {
                id: user.id,
                username: user.username,
                real_name: user.real_name,
                role: user.role
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '伺服器出錯' });
    }
};