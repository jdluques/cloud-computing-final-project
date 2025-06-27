module.exports = {
  success(data) {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  },
  error(message, statusCode = 500) {
    return {
      statusCode,
      body: JSON.stringify({ error: message }),
    };
  },
  unauthorized() {
    return this.error('Unauthorized', 401);
  },
};
