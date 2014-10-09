var mongoose = require('mongoose');
var SignInAttemptsSchema = require('../schemas/SignInAttempts');

var SignInAttempts = mongoose.model('skyMeanAppSignInAttempts', SignInAttemptsSchema);

module.exports = SignInAttempts;
