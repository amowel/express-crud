const db = require('../services/user.db.service');

exports.getAll = function(req, res, next) {
  console.log(req.user.role);
  if(req.user.role !== 'viewer') return next();
  db.findAllWithoutPrivateData()
    .then(users => {
      db.countUsers()
        .then(count => res.json({users, count}))
        .catch(e => next(e));
    })
    .catch(e => next(e));
};

exports.get = function(req, res, next) {
  db.findById(req.params.id)
    .then(user => res.json(user))
    .catch(e => next(e));
};

exports.post = function(req, res, next) {
  db.create(req.body)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(e => next(e));
};

exports.update = function(req, res, next) {
  db.update(req.params.id, req.body)
    .then(updatedUser => res.json(updatedUser))
    .catch(e => next(e));
};

exports.remove = function(req, res, next) {
  db.removeById(req.params.id)
    .then(removedUser => res.json(removedUser))
    .catch(e => next(e));
};


exports.searchByEmail = function(req, res, next) {

};
exports.countUsers = function(req, res, next) {
  db.countUsers()
    .then(count => res.json({count}))
    .catch(e => next(e));
};

exports.findByPosition = function(req, res, next) {
  db.findByPosition(req.params.from, req.params.to)
    .then(users => {
      db.countUsers()
        .then(count => res.json({users, count}))
        .catch(e => next(e));
    })
    .catch(e => next(e));
};

exports.searchForUsers = function(req, res, next) {
  if(req.query.value === '')
    next();
  db.usersStartingWith(req.query.value)
    .then(users => res.json(users))
    .catch(e => next(e));
};
