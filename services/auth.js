const jwt = require('jsonwebtoken');
const { JWT_SECRET_TOKEN } = require('../config');

// get the user info from a JWT
const getUser = (token) => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, JWT_SECRET_TOKEN);
    } catch (err) {
      // if there's a problem with the token, throw an error
      return { error: true, msg: 'Session invalid' };
    }
  }

  return { error: true, msg: 'Authentication token is required' };
};

const createToken = (user, expiresIn) => {
  const {
    id, email, userName, role,
  } = user;
  const token = jwt.sign({
    id, email, userName, role,
  }, 'secret', {
    expiresIn,
  });

  return token;
};

module.exports = {
  getUser,
  createToken,
};
