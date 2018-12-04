import Account from '../../../models/accountModel'
import config from '../../../../config.json'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export default {
  Mutation: {
    // Handle user signup
    async signup(_, { username, firstname, lastname, password }) {
      let status = true
      let data = { username, firstname, lastname, password }
      if (await Account.findOne({ usernme: data.username })) {
        throw 'Username "' + data.username + '" is already taken';
      }

      let user = new Account(data);
      if (data.password) {
        user.password = bcrypt.hashSync(data.password, 10);
      }

      try {
        await user.save();
        return status;
      } catch (err) {
        throw err
      }
    },

    // Handles user login
    async login(_, { username, password }) {
      const user = await Account.findOne({ username: username });
      if (!user) {
        throw new Error('No user with that username')
      }
      if (user && bcrypt.compareSync(password, user.password)) {
        let status = true;
        const token = jwt.sign({ sub: user.id }, config.secret);
        return { token, status }
      } else {
        let status = false;
        return { token: null, status }
      }
    }
  }
}
