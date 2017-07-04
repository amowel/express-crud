//Defining model here instead importing it just to save autocomplete in current file.
const mongoose = require('mongoose');
const User = mongoose.model('user', require('../models/user'));
const config = require('../config');
mongoose.Promise = require('bluebird');

mongoose.connect(config.mongooseUri)
  .catch(e => console.error(e));


exports.findAll = function() {
  return User.find({});
};

exports.findById = function(id) {
  return User.findById(id);
};

exports.create = function(user) {
  console.log(user);
  let newUser = new User(user);
  console.log(newUser);
  return newUser.save();
};

exports.update = function(id, user) {
  return User.findByIdAndUpdate(id,
    {
      $set: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        date: user.date,
        password: user.password,
        role: user.role
      }
    },
    { new: true });
};

exports.removeById = function(id) {
  return User.findByIdAndRemove(id);
};

exports.findByEmail = function(email) {
  return User.findOne({ email });
};

exports.findAllWithoutPrivateData = function() {
  return User.find()
    .select('-password');
};

exports.countUsers = function() {
  return User.count({}).exec();
};

exports.findByPosition = function(from, to) {
  return User.find()
    .skip(+from)
    .limit(+to - from)
    .exec();
};

exports.startsWithByFirstName = function(firstName) {
  return User.find({firstName: new RegExp(`^${firstName}.*$`, 'i')});
};

exports.startsWithByLastName = function(lastName) {
  return User.find({lastName: new RegExp(`^${lastName}.*$`, 'i')});
};

exports.startsWithByEmail = function(email) {
  return User.find({email: new RegExp(`^${email}.*$`, 'i')});
};

exports.usersStartingWith = function(value) {
  const regexp = new RegExp(`^${value}.*$`, 'i');
  return User.find({ $or: [{ firstName: regexp }, { lastName: regexp }, { email: regexp }]});
};
