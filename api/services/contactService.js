const db = require('../helpers/db');
const Contact = db.Contacts;

module.exports = {
  getAllContacts,
  deleteContact
}

async function getAllContacts() {
  return await Contact.find();
}

async function deleteContact(id) {
  await Contact.findByIdAndRemove(id);
}

