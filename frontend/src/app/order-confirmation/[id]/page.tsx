"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/cart/CartSchema";
import { ArrowLeft, CheckCircle, Package } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const orderData = await response.json();
          setOrder(orderData);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOrder();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="mt-4">Cargando información de tu orden...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Orden no encontrada</h1>
          <Button onClick={() => router.push("/")}>Volver al Inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Success Message */}
        <div className="mb-8 text-center">
          <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
          <h1 className="mb-2 text-3xl font-bold">¡Orden Confirmada!</h1>
          <p className="text-gray-600">
            Tu orden ha sido procesada exitosamente. Recibirás un email de
            confirmación pronto.
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Detalles de la Orden</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Número de Orden:</p>
                  <p className="text-gray-600">{order.id}</p>
                </div>
                <div>
                  <p className="font-medium">Fecha:</p>
                  <p className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("es-PE")}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Estado:</p>
                  <span className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                    {order.status === "PENDING" ? "Pendiente" : order.status}
                  </span>
                </div>
                <div>
                  <p className="font-medium">Total:</p>
                  <p className="font-bold">S/. {order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Productos Ordenados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={60}
                    height={80}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.author}</p>
                    <p className="text-sm">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    S/. {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Dirección de Envío</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package size={20} />
              Información de Entrega
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm text-gray-600">
              Fecha estimada de entrega:
            </p>
            <p className="font-medium">
              {new Date(order.estimatedDelivery).toLocaleDateString("es-PE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Recibirás actualizaciones por email sobre el estado de tu envío.
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="flex-1"
          >
            <ArrowLeft className="mr-2" size={16} />
            Continuar Comprando
          </Button>
          <Button onClick={() => router.push("/my-orders")} className="flex-1">
            Ver Mis Órdenes
          </Button>
        </div>
      </div>
    </div>
  );
}
