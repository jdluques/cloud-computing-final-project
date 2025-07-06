const jwt = require('jsonwebtoken');

module.exports = {
  validateToken(authHeader) {
    if (!authHeader) {
      throw new Error('Authorization token is required.');
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.tenantId) {
      throw new Error('Invalid token payload: missing tenantId');
    }

    return decoded;
  },
};
