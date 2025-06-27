module.exports = {
  getPaginationParams(event) {
    const queryParams = event.queryStringParameters || {};
    const limit = parseInt(queryParams.limit, 10) || 10;
    const lastKey = queryParams.lastKey ? JSON.parse(queryParams.lastKey) : null;

    return { limit, lastKey };
  },
};
