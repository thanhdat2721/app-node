let jwt = require('jsonwebtoken');
const config = require('../config.json');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

let prepareDashBoards = (user) => {
  let data = {
    userId: user._id,
    title: "My Default Dashboard",
    layoutType: "1_COLUMN",
    widgets: [
      {
        title: "Text Widget",
        widgetType: "TEXT_WIDGET",
        minWidth: 400,
        minHeight: 200,
        configs: {
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        }
      }
    ]
  }
  return data;
}

module.exports = {
  checkToken: checkToken,
  prepareDashBoards: prepareDashBoards
}