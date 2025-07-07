const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');
const { productCreateSchema } = require('./utils/productSchema'); // 👈 usar schema completo

module.exports.handler = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const payload = JSON.parse(event.body);

    // Validar que se envíen todos los campos requeridos
    const { error, value } = productCreateSchema.validate(payload);
    if (error) {
      return responseBuilder.error(`Validation error: ${error.message}`, 400);
    }

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
