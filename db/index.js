// Library imports.
const mongoose = require('mongoose');

exports.connect = function (mongoDbUri) {
  mongoose.connect(mongoDbUri);
  const db = mongoose.connection;

  console.log('Initiating database connection...'.yellow);
  db.on('error', console.error.bind(console, 'Database Connection Error:'.red));

  return db;
};
