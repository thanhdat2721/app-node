import Contact from '../../../models/contactModel';

export default {
  Query: {
    contacts: (_, args, user) => {
      // make sure user is logged in
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      // user is authenticated
      return new Promise((resolve, reject) => {
        Contact.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },

  Mutation: {
    addContact: (root, { id, firstName, lastName, employeeId }, user) => {
      if (!user) {
        throw new Error('You are not authenticated!')
      }
      const newContact = new Contact({ id, firstName, lastName, employeeId });
      return new Promise((resolve, reject) => {
        newContact.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};