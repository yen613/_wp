const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'blog.db');

async function createDb() {
  const SQL = await initSqlJs();
  let db;
  const exists = fs.existsSync(dbPath);
  if (exists) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  return db;
}

function saveDb(db) {
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

function findUserByUsername(db, username) {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  stmt.bind([username]);
  if (stmt.step()) {
    const user = stmt.getAsObject();
    stmt.free();
    return user;
  }
  stmt.free();
  return null;
}

function findUserById(db, id) {
  const stmt = db.prepare('SELECT id, username, created_at FROM users WHERE id = ?');
  stmt.bind([id]);
  if (stmt.step()) {
    const user = stmt.getAsObject();
    stmt.free();
    return user;
  }
  stmt.free();
  return null;
}

function createUser(db, username, hashedPassword) {
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
  saveDb(db);
  const stmt = db.prepare('SELECT MAX(id) AS id FROM users');
  stmt.step();
  const { id } = stmt.getAsObject();
  stmt.free();
  return id;
}

module.exports = { createDb, saveDb, findUserByUsername, findUserById, createUser };
