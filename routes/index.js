// Library imports.
const express = require('express');
const router = express.Router();
const path = require('path');

// Defining middleware for this router.
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

// Export the router for use in the Express app.
module.exports = router;
