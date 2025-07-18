const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "*",
  "Content-Type": "application/json"
};

module.exports = {
  success(data) {
    return {
      statusCode: 200,
      headers: defaultHeaders,
      body: JSON.stringify(data),
    };
  },

  error(message, statusCode = 500) {
    return {
      statusCode,
      headers: defaultHeaders,
      body: JSON.stringify({ error: message }),
    };
  },

  unauthorized() {
    return this.error('Unauthorized', 401);
  },
};
