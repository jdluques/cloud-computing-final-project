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
    const updates = JSON.parse(event.body);

    const result = await dynamoClient.get(process.env.DYNAMODB_TABLE_PRODUCTS, { tenantId, productId });
    if (!result.Item) {
      return responseBuilder.error('Product not found', 404);
    }

    const updatedProduct = { ...result.Item, ...updates };
    await dynamoClient.put(process.env.DYNAMODB_TABLE_PRODUCTS, updatedProduct);
    return responseBuilder.success({ message: 'Product updated successfully!', product: updatedProduct });
  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
