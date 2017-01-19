// Library imports.
const express = require('express');
const router = express.Router();

// Defining middleware for this router.
router.get('/list', function (req, res) {
  res.json(['article1', 'article2', 'article3']);
});

// Export the router for use in the Express app.
module.exports = router;
