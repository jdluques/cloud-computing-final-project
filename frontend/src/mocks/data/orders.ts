import { faker } from "@faker-js/faker";

export interface OrderItem {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: "CREDIT_CARD" | "DEBIT_CARD" | "CASH_ON_DELIVERY";
  estimatedDelivery: string;
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    userId: "1",
    items: [
      {
        id: "1",
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        price: 45.9,
        quantity: 1,
        image: "/next.svg",
      },
    ],
    total: 45.9,
    status: "PENDING",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    shippingAddress: {
      street: "Av. Principal 123",
      city: "Lima",
      zipCode: "15001",
      country: "Perú",
    },
    paymentMethod: "CREDIT_CARD",
    estimatedDelivery: faker.date.future().toISOString(),
  },
  {
    id: "ORD-002",
    userId: "1",
    items: [
      {
        id: "2",
        title: "El Principito",
        author: "Antoine de Saint-Exupéry",
        price: 25.9,
        quantity: 2,
        image: "/next.svg",
      },
      {
        id: "3",
        title: "1984",
        author: "George Orwell",
        price: 38.5,
        quantity: 1,
        image: "/next.svg",
      },
    ],
    total: 90.3,
    status: "PROCESSING",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    shippingAddress: {
      street: "Jr. Libertad 456",
      city: "Lima",
      zipCode: "15002",
      country: "Perú",
    },
    paymentMethod: "DEBIT_CARD",
    estimatedDelivery: faker.date.future().toISOString(),
  },
  {
    id: "ORD-003",
    userId: "1",
    items: [
      {
        id: "4",
        title: "Don Quijote de la Mancha",
        author: "Miguel de Cervantes",
        price: 52.0,
        quantity: 1,
        image: "/next.svg",
      },
    ],
    total: 52.0,
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    shippingAddress: {
      street: "Av. Arequipa 789",
      city: "Lima",
      zipCode: "15003",
      country: "Perú",
    },
    paymentMethod: "CASH_ON_DELIVERY",
    estimatedDelivery: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago (delivered)
  },
];

// Function to generate a single order
export function generateMockOrder(overrides: Partial<Order> = {}): Order {
  return {
    id: faker.string.uuid(),
    userId: overrides.userId || "1",
    items: overrides.items || [
      {
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        author: faker.person.fullName(),
        price: parseFloat(faker.commerce.price({ min: 20, max: 100 })),
        quantity: faker.number.int({ min: 1, max: 3 }),
        image: "/next.svg",
      },
    ],
    total:
      overrides.total ||
      parseFloat(faker.commerce.price({ min: 50, max: 300 })),
    status:
      overrides.status ||
      faker.helpers.arrayElement(["PENDING", "PROCESSING", "COMPLETED"]),
    createdAt:
      overrides.createdAt || faker.date.recent({ days: 30 }).toISOString(),
    updatedAt:
      overrides.updatedAt || faker.date.recent({ days: 15 }).toISOString(),
    shippingAddress: overrides.shippingAddress || {
      street: faker.location.streetAddress(),
      city: "Lima",
      zipCode: faker.location.zipCode(),
      country: "Perú",
    },
    paymentMethod:
      overrides.paymentMethod ||
      faker.helpers.arrayElement([
        "CREDIT_CARD",
        "DEBIT_CARD",
        "CASH_ON_DELIVERY",
      ]),
    estimatedDelivery:
      overrides.estimatedDelivery || faker.date.future().toISOString(),
    ...overrides,
  };
}
