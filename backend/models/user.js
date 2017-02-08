// Require necessary libraries
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Import To do model
var Todo = require('./todo');
// Schema for mongoose to search in MongoDB
var userSchema = new Schema({
  username : String,
  password : String,
  firstName: String,
  lastName: String,
  email: String,
  role: String,
  todos: [Todo]
});

module.exports = mongoose.model('User', userSchema, 'users');