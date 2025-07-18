export const MOCK_ADMIN_STATS = {
  totalBooks: 1234,
  todayOrders: 45,
  lowStock: 12,
  monthSales: 12450,
  recentOrders: [
    {
      id: "ORD-001",
      customer: "María García",
      total: 89.9,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    },
    {
      id: "ORD-002",
      customer: "Carlos López",
      total: 156.5,
      status: "PROCESSING",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    },
    {
      id: "ORD-003",
      customer: "Ana Rodríguez",
      total: 67.25,
      status: "COMPLETED",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
  ],
  lowStockBooks: [
    {
      id: "1",
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      stock: 2,
      price: 45.9,
    },
    {
      id: "2",
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      stock: 1,
      price: 25.9,
    },
    {
      id: "3",
      title: "1984",
      author: "George Orwell",
      stock: 3,
      price: 38.5,
    },
  ],
};
