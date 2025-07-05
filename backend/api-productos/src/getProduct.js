const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');

module.exports.handler = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const isGlobal = event.queryStringParameters?.global === 'true';

    // Validar token
    const decodedToken = authMiddleware.validateToken(event.headers.Authorization);
    const tenant_id = decodedToken.tenantId;

    let result;

    if (isGlobal) {
      // Búsqueda global: usar scan para encontrar el productId sin importar el tenant
      const params = {
        TableName: process.env.DYNAMODB_TABLE_PRODUCTS,
        FilterExpression: "productId = :productId",
        ExpressionAttributeValues: {
          ":productId": productId
        }
      };
      result = await dynamoClient.scan(params);

      if (!result.Items || result.Items.length === 0) {
        return responseBuilder.error('Product not found', 404);
      }

      return responseBuilder.success(result.Items[0]);

    } else {
      // Buscar solo dentro del tenant del usuario
      result = await dynamoClient.get(process.env.DYNAMODB_TABLE_PRODUCTS, {
        tenant_id: tenant_id,
        productId: productId
      });

      if (!result.Item) {
        return responseBuilder.error('Product not found', 404);
      }

      return responseBuilder.success(result.Item);
    }

  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
