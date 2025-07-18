import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ADMIN_STATS } from "@/mocks/data";
import { Book, Package, ShoppingCart, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  // Using mock data directly (SSR)
  const stats = [
    {
      title: "Total Libros",
      value: MOCK_ADMIN_STATS.totalBooks.toLocaleString(),
      icon: Book,
      color: "text-blue-600",
    },
    {
      title: "Órdenes Hoy",
      value: MOCK_ADMIN_STATS.todayOrders.toString(),
      icon: ShoppingCart,
      color: "text-green-600",
    },
    {
      title: "Stock Bajo",
      value: MOCK_ADMIN_STATS.lowStock.toString(),
      icon: Package,
      color: "text-red-600",
    },
    {
      title: "Ventas Mes",
      value: `S/. ${MOCK_ADMIN_STATS.monthSales.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const recentOrders = MOCK_ADMIN_STATS.recentOrders;
  const lowStockBooks = MOCK_ADMIN_STATS.lowStockBooks;

  return (
    <div>
      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Órdenes Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-gray-600">Orden #{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">S/. {order.total}</p>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs ${
                        order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "PROCESSING"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status === "PENDING"
                        ? "Pendiente"
                        : order.status === "PROCESSING"
                          ? "Procesando"
                          : "Completado"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-red-600" />
              Stock Bajo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockBooks.map((book, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-gray-600">{book.author}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">S/. {book.price}</p>
                    <span className="rounded-full bg-red-100 px-2 py-1 text-sm text-red-800">
                      {book.stock} restantes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
