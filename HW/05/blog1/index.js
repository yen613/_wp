const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { createDb, saveDb } = require('./database');

const logFile = path.join(__dirname, 'server.log');
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(logFile, line + '\n');
}

log('=== Blog server starting ===');
log(`__dirname: ${__dirname}`);
log(`process.cwd(): ${process.cwd()}`);
log(`Node version: ${process.version}`);
log(`Platform: ${process.platform}`);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let db;

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.get('/', (req, res) => {
  const stmt = db.prepare('SELECT id, title, created_at FROM posts ORDER BY created_at DESC');
  const posts = [];
  while (stmt.step()) {
    posts.push(stmt.getAsObject());
  }
  stmt.free();
  res.render('index', { posts });
});

app.get('/post/new', (req, res) => {
  res.render('new');
});

app.post('/post', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Title and content are required.');
  }
  db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
  saveDb(db);
  const stmt = db.prepare('SELECT MAX(id) AS id FROM posts');
  stmt.step();
  const { id } = stmt.getAsObject();
  stmt.free();
  res.redirect(`/post/${id}`);
});

app.get('/post/:id', (req, res) => {
  const stmt = db.prepare('SELECT * FROM posts WHERE id = ?');
  stmt.bind([req.params.id]);
  if (stmt.step()) {
    const post = stmt.getAsObject();
    stmt.free();
    res.render('show', { post });
  } else {
    stmt.free();
    res.status(404).send('Post not found.');
  }
});

app.get('/post/:id/edit', (req, res) => {
  const stmt = db.prepare('SELECT * FROM posts WHERE id = ?');
  stmt.bind([req.params.id]);
  if (stmt.step()) {
    const post = stmt.getAsObject();
    stmt.free();
    res.render('edit', { post });
  } else {
    stmt.free();
    res.status(404).send('Post not found.');
  }
});

app.post('/post/:id', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Title and content are required.');
  }
  db.run('UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [title, content, req.params.id]);
  saveDb(db);
  res.redirect(`/post/${req.params.id}`);
});

app.post('/post/:id/delete', (req, res) => {
  db.run('DELETE FROM posts WHERE id = ?', [req.params.id]);
  saveDb(db);
  res.redirect('/');
});

async function start() {
  try {
    log('Initializing database...');
    db = await createDb();
    log('Database ready');

    const server = app.listen(PORT, () => {
      const addr = server.address();
      log(`Blog server running at http://localhost:${PORT}`);
      log(`Address: ${JSON.stringify(addr)}`);
      log(`Working directory: ${__dirname}`);
      log('=== Server started successfully ===');
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        log(`ERROR: Port ${PORT} is already in use. Close other applications or change port.`);
      } else {
        log(`ERROR: ${err.message}`);
      }
    });
  } catch (err) {
    log(`FATAL: ${err.stack}`);
    process.exit(1);
  }
}

start();
