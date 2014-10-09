'use strict';

var SignInAttempts = require('../data/models/skyMeanAppSignInAttempts'),
  loggedIn = require('./middleware/logged_in'),
  isAdmin = require('./middleware/is_admin');

module.exports = function (app) {
  app.get('/restricted-content', loggedIn, function (req, res) {
    console.log('req.session.user', req.session.user);
    res.end('Welcome to the restricted content section ' + req.session.user.username + '!');
  });

  app.get('/sign-in-attempts', isAdmin, function (req, res) {
    SignInAttempts.find({})
      .sort('Username')
      .exec(function (err, users) {
        if (err) {
          return console.log(err);
        }
        res.json(users);
      });
  });
};
