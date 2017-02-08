var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// To do schema to search in MongoDB
var todoSchema = new Schema({
  id: Number,
  text : String,
  isCompleted : Boolean,
  description: String
});

module.exports = todoSchema;