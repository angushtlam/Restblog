// Library imports.
const express = require('express');
const router = express.Router();
const sha256 = require('js-sha256');
const mongoose = require('mongoose');

// Custom imports.
// const { requireAdminAuthentication } = require('../../middlewares/auth');
const configFile = require('../../config.js');
const User = require('../../db/models/user');
const Session = require('../../db/models/session');

// Constants
const secretKey = configFile.getConfig().SECRET_KEY;

// Defining middleware for this router.
router.post('/verify', function (req, res) {
  const findUsername = req.body.username;
  const hashedPassword = sha256(req.body.password + secretKey);

  User.findOne({ 'username': findUsername }).lean().exec(function (err, q) {
    if (!q || q.password !== hashedPassword) {
      res.json({ responseCode: 'ERROR', responseMessage: 'User details invalid.' });
    } else {
      const msToExpire = req.body.longerSession ? 2592000000 : 86400000; // 30 days vs 1 day.
      const isAdmin = q.isAdmin;

      // Remove all older entries of user.
      Session.find({ 'username': findUsername }).remove((err) => {
        if (err) {
          console.log(err);
          res.json({ responseCode: 'ERROR', responseMessage: 'Internal server error.' });

        } else {
          const session = new Session({
            accessKey: sha256(new mongoose.Types.ObjectId() + secretKey),
            username: findUsername,
            expiry: new Date((+new Date) + msToExpire),
            isAdmin: isAdmin
          });
          session.save((err) => {
            err && console.log(err);
            res.json({ accessKey: session.accessKey });

          });
        }
      });
    }
  });
});

router.post('/validate', function (req, res) {
  const findAccessKey = req.body.accessKey;

  Session.findOne({ 'accessKey': findAccessKey }).lean().exec(function (err, q) {
    // If the key is not found or if it expired
    if (!q) {
      res.json({ responseCode: 'ERROR', responseMessage: 'Access key invalid. Please sign in again.' });
    } else {
      res.json({ responseCode: 'SUCCESS', responseMessage: 'Access key is valid.' });
    }
  });
});

router.post('/invalidate', function (req, res) {
  const findAccessKey = req.body.accessKey;

  Session.findOne({ 'accessKey': findAccessKey }).remove(function (err, q) {
    if (!q) {
      res.json({ responseCode: 'ERROR', responseMessage: 'Access key invalid.' });
    } else {
      res.json({ responseCode: 'SUCCESS', responseMessage: 'Access key is now invalidated.' });
    }
  });
});



// Export the router for use in the Express app.
module.exports = router;
