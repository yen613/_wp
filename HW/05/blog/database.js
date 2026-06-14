const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'blog.db');

async function createDb() {
  const SQL = await initSqlJs();
  let db;
  const exists = fs.existsSync(dbPath);
  console.log(`Database file exists: ${exists}, path: ${dbPath}`);
  if (exists) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
    console.log('Database loaded from disk');
  } else {
    db = new SQL.Database();
    db.run(`CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    const data = db.export();
    fs.writeFileSync(dbPath, Buffer.from(data));
    console.log('New database created');
  }
  return db;
}

function saveDb(db) {
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

module.exports = { createDb, saveDb };
