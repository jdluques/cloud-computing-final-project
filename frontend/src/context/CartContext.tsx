"use client";

import { Cart, CartItem } from "@/types/cart/CartSchema";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        // If item already exists, increase quantity
        const newQuantity = Math.min(
          existingItem.quantity + 1,
          item.maxQuantity,
        );
        const updatedItems = prevCart.items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem,
        );

        const newTotal = updatedItems.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0,
        );

        return { items: updatedItems, total: newTotal };
      } else {
        // Add new item
        const newItem = { ...item, quantity: 1 };
        const updatedItems = [...prevCart.items, newItem];
        const newTotal = updatedItems.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0,
        );

        return { items: updatedItems, total: newTotal };
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== id);
      const newTotal = updatedItems.reduce(
        (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
        0,
      );

      return { items: updatedItems, total: newTotal };
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(0, Math.min(quantity, item.maxQuantity)),
              }
            : item,
        )
        .filter((item) => item.quantity > 0);

      const newTotal = updatedItems.reduce(
        (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
        0,
      );

      return { items: updatedItems, total: newTotal };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  const getTotalItems = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
