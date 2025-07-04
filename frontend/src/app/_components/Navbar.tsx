import { Book, LucideIcon, Pin, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const navigationSections: { title: string; href?: string; Icon: LucideIcon }[] =
  [
    { title: "Blog", href: "/blog", Icon: Book },
    { title: "Tiendas", href: "/shops", Icon: Pin },
    { title: "Regístrate", Icon: User },
    { title: "Carrito", href: "/cart", Icon: ShoppingCart },
  ];

const bookCategories: { title: string }[] = [
  { title: "MANGA Y COMICS" },
  { title: "NO FICCIÓN" },
  { title: "LIBROS INFANTILES" },
  { title: "LIBROS JUVENIALES" },
  { title: "FICCIÓN" },
  { title: "BIENESTAR Y SALUD" },
  { title: "ACTUALIDAD Y EMPRESA" },
];

export default function Navbar() {
  return (
    <nav className="bg-accent flex w-full flex-col">
      <header className="flex flex-row items-center justify-between px-3 py-3">
        <section className="">
          <Image
            src={"/next.svg"}
            alt={"Ibero Librerías Logo"}
            width={100}
            height={100}
          />
        </section>

        <section className="w-2xl">
          <Input placeholder="Buscar por título, auto o ISBN" />
        </section>

        <section className="flex flex-row justify-end gap-2">
          {navigationSections.map((section, index) =>
            section.href ? (
              <Button key={index} asChild>
                <Link href={section.href}>
                  <section.Icon />
                  {section.title}
                </Link>
              </Button>
            ) : (
              <Button key={index}>
                <section.Icon />
                {section.title}
              </Button>
            ),
          )}
        </section>
      </header>

      <footer className="bg-primary">
        <section className="flex flex-row items-center justify-center gap-2">
          {bookCategories.map((category, index) => (
            <Button key={index}>{category.title}</Button>
          ))}
        </section>
      </footer>
    </nav>
  );
}
