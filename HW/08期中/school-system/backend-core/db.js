const { Pool } = require('pg');
require('dotenv').config();

// 建立 PostgreSQL 連線池
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // 雲端資料庫（如 Neon）通常要求必須使用 SSL 安全連線
  ssl: {
    rejectUnauthorized: false
  }
});

// 測試連線
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Neon.tech 資料庫連線失敗：', err.stack);
  } else {
    console.log('✅ Neon.tech 雲端資料庫連線成功！伺服器時間：', res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
