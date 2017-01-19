// Library imports.
const mongoose = require('mongoose');

// Custom imports
const configJson = require('../config.json');

// Constants
mongoose.connect(configJson.mongoDbUri);
const db = mongoose.connection;

console.log('Initiating database connection...'.yellow);
db.on('error', console.error.bind(console, 'Database Connection Error:'.red));

module.exports = db;
