const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');

module.exports.handler = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const updates = JSON.parse(event.body);

    // Validar token y extraer tenant_id + email del usuario logueado
    const decodedToken = authMiddleware.validateToken(event.headers.Authorization);
    const tenant_id = decodedToken.tenantId;
    const userEmail = decodedToken.email;

    // Buscar el producto asegurando que pertenece al tenant
    const result = await dynamoClient.get(process.env.DYNAMODB_TABLE_PRODUCTS, {
      tenant_id: tenant_id,
      productId: productId
    });

    if (!result.Item) {
      return responseBuilder.error('Product not found', 404);
    }

    // Verificar que el producto fue creado por este usuario
    if (result.Item.createdBy !== userEmail) {
      return responseBuilder.unauthorized();
    }

    // Merge con los nuevos datos y actualizar timestamp
    const timestamp = new Date().toISOString();
    const updatedProduct = {
      ...result.Item,
      ...updates,
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
