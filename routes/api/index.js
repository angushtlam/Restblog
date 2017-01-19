// Library imports.
const express = require('express');
const router = express.Router();

// Custom Imports
const article = require('./article');
const articles = require('./articles');
const page = require('./page');
const pages = require('./pages');
const auth = require('./auth');

// Defining middleware for this router.
router.get('/', function (req, res) {
  res.json('Welcome to the very RESTful API.');
});

router.use('/article', article);
router.use('/articles', articles);
router.use('/auth', auth);
router.use('/page', page);
router.use('/pages', pages);

// Export the router for use in the Express app.
module.exports = router;
