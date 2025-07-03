const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');

module.exports.handler = async (event) => {
  try {
    const token = authMiddleware.validateToken(event.headers.Authorization);
    const tenantId = token.tenantId;
    if (!token || !tenantId) {
      return responseBuilder.unauthorized();
    }
    const { productId } = event.pathParameters;

    await dynamoClient.delete(process.env.DYNAMODB_TABLE_PRODUCTS, { tenantId, productId });
    return responseBuilder.success({ message: 'Product deleted successfully!' });
  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
