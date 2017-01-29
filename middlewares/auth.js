const Session = require('../db/models/session');

function isAdminAuthenticated(req, res, next) {
  Session.findOne({ accessKey: req.body.accessKey }).lean().exec(function (err, q) {
    if (!q) {
      res.json({ responseCode: 'ERROR', responseMessage: 'Invalid access key.' });
    } else if (q.expiry < new Date()) {
      res.json({ responseCode: 'ERROR', responseMessage: 'Access key expired.' });
    } else if (!q.isAdmin) {
      res.json({ responseCode: 'ERROR', responseMessage: 'User does not have permission.' });
    } else {
      res.locals.username = q.username;
      next();
    }
  });
}

function isUserAuthenticated(req, res, next) {
  Session.findOne({ accessKey: req.body.accessKey }).lean().exec(function (err, q) {
    if (!q) {
      res.json({ responseCode: 'ERROR', responseMessage: 'Invalid access key.' });
    } else if (q.expiry < new Date()) {
      res.json({ responseCode: 'ERROR', responseMessage: 'Access key expired.' });
    } else {
      res.locals.username = q.username;
      next();
    }
  });
}

module.exports = {
  isAdminAuthenticated,
  isUserAuthenticated
};
