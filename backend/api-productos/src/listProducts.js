const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const paginationHelper = require('./utils/paginationHelper');
const authMiddleware = require('./utils/authMiddleware');

module.exports.handler = async (event) => {
  try {
    // Extraer paginación
    const { limit, lastKey } = paginationHelper.getPaginationParams(event);
    const queryParams = event.queryStringParameters || {};

    // Validar token y extraer tenant_id
    const decodedToken = authMiddleware.validateToken(event.headers.Authorization);
    const tenant_id = decodedToken.tenantId;

    let result;

    if (queryParams.global === 'true') {
      // Si global, hacer un scan que muestra todos los productos sin importar el tenant
      const params = {
        TableName: process.env.DYNAMODB_TABLE_PRODUCTS,
        Limit: limit,
        ExclusiveStartKey: lastKey
      };
      result = await dynamoClient.scan(params);
    } else {
      // Si no, hacer un query filtrando por tenant_id
      const params = {
        TableName: process.env.DYNAMODB_TABLE_PRODUCTS,
        KeyConditionExpression: "tenant_id = :tenantId",
        ExpressionAttributeValues: {
          ":tenantId": tenant_id
        },
        Limit: limit,
        ExclusiveStartKey: lastKey
      };
      result = await dynamoClient.query(params);
    }

    return responseBuilder.success({
      items: result.Items,
      lastKey: result.LastEvaluatedKey ? JSON.stringify(result.LastEvaluatedKey) : null,
    });

  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
