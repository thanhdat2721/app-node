const config = require('../../config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
  User: require('../models/accountModel'),
  Contacts: require('../models/contactModel'),
  Tasks: require('../models/taskModel'),
  DashBoard: require('../models/dashBoard')
};