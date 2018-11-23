'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let config = require('../config-server.json');

let UserSchema = new Schema({
  username: {type: String, require: true, index: { unique: true }},
  password: {type: String, require: true},
  _id: {type: Number, require: true, index: {unique: true}}
})

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

var connection = mongoose.createConnection(config.dbUri2);

module.exports = connection.model('user', UserSchema);
