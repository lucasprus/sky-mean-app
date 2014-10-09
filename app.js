'use strict';

var express = require('express'),
  logger = require('morgan'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  path = require('path'),
  errorHandler = require('errorhandler');

// Environment variables with mongohq(now compose) login credentials 
console.log(process.env.DATABASE_USER);
console.log(process.env.DATABASE_PASSWORD);

var dbURL = 'mongodb://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD + '@dharma.mongohq.com:10073/lucasprus';
require('mongoose').connect(dbURL);

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 20000
  },
  secret: 'uwotm8'
}));

// For production serve files from 'dist' directory
// localhost:3000/production/
app.use('/production', express.static(path.join(__dirname, 'dist')));

// For development serve files from 'app' and 'bower_components' directories
// localhost:3000/
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'app')));

// Development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

require('./routes/index')(app);
require('./routes/session')(app);

var port = app.get('port');
app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
