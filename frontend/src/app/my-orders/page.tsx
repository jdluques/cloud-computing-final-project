import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ORDERS } from "@/mocks/data";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";
import Link from "next/link";

export default function MyOrdersPage() {
  // Using mock data directly (SSR)
  const orders = MOCK_ORDERS;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "PROCESSING":
        return <Package className="h-4 w-4 text-blue-600" />;
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Truck className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendiente";
      case "PROCESSING":
        return "En Proceso";
      case "COMPLETED":
        return "Completado";
      default:
        return "Desconocido";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "hace 1 día";
    if (diffDays < 7) return `hace ${diffDays} días`;
    if (diffDays < 30) return `hace ${Math.ceil(diffDays / 7)} semanas`;
    return date.toLocaleDateString("es-PE");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Mis Órdenes</h1>

      {orders.length === 0 ? (
        <div className="py-12 text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <p className="mb-4 text-lg text-gray-600">No tienes órdenes aún</p>
          <Link
            href="/"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Explorar libros
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    Orden #{order.id}
                  </CardTitle>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Realizada {formatDate(order.createdAt)}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-semibold">Artículos:</h3>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.title} x{item.quantity}
                          </span>
                          <span>S/. {item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>S/. {order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">Dirección de envío:</h3>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.street}
                      <br />
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.zipCode}
                      <br />
                      {order.shippingAddress.country}
                    </p>

                    <h3 className="mt-4 mb-2 font-semibold">Método de pago:</h3>
                    <p className="text-sm text-gray-600">
                      {order.paymentMethod === "CREDIT_CARD" &&
                        "Tarjeta de Crédito"}
                      {order.paymentMethod === "DEBIT_CARD" &&
                        "Tarjeta de Débito"}
                      {order.paymentMethod === "CASH_ON_DELIVERY" &&
                        "Pago Contra Entrega"}
                    </p>

                    {order.status !== "COMPLETED" && (
                      <>
                        <h3 className="mt-4 mb-2 font-semibold">
                          Entrega estimada:
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.estimatedDelivery).toLocaleDateString(
                            "es-PE",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Ver detalles completos →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
