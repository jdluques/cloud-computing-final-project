const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');

module.exports.handler = async (event) => {
  try {
    const { productId } = event.pathParameters;

    const result = await dynamoClient.get(process.env.DYNAMODB_TABLE_PRODUCTS, { productId: productId });
    if (!result.Item) {
      return responseBuilder.error('Product not found', 404);
    }

    return responseBuilder.success(result.Item);
  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
