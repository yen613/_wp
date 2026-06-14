const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { createDb, saveDb, findUserByUsername, findUserById, createUser } = require('./database');

const logFile = path.join(__dirname, 'server.log');
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(logFile, line + '\n');
}

log('=== Blog server starting ===');
log(`__dirname: ${__dirname}`);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'blog-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
}));

let db;

app.use((req, res, next) => {
  req.db = db;
  res.locals.user = req.session.user || null;
  next();
});

function requireAuth(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

app.get('/', (req, res) => {
  const stmt = db.prepare('SELECT id, title, created_at FROM posts ORDER BY created_at DESC');
  const posts = [];
  while (stmt.step()) posts.push(stmt.getAsObject());
  stmt.free();
  res.render('index', { posts });
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password, confirm } = req.body;
  if (!username || !password || !confirm) {
    return res.status(400).send('All fields are required.');
  }
  if (password !== confirm) {
    return res.status(400).send('Passwords do not match.');
  }
  if (password.length < 4) {
    return res.status(400).send('Password must be at least 4 characters.');
  }
  if (findUserByUsername(db, username)) {
    return res.status(400).send('Username already exists.');
  }
  const hashed = await bcrypt.hash(password, 10);
  createUser(db, username, hashed);
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }
  const user = findUserByUsername(db, username);
  if (!user) {
    return res.status(400).send('Invalid username or password.');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).send('Invalid username or password.');
  }
  req.session.user = { id: user.id, username: user.username };
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

app.get('/post/new', requireAuth, (req, res) => {
  res.render('new');
});

app.post('/post', requireAuth, (req, res) => {
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

app.get('/post/:id/edit', requireAuth, (req, res) => {
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

app.post('/post/:id', requireAuth, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Title and content are required.');
  }
  db.run('UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [title, content, req.params.id]);
  saveDb(db);
  res.redirect(`/post/${req.params.id}`);
});

app.post('/post/:id/delete', requireAuth, (req, res) => {
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
      log(`Blog server running at http://localhost:${PORT}`);
      log(`Working directory: ${__dirname}`);
      log('=== Server started successfully ===');
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        log(`ERROR: Port ${PORT} is already in use.`);
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
