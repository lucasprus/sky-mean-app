'use strict';

function notLoggedIn(req, res, next) {
  if (req.session.user) {
    res.send('Forbidden. Please log out first.', 403);
  } else {
    next();
  }
}

module.exports = notLoggedIn;
