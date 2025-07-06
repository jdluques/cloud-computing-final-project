const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');

module.exports.handler = async (event) => {
  try {
    // Obtener el productId desde la URL
    const { productId } = event.pathParameters;

    // Validar el token y extraer tenant_id
    const decodedToken = authMiddleware.validateToken(event.headers.Authorization);
    const tenant_id = decodedToken.tenantId;

    // Borrar el producto asegurando que pertenece a ese tenant
    await dynamoClient.delete(process.env.DYNAMODB_TABLE_PRODUCTS, {
      tenant_id: tenant_id,  // Partition Key
      productId: productId   // Sort Key
    });

    return responseBuilder.success({ message: 'Product deleted successfully!' });

  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
