var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DashBoardSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String
  },
  layoutType: {
    type: String
  },
  widgets: [{
    title: String,
    widgetType: String,
    minWidth: Number,
    maxWidth: Number,
    configs: {
      text: String
    }
  }],
  meta: {
    revision: {
      type: Number
    },
    created: { type: Date, default: Date.now },
    version: { type: Number }
  }
});

module.exports = mongoose.model('Display', DashBoardSchema);