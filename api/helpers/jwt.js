const expressJwt = require('express-jwt');
const config = require('config.json');
const authService = require('../services/authenServices');

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      '/authentication/authenticate',
      '/authentication/register'
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await authService.getById(payload.sub);
  console.log(payload)
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }
  done();
};