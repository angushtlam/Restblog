const path = require('path');

let SECRET_KEY = 'THIS_SECRET_KEY_HAS_NOT_BEEN_CHANGED';
let DATABASE_URI = 'mongodb://localhost/restblog';
let HOST = '0.0.0.0';
let PORT = 3000;
let TEMPLATES_FOLDER = path.join(__dirname, 'templates');

exports.getConfig = function () {
  return {
    SECRET_KEY,
    DATABASE_URI,
    HOST,
    PORT,
    TEMPLATES_FOLDER
  };
};

exports.setConfig = function (config) {
  if (config.SECRET_KEY) config.SECRET_KEY = SECRET_KEY;
  if (config.DATABASE_URI) config.DATABASE_URI = DATABASE_URI;
  if (config.HOST) config.HOST = HOST;
  if (config.PORT) config.PORT = PORT;
  if (config.TEMPLATES_FOLDER) config.TEMPLATES_FOLDER = TEMPLATES_FOLDER;
};
