/* eslint-disable consistent-this */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const moment = require('moment');

const UserSchema = new Schema({
  firstName: {type: String, minlength: 2, maxlength: 60},
  lastName: {type: String, minlength: 2, maxlength: 60},
  email: {type: String, maxlength: 100, required: true},
  date: {type: Date, default: Date.now()},
  password: {type: String, match: /.{4,8}$/},
  role: {type: String, enum: ['admin', 'viewer']}
});

UserSchema.pre('save', function(next) {
  if(!this.isModified('date')) return next();
  moment(this.date).format('lll');
  next();
});

UserSchema.pre('save', function(next) {
  const user = this;

  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.statics.comparePasswords = function(plainTextPword, hash) {
  return bcrypt.compareSync(plainTextPword, hash);
};

UserSchema.methods.isAdmin = () => this.role === 'admin';

module.exports = UserSchema;

