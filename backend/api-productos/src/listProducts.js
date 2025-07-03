const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const paginationHelper = require('./utils/paginationHelper');
const authMiddleware = require('./middlewares/authMiddleware');

module.exports.handler = async (event) => {
  try {
    const token = authMiddleware.validateToken(event.headers.Authorization);
    const tenantId = token.tenantId;
    if (!token || !tenantId) {
      return responseBuilder.unauthorized();
    }
    const { limit, lastKey } = paginationHelper.getPaginationParams(event);
    const params = {
      TableName: process.env.DYNAMODB_TABLE_PRODUCTS,
      KeyConditionExpression: 'tenantId = :tenantId',
      ExpressionAttributeValues: { ':tenantId': tenantId },
      Limit: limit,
      ExclusiveStartKey: lastKey,
    };
    const result = await dynamoClient.query(params);
    return responseBuilder.success({
      items: result.Items,
      lastKey: result.LastEvaluatedKey ? JSON.stringify(result.LastEvaluatedKey) : null,
    });
  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
