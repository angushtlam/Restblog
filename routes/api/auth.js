// Library imports.
const express = require('express');
const router = express.Router();
const sha256 = require('js-sha256');

// Custom imports.
// const { requireAdminAuthentication } = require('../../middlewares/auth');
const configJson = require('../../config.json');
const User = require('../../db/models/user');
const Session = require('../../db/models/session');

// Constants
const secretKey = configJson.secretKey;

// Defining middleware for this router.
router.post('/validate', function (req, res) {
  const findUsername = req.body.username;
  const hashedPassword = sha256(req.body.password + secretKey);

  User.findOne({ 'username': findUsername }).lean().exec(function (err, q) {
    if (!q || q.password !== hashedPassword) {
      res.json({ responseCode: 'ERROR', responseMessage: 'User details invalid.' });
    } else {
      // Generate a new session id.
      const msToExpire = req.body.longerSession ? 2592000000 : 86400000; // 30 days vs 1 day.
      const session = new Session({
        username: findUsername,
        expiry: new Date((+new Date) + msToExpire),
        isAdmin: q.isAdmin
      });
      session.save((err) => {
        err && console.log(err);
        res.json({ accessKey: session._id });
        
      });
    }
  });
});

// Export the router for use in the Express app.
module.exports = router;
