import { Book, LucideIcon, Pin, ShoppingCart, User } from "lucide-react";

export const navigationSections: {
  title: string;
  href?: string;
  Icon: LucideIcon;
}[] = [
  { title: "Blog", href: "/blog", Icon: Book },
  { title: "Tiendas", href: "/shops", Icon: Pin },
  { title: "Regístrate", Icon: User },
  { title: "Carrito", href: "/cart", Icon: ShoppingCart },
];
