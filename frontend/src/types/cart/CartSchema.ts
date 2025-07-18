import { z } from "zod";

export const CartItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  price: z.number(),
  image: z.string(),
  quantity: z.number(),
  maxQuantity: z.number(),
});

export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  total: z.number(),
});

export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(CartItemSchema),
  total: z.number(),
  status: z.enum([
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
  createdAt: z.string(),
  updatedAt: z.string(),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  paymentMethod: z.enum(["CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "CASH"]),
  estimatedDelivery: z.string(),
});

export const CheckoutSchema = z.object({
  shippingAddress: z.object({
    street: z.string().min(1, "La dirección es requerida"),
    city: z.string().min(1, "La ciudad es requerida"),
    zipCode: z.string().min(1, "El código postal es requerido"),
    country: z.string().min(1, "El país es requerido"),
  }),
  paymentMethod: z.enum(["CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "CASH"]),
  cardDetails: z
    .object({
      cardNumber: z.string().optional(),
      expiryDate: z.string().optional(),
      cvv: z.string().optional(),
      cardholderName: z.string().optional(),
    })
    .optional(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type CheckoutData = z.infer<typeof CheckoutSchema>;
