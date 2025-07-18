import { Book, LucideIcon, Pin } from "lucide-react";
import { Route } from "next";

export const navigationSections: {
  title: string;
  href: Route;
  Icon: LucideIcon;
}[] = [
  { title: "Blog", href: "/blog", Icon: Book },
  { title: "Tiendas", href: "/shops", Icon: Pin },
];
