// Import required modules
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

let data = []; // Declare the data variable

// Define a route to render the form
app.get('/', (req, res) => {
  // Read the CSV file
  data = []; // Clear the data array
  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      // Render the 'form.ejs' template and pass the data as a variable
      res.render('form', { data: data.map((row) => row.option) });
    });
});

// Define a route to handle the form submission
app.post('/', (req, res) => {
  const selectedOption = req.body.selectData;
  // Find the row associated with the selected option
  const selectedRow = data.find((row) => row.option === selectedOption);
  res.render('result', { selectedRow });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
