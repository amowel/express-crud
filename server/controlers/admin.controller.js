const db = require('../services/user.db.service');

exports.getAll = function(req, res, next) {
  db.findAll()
    .then(users => {
      db.countUsers()
        .then(count => res.json({users, count}))
        .catch(e => next(e));
    })
    .catch(e => next(e));
};
