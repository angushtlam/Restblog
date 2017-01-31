const Restblog = require('../Restblog');
// const path = require('path');

const SECRET_KEY = '3Chicken17Potato12Evil3Marshmellow19King2Monster';
const DATABASE_URI = 'mongodb://localhost/restblog';
const HOST = '*';
const PORT = '3000';
// const TEMPLATES_FOLDER = path.join(__dirname, 'templates');

const blog = new Restblog();
blog.setConfig({
  SECRET_KEY,
  DATABASE_URI,
  HOST,
  PORT
  // STYLES_FOLDER,
  // TEMPLATES_FOLDER
});

blog.init();
