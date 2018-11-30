var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  task: {
    type: String
  },
  isCompleted: {
    type: Boolean
  },
  userId: {
    type: Number
  },
  meta: {
    revision: {
      type: Number
    },
    created: { type: Date, default: Date.now },
    version: { type: Number }
  },
  id: { type: Number }
});

module.exports = mongoose.model('Task', TaskSchema);