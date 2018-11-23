'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let config = require('../config-server.json');

let CommentSchema = new Schema({
  username: String,
  text: String,
  date: String,
  editDate: String,
  color: [],
  opacity: Number,
  userID: String
});

var connection = mongoose.createConnection(config.dbUri1);

module.exports = connection.model('comment', CommentSchema);
