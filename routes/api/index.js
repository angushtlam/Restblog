// Library imports.
const express = require('express');
const router = express.Router();

// Custom Imports
const articles = require('./articles');
const pages = require('./pages');

// Defining middleware for this router.
router.get('/', function (req, res) {
  res.json('Welcome to the very RESTful API.');
});

router.use('/articles', articles);
router.use('/pages', pages);

// Export the router for use in the Express app.
module.exports = router;
