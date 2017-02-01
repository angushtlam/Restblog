// Library imports.
const express = require('express');
const router = express.Router();
const path = require('path');

// Import custom components
const Article = require('../db/models/article');
const Page = require('../db/models/page');

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

router.get('/:id', function (req, res, next) {
  const findId = req.params.id;

  Page.findOne({ '_id': findId, 'isPublished': true }).lean().exec(function (err, q) {
    if (q) {
      res.render(path.join(templatesFolder, 'page'), {
        sitename: 'Restblog',
        title: q.title,
        subtitle: q.subtitle,
        body: q.body
      });
    } else {
      Article.findOne({ '_id': findId, 'isPublished': true }).lean().exec(function (err, q) {
        if (q) {
          res.render(path.join(templatesFolder, 'page'), {
            sitename: 'Restblog',
            title: q.title,
            subtitle: q.subtitle,
            body: q.body
          });
        } else {
          next();
        }
      });
    }
  });
});

// Export the router for use in the Express app.
module.exports = router;
