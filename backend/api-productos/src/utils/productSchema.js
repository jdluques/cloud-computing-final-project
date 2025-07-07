const Joi = require('joi');

// Esquema completo para creación de producto
const productCreateSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().allow('').required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  categories: Joi.array().items(Joi.string()).required()
});

// Esquema parcial para actualización de producto
const productUpdateSchema = Joi.object({
  name: Joi.string().min(1),
  description: Joi.string().allow(''),
  price: Joi.number().positive(),
  stock: Joi.number().integer().min(0),
  categories: Joi.array().items(Joi.string())
}).min(1); // Requiere al menos 1 campo

module.exports = {
  productCreateSchema,
  productUpdateSchema
};
