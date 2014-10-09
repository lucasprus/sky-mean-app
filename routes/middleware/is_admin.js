'use strict';

function isAdmin(req, res, next) {
  if (!req.session.user || req.session.user.username !== 'admin') {
    res.send('Forbidden. Please log in as admin first.', 403);
  } else {
    next();
  }
}

module.exports = isAdmin;
