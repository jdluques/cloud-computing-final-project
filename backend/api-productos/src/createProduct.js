const { randomUUID } = require('crypto');
const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');

module.exports.handler = async (event) => {
  try {
    const { name, description, price, stock, categories } = JSON.parse(event.body);

    // Validar token y extraer tenant_id + email del usuario
    const decodedToken = authMiddleware.validateToken(event.headers.Authorization);
    const tenant_id = decodedToken.tenantId;
    const createdBy = decodedToken.email;

    // Timestamp consistente
    const timestamp = new Date().toISOString();

    const newProduct = {
      tenant_id,               // Partition Key
      productId: randomUUID(), // Sort Key
      name,
      description,
      price,
      stock,
      categories,
      createdAt: timestamp,
      updatedAt: timestamp,
      createdBy               // Email del creador, para control de permisos
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
