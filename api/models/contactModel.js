var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContactsSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  title: {
    type: String
  },
  department: {
    type: String
  },
  project: {
    type: String
  },
  avatar: {
    type: String
  },
  employeeId: {
    type: String,
    required: true
  },
  superiorId: {
    type: Number
  },
  meta: {
    revision: {
      type: Number
    },
    created: { type: Date },
    version: { type: Number }
  },
  id: { type: Number }
});

module.exports = mongoose.model('Contacts', ContactsSchema);