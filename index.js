// Library Imports
const express = require('express');

// Custom Imports
const api = require('./routes/api');
const index = require('./routes/index');

// Initiate Express app.
const app = express();

// Load routes that the app uses.
app.use('/', index);
app.use('/api', api);

// Listen to port
const port = 3000;
app.listen(port, function () {
  console.log('App listening on port ' + port + '.');
});
