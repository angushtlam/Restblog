// Library imports.
const mongoose = require('mongoose');

// Constants
const MONGO_DB_URI = 'mongodb://localhost/restblog';

mongoose.connect(MONGO_DB_URI);
const db = mongoose.connection;

console.log('Initiating database connection...'.yellow);
db.on('error', console.error.bind(console, 'Database Connection Error:'.red));

module.exports = db;
