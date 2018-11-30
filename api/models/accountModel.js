var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  meta: {
    revision: {
      type: Number
    },
    created: { type: Date, default: Date.now },
    version: { type: Number }
  },
  $loki: { type: Number }
});

module.exports = mongoose.model('Account', AccountSchema);