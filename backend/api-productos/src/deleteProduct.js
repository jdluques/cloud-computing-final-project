const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');

module.exports.handler = async (event) => {
  try {
    const { productId } = event.pathParameters;

    const decodedToken = authMiddleware.validateToken(event.headers.Authorization);
    const tenant_id = decodedToken.tenantId;
    const userEmail = decodedToken.email;

    const result = await dynamoClient.get(process.env.DYNAMODB_TABLE_PRODUCTS, {
      tenant_id: tenant_id,
      productId: productId
    });

    if (!result.Item) {
      return responseBuilder.error('Product not found', 404);
    }

    if (result.Item.createdBy !== userEmail) {
      return responseBuilder.unauthorized();
    }

    await dynamoClient.delete(process.env.DYNAMODB_TABLE_PRODUCTS, {
      tenant_id: tenant_id,
      productId: productId
    });

    return responseBuilder.success({ message: 'Product deleted successfully!' });

  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
