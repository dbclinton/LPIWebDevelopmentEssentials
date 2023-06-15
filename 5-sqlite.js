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
const name = 'John';
const age = 25;
db.run(insertQuery, [name, age], function (err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`Inserted data with id ${this.lastID}`);
    }
});

// Modify data
const updateQuery = `UPDATE users SET age = ? WHERE name = ?`;
const updatedAge = 30;
const updatedName = 'John';
db.run(updateQuery, [updatedAge, updatedName], function (err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`Modified ${this.changes} row(s)`);
    }
});

// Delete data
const deleteQuery = `DELETE FROM users WHERE name = ?`;
const deletedName = 'John';
db.run(deleteQuery, [deletedName], function (err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`Deleted ${this.changes} row(s)`);
    }
});

// Close the database connection
db.close();

