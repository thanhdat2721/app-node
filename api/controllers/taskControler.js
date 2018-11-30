const express = require('express');
const router = express.Router();
const tasksService = require('../services/taskService');
let middleware = require('../ultis');

router.get('/', middleware.checkToken, getAll);
module.exports = router;

function getAll(req, res, next) {
  tasksService.getAllTasks()
    .then(tasks => res.json(tasks))
    .catch(err => next(err));
}
