const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');

module.exports.handler = async (event) => {
  try {
    const { productId } = event.pathParameters;

    await dynamoClient.delete(process.env.DYNAMODB_TABLE_PRODUCTS, { productId: productId });
    return responseBuilder.success({ message: 'Product deleted successfully!' });
  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
