const db = require('../helpers/db');
const Tasks = db.Tasks;

module.exports = {
  getAllTasks
}

async function getAllTasks() {
  return await Tasks.find();
}