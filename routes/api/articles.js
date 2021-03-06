// Library imports.
const express = require('express');
const router = express.Router();

// Custom imports.
const Article = require('../../db/models/article');

// Defining middleware for this router.
router.get('/list', function (req, res) {
  Article.find({}).lean().distinct('_id').exec(function (err, q) {
    res.json(q);
  });
});

// Export the router for use in the Express app.
module.exports = router;
