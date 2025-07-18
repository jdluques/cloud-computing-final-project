const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');
const { productCreateSchema } = require('./utils/productSchema'); // 👈 usar schema completo

// ------------------------ Manejo de CORS para OPTIONS ------------------------
module.exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    console.log("🟡 Preflight OPTIONS recibido en updateProduct");
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
    const payload = JSON.parse(event.body);

    // Validar que se envíen todos los campos requeridos
    const { error, value } = productCreateSchema.validate(payload);
    if (error) {
      return responseBuilder.error(`Validation error: ${error.message}`, 400);
    }

    // Validar token y extraer datos del usuario autenticado
    const decodedToken = authMiddleware.validateToken(event.headers.Authorization);
    const tenant_id = decodedToken.tenantId;
    const userId = decodedToken.user_id || decodedToken.userId;

    // Obtener producto actual
    const result = await dynamoClient.get(process.env.DYNAMODB_TABLE_PRODUCTS, {
      tenant_id: tenant_id,
      productId: productId
    });

    if (!result.Item) {
      return responseBuilder.error('Product not found', 404);
    }

    // Verificar que el usuario autenticado sea el creador del producto
    if (result.Item.createdBy !== userId) {
      return responseBuilder.unauthorized();
    }

    // Actualizar el producto
    const timestamp = new Date().toISOString();
    const updatedProduct = {
      ...result.Item,
      ...value,
      updatedAt: timestamp
    };

    await dynamoClient.put(process.env.DYNAMODB_TABLE_PRODUCTS, updatedProduct);

    return responseBuilder.success({
      message: 'Product updated successfully!',
      product: updatedProduct
    });

  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
