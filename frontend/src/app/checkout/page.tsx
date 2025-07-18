"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { CheckoutSchema } from "@/types/cart/CartSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CreditCard, Package } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof CheckoutSchema>>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      shippingAddress: {
        street: "",
        city: "",
        zipCode: "",
        country: "Perú",
      },
      paymentMethod: "CREDIT_CARD",
      cardDetails: {
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
      },
    },
  });

  const selectedPaymentMethod = form.watch("paymentMethod");

  if (!user) {
    router.push("/");
    return null;
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Package size={64} className="mx-auto mb-4 opacity-50" />
          <h1 className="mb-2 text-2xl font-bold">Tu carrito está vacío</h1>
          <p className="mb-4 text-gray-600">
            Agrega algunos libros a tu carrito para continuar
          </p>
          <Button onClick={() => router.push("/")}>Continuar Comprando</Button>
        </div>
      </div>
    );
  }

  async function onSubmit(values: z.infer<typeof CheckoutSchema>) {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          items: cart.items,
          total: cart.total,
          shippingAddress: values.shippingAddress,
          paymentMethod: values.paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al procesar la orden");
      }

      const order = await response.json();
      clearCart();
      router.push(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error al procesar tu orden. Por favor intenta de nuevo.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2" size={16} />
        Volver
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen de tu Orden</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={60}
                      height={80}
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.author}</p>
                      <p className="text-sm">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-medium">
                      S/. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>S/. {cart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkout Form */}
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Dirección de Envío</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="shippingAddress.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                          <Input placeholder="Av. Principal 123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shippingAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder="Lima" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shippingAddress.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código Postal</FormLabel>
                        <FormControl>
                          <Input placeholder="15001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shippingAddress.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>País</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Método de Pago</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seleccionar método</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CREDIT_CARD">
                              Tarjeta de Crédito
                            </SelectItem>
                            <SelectItem value="DEBIT_CARD">
                              Tarjeta de Débito
                            </SelectItem>
                            <SelectItem value="PAYPAL">PayPal</SelectItem>
                            <SelectItem value="CASH">
                              Pago Contraentrega
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(selectedPaymentMethod === "CREDIT_CARD" ||
                    selectedPaymentMethod === "DEBIT_CARD") && (
                    <>
                      <FormField
                        control={form.control}
                        name="cardDetails.cardholderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del Titular</FormLabel>
                            <FormControl>
                              <Input placeholder="Juan Pérez" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cardDetails.cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número de Tarjeta</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="1234 5678 9012 3456"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="cardDetails.expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha de Vencimiento</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/AA" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cardDetails.cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" disabled={isProcessing}>
                <CreditCard className="mr-2" size={16} />
                {isProcessing
                  ? "Procesando..."
                  : `Pagar S/. ${cart.total.toFixed(2)}`}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
