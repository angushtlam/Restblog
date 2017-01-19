// Library imports.
const mongoose = require('mongoose');

// Constants
const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, index: true },
  expiry: Date,
  isAdmin: Boolean
});

module.exports = schema;
