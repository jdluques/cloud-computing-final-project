const jwt = require('jsonwebtoken');

module.exports = {
  validateToken(authHeader) {
    if (!authHeader) {
      throw new Error('Authorization token is required.');
    }

    const token = authHeader.replace('Bearer ', '');
    return jwt.verify(token, process.env.JWT_SECRET);
  },
};
