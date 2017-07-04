const jwt = require('jsonwebtoken');
const db = require('../services/user.db.service');
const config = require('../config');
const checkToken = require('express-jwt')({ secret: config.secret });
//Defining model here instead importing it just to save autocomplete .
const mongoose = require('mongoose');
const User = mongoose.model('user', require('../models/user'));

exports.login = function(req, res, next) {
  db.findByEmail(req.body.email)
    .then(user => {
      if(!user) return next(new Error('No user found with this email'));
      console.log(req.body);
      if(req.body.email === user.email && User.comparePasswords(req.body.password, user.password)) {
        const token = jwt.sign({
          __id: user.__id
        }, config.secret);
        res.json({
          token,
          email: user.email,
          _id: user.__id,
          role: user.role
        });
      }
    })
    .catch(e => next(e));
};

exports.verifyToken = function(req, res, next) {
  checkToken(req, res, next);
};

