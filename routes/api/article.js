// Library imports.
const express = require('express');
const router = express.Router();

// Custom imports.
const Article = require('../../db/models/article');
const { isAdminAuthenticated } = require('../../middlewares/auth');
const { titleToUrlSafeId } = require('../../utils/helpers');

// Defining middleware for this router.

// Gets an article by its ID.
// This route will not return any data for unpublished articles.
router.get('/get/:id', function (req, res) {
  const findId = req.params.id;

  Article.findOne({ '_id': findId, 'isPublished': true }).lean().exec(function (err, q) {
    q ? res.json(q) : res.json({});
  });
});

// Pushes a new article to the blog.
router.post('/push', isAdminAuthenticated, function (req, res) {
  const findId = req.body.id ? req.body.id : titleToUrlSafeId(req.body.title);
  const createdAt = req.body.createdAt ? new Date(req.body.createdAt) : new Date();

  new Article({
    _id: findId,
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: res.locals.username,
    body: req.body.body,
    createdAt: createdAt,
    lastUpdated: req.body.lastUpdated ? req.body.lastUpdated : createdAt,
    isPublished: req.body.isPublished

  }).save((err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.json({ responseCode: 'ERROR', responseMessage: 'An article with the same ID already exists. Please delete it first.' });
      } else {
        res.json({ responseCode: 'ERROR', responseMessage: 'Unknown database error: ' + err.code + '.' });
      }
    } else {
      res.json({ responseCode: 'SUCCESS', responseMessage: 'The article is successfully created.' });
    }
  });
});

// Deletes an article by its ID.
router.post('/delete/:id', isAdminAuthenticated, function (req, res) {
  const findId = req.params.id;

  Article.findByIdAndRemove({ '_id': findId }).lean().exec(function (err, q) {
    if (!q) {
      res.json({ responseCode: 'ERROR', responseMessage: 'You cannot delete an article that does not exist.' });
    } else {
      res.json({ responseCode: 'SUCCESS', responseMessage: 'The article is successfully deleted.' });
    }
  });
});

// Export the router for use in the Express app.
module.exports = router;
