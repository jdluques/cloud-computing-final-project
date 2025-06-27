const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const paginationHelper = require('./utils/paginationHelper');

module.exports.handler = async (event) => {
  try {
    const { limit, lastKey } = paginationHelper.getPaginationParams(event);

    const params = {
      TableName: process.env.DYNAMODB_TABLE_PRODUCTS,
      Limit: limit,
      ExclusiveStartKey: lastKey,
    };

    const result = await dynamoClient.scan(params);
    return responseBuilder.success({
      items: result.Items,
      lastKey: result.LastEvaluatedKey ? JSON.stringify(result.LastEvaluatedKey) : null,
    });
  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
