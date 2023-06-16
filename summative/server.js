const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// SQLite database connection
const db = new sqlite3.Database('tasks.db');

// Create tasks table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      dueDate TEXT
    )
  `);
});

// ...

// API endpoints

// Get all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, dueDate } = req.body;

  db.run(
    'INSERT INTO tasks (title, description, dueDate) VALUES (?, ?, ?)',
    [title, description, dueDate],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const newTaskId = this.lastID;
        db.get('SELECT * FROM tasks WHERE id = ?', newTaskId, (err, row) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(201).json(row);
          }
        });
      }
    }
  );
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  db.run('DELETE FROM tasks WHERE id = ?', taskId, function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.sendStatus(204);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
