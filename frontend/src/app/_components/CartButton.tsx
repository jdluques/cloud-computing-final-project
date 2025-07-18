"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartButton() {
  const { cart, removeFromCart, updateQuantity, getTotalItems } = useCart();
  const { user } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative">
          <ShoppingCart />
          Carrito
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>CARRITO DE COMPRAS</SheetTitle>
          <SheetDescription>
            {cart.items.length === 0
              ? "Tu carrito está vacío"
              : `${getTotalItems()} productos en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cart.items.length === 0 ? (
            <div className="py-8 text-center">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p>No tienes productos en tu carrito</p>
            </div>
          ) : (
            <>
              <div className="max-h-96 space-y-4 overflow-y-auto">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
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
                      <p className="font-bold">S/. {item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus size={12} />
                      </Button>

                      <span className="w-8 text-center">{item.quantity}</span>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.maxQuantity}
                      >
                        <Plus size={12} />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-lg font-bold">
                    S/. {cart.total.toFixed(2)}
                  </span>
                </div>

                {user ? (
                  <Button asChild className="w-full">
                    <Link href="/checkout">Proceder al Pago</Link>
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="mb-2 text-sm text-gray-600">
                      Debes iniciar sesión para continuar
                    </p>
                    <Button disabled className="w-full">
                      Iniciar Sesión para Comprar
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
