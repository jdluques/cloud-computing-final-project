const { randomUUID } = require('crypto');
const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');
const { productCreateSchema } = require('./utils/productSchema');

module.exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);

    // Validar entrada con Joi
    const { error, value } = productCreateSchema.validate(payload);
    if (error) {
      return responseBuilder.error(`Validation error: ${error.message}`, 400);
    }

    const { name, description, price, stock, categories } = value;

    // Validar token y extraer tenant_id + user_id
    const decodedToken = authMiddleware.validateToken(event.headers.Authorization);
    const tenant_id = decodedToken.tenantId;
    const user_id = decodedToken.user_id; // ✅ esto es clave

    const timestamp = new Date().toISOString();
    const productId = randomUUID();

    const newProduct = {
      tenant_id,
      user_id, // ✅ Guardamos user_id del creador
      productId,
      globalProductId: `${tenant_id}#${productId}`,
      name,
      description,
      price,
      stock,
      categories,
      createdAt: timestamp,
      updatedAt: timestamp,
      createdBy: user_id // ✅ redundante pero útil si quieres mantener trazabilidad
    };

    await dynamoClient.put(process.env.DYNAMODB_TABLE_PRODUCTS, newProduct);

    return responseBuilder.success({
      message: 'Product created successfully!',
      product: newProduct
    });

  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
