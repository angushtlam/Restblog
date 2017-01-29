// Library imports.
require('colors');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

// Custom imports.
const db = require('./db');
const Session = require('./db/models/session');

// Route imports.
const api = require('./routes/api');
const index = require('./routes/index');

// Constants
const PORT = 3000;

// Initiate Express app.
const app = express();

// Load external middlewares
app.use(bodyParser.json());

// Handle static files
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

// Load routes that the app uses.
app.use('/', index);
app.use('/api', api);

// Wait for database connection.
db.once('open', function() {
  // Clear all sessions on restart for security.
  console.log(('Dropping sessions on startup for security.').green);
  Session.collection.drop();

  app.listen(PORT, function () {
    console.log(('Database connected. App now listening on port ' + PORT + '.').green);
  });
});
