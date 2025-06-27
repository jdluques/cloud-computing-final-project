const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');

module.exports.handler = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const updates = JSON.parse(event.body);

    const result = await dynamoClient.get(process.env.DYNAMODB_TABLE_PRODUCTS, { productId: productId });
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
