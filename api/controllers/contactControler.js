const express = require('express');
const router = express.Router();
const contactService = require('../services/contactService');
let middleware = require('../ultis');

router.get('/', middleware.checkToken, getAll);
router.delete('/delete/:id', middleware.checkToken, _deleteContact)
module.exports = router;

function getAll(req, res, next) {
  contactService.getAllContacts()
    .then(contacts => res.json(contacts))
    .catch(err => next(err));
}

function _deleteContact(req, res, next) {
  contactService.deleteContact(req.params.id)
    .then(() => res.json({ message: "success" }))
    .catch(err => { next(err) });
}

