const express = require('express');
const router = express.Router();

// Defining middleware for this router.
router.get('/', function (req, res) {
  res.send('It works!');
});

// Export the router for use in the Express app.
module.exports = router;
