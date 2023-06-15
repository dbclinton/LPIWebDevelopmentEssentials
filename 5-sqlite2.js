const sqlite3 = require('sqlite3').verbose();

// Create/connect to the database
const db = new sqlite3.Database('mydatabase.db');

// Create a table
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER
)`);

// Insert data
const insertQuery = `INSERT INTO users (name, age) VALUES (?, ?)`;
const name = 'Trevor';
const age = 5;
db.run(insertQuery, [name, age], function (err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`Inserted data with id ${this.lastID}`);
    }
});

// Close the database connection
db.close();
