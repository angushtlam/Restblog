// Library imports.
require('colors');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

// Custom imports.
const configFile = require('./config');
const database = require('./db');
const Session = require('./db/models/session');

// Route imports.
const api = require('./routes/api');
const admin = require('./routes/admin');
const index = require('./routes/index');

class Restblog {
  init() {
    startServer();
  }

  setConfig(config) {
    configFile.setConfig(config);
  }
}

function startServer() {
  // Initiate Express app.
  const app = express();

  // Use Pug for templating.
  app.set('view engine', 'pug');

  // Load external middlewares
  app.use(bodyParser.json());

  // Handle static files
  app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

  // Load routes that the app uses.
  app.use('/api', api);
  app.use('/', admin);
  app.use('/', index);

  // Handle error 404s.
  app.use(function (req, res) {
    res.status(404).send('Sorry, that page doesn\'t exist!');
  });

  // Start database connection.
  const c = configFile.getConfig();
  const db = database.connect(c.DATABASE_URI);

  db.once('open', function() {
    // Clear all sessions on restart for security.
    console.log(('Dropping sessions on startup for security.').green);
    Session.collection.drop();

    app.listen(c.PORT, function () {
      console.log(('Database connected').green);
      console.log(('Restblog now listening on port ' + c.PORT + '.').green);
    });
  });
}

module.exports = Restblog;
