// Library imports.
const express = require('express');
const router = express.Router();
const path = require('path');

// Import configuration
const configFile = require('../config.js');
const templatesFolder = configFile.getConfig().TEMPLATES_FOLDER;
console.log(templatesFolder);

// Defining middleware for this router.
router.get('/', function (req, res) {
  res.render(path.join(templatesFolder, 'index'), {
    title: 'Home',
    sitename: 'Restblog'
  });
});

router.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

// Export the router for use in the Express app.
module.exports = router;
