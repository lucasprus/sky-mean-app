'use strict';

var SignInAttempts = require('../data/models/skyMeanAppSignInAttempts'),
  notLoggedIn = require('./middleware/not_logged_in'),
  bodyParser = require('body-parser'),
  loggedIn = require('./middleware/logged_in');

var jsonParser = bodyParser.json({
  extended: false
});

module.exports = function (app) {
  app.post('/session', notLoggedIn, jsonParser, function (req, res) {
    console.log('req.body', req.body);
    var users = ['user', 'manager', 'admin', 'developer', 'tester'];

    if (users.indexOf(req.body.username.toLowerCase()) > -1 && req.body.password === 'password') {
      req.session.user = {
        username: req.body.username,
        password: req.body.password
      };

      SignInAttempts.create({
        IP: req.ip,
        Action: 'AUTH_SUCCESS',
        Username: req.body.username,
      }, function (err) {
        if (err) {
          console.log(err);
        }
      });

      res.status(200).send('Successfully signed in');
    } else {
      SignInAttempts.create({
        IP: req.ip,
        Action: 'AUTH_FAILURE',
        Username: req.body.username,
      }, function (err) {
        if (err) {
          console.log(err);
        }
      });

      res.status(401).send('Invalid combination of username and password');
    }

  });

  app.delete('/session', loggedIn, function (req, res) {
    req.session.destroy();
    res.status(200).send('Successfully signed out');
  });
};
