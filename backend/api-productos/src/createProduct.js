const { randomUUID } = require('crypto');
const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');
const { productCreateSchema } = require('./utils/productSchema');

// ------------------------ Manejo de CORS para OPTIONS ------------------------
module.exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    console.log("🟡 Preflight OPTIONS recibido en createProduct");
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
    const user_id = decodedToken.user_id;

    if (!user_id) {
      return responseBuilder.unauthorized();
    }

    const timestamp = new Date().toISOString();
    const productId = randomUUID();
    const globalProductId = `${tenant_id}#${productId}`;

    const newProduct = {
      tenant_id,
      user_id,
      productId,
      globalProductId,
      name,
      description,
      price,
      stock,
      categories,
      createdAt: timestamp,
      updatedAt: timestamp,
      createdBy: user_id
    };

    // Prevenir duplicados con ConditionExpression
    await dynamoClient.put(process.env.DYNAMODB_TABLE_PRODUCTS, newProduct, {
      ConditionExpression: 'attribute_not_exists(globalProductId)'
    });

    return responseBuilder.success({
      message: 'Product created successfully!',
      product: newProduct
    });

  } catch (error) {
    console.error("❌ Error en createProduct:", error);
    return responseBuilder.error(error.message);
  }
};
