import middleware from '../ultis'

const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../helpers/db');
const User = db.User;
const DashBoard = db.DashBoard;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  const dashBoard = [await DashBoard.findOne({ userId: user._id })];
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
      token,
      dashBoard
    };
  }
}

async function getAll() {
  return await User.find().select('-password');
}

async function getById(id) {
  return await User.findById(id).select('-password');
}

async function create(userParam) {
  let status = true;

  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const user = new User(userParam);
  if (userParam.password) {
    user.password = bcrypt.hashSync(userParam.password, 10);
  }
  try {
    await user.save();
    let userDashBoard = await User.findOne({ username: userParam.username })
    let dataDashBoard = middleware.prepareDashBoards(userDashBoard);
    let defaultDashBoard = new DashBoard(dataDashBoard);
    await defaultDashBoard.save();
    return status;
  } catch (err) {
    throw err
  }
}

async function update(id, userParam) {
  const user = await User.findById(id);

  if (!user) throw 'User not found';
  if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  Object.assign(user, userParam);
  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}