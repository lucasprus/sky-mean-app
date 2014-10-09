var mongoose = require('mongoose');

var SignInAttemptsSchema = new mongoose.Schema({
  IP: {
    type: String,
    required: true
  },
  Datetime: {
    type: Date,
    required: true,
    default: Date.now
  },
  Action: {
    type: String,
    required: true,
    'enum': ['AUTH_SUCCESS', 'AUTH_FAILURE']
  },
  Username: {
    type: String,
    required: true,
    lowercase: true
  }
});


module.exports = SignInAttemptsSchema;
