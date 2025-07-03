import { randomUUID } from 'crypto';

const dynamoClient = require('./db/dynamoClient');
const responseBuilder = require('./utils/responseBuilder');
const authMiddleware = require('./utils/authMiddleware');


module.exports.handler = async (event) => {
  try {
    const { name, description, price, stock, categories } = JSON.parse(event.body);

    const token = authMiddleware.validateToken(event.headers.Authorization);
    const tenantId = token.tenantId;
    if (!token || !tenantId) {
      return responseBuilder.unauthorized();
    }

    const newProduct = {
      tenantId,
      productId: randomUUID(),
      name,
      description,
      price,
      stock,
      categories,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await dynamoClient.put(process.env.DYNAMODB_TABLE_PRODUCTS, newProduct);
    return responseBuilder.success({ message: 'Product created successfully!', product: newProduct });
  } catch (error) {
    return responseBuilder.error(error.message);
  }
};
