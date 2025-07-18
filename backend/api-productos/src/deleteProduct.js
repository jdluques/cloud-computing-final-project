const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');

// ------------------------ Manejo de CORS para OPTIONS ------------------------
module.exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    console.log("🟡 Preflight OPTIONS recibido en deleteProduct");
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: "CORS preflight OK" })
    };
  }

  try {
    const { productId } = event.pathParameters;

    // Validar token y extraer datos
    const decodedToken = authMiddleware.validateToken(event.headers.Authorization);
    const tenant_id = decodedToken.tenantId;
    const userId = decodedToken.user_id || decodedToken.userId;

    // Obtener el producto desde DynamoDB
    const result = await dynamoClient.get(process.env.DYNAMODB_TABLE_PRODUCTS, {
      tenant_id: tenant_id,
      productId: productId
    });

    if (!result.Item) {
      return responseBuilder.error('Product not found', 404);
    }

    // Verificar si el usuario autenticado es el creador
    if (result.Item.createdBy !== userId) {
      return responseBuilder.unauthorized();
    }

    // Eliminar el producto
    await dynamoClient.delete(process.env.DYNAMODB_TABLE_PRODUCTS, {
      tenant_id: tenant_id,
      productId: productId
    });

    return responseBuilder.success({ message: 'Product deleted successfully!' });

  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
