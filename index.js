// Library imports.
const colors = require('colors');
const express = require('express');

// Custom imports.
const db = require('./db');

// Route imports.
const api = require('./routes/api');
const index = require('./routes/index');

// Constants
const PORT = 3000;

// Initiate Express app.
const app = express();

// Load routes that the app uses.
app.use('/', index);
app.use('/api', api);

// Wait for database connection.
db.once('open', function() {
  app.listen(PORT, function () {
    console.log(('Database connected. App now listening on port ' + PORT + '.').green);
  });
});
