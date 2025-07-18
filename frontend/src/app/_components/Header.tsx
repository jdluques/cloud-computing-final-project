"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Book, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navigationSections } from "../_data/navigationSections";
import CartButton from "./CartButton";
import RegisterButton from "./RegisterButton";

interface BookCategory {
  slug: string;
  title: string;
  subcategories: Array<{
    title: string;
    items: Array<{
      title: string;
      slug: string;
    }>;
  }>;
}

export default function Header() {
  const { user } = useAuth();
  const [bookCategories, setBookCategories] = useState<BookCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/contents/book-categories");
        if (response.ok) {
          const categories = await response.json();
          setBookCategories(categories);
        }
      } catch (error) {
        console.error("Failed to fetch book categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="bg-accent flex w-full flex-col">
      <header className="flex flex-row items-center justify-between px-3 py-3">
        <Link href={"/"}>
          <Image
            src={"/next.svg"}
            alt={"Ibero Librerías Logo"}
            width={100}
            height={100}
          />
        </Link>

        <section className="w-2xl">
          <Input placeholder="Buscar por título, auto o ISBN" />
        </section>

        <section className="flex flex-row justify-end gap-2">
          {navigationSections.map((section, index) => (
            <Button key={index} asChild>
              <Link href={section.href}>
                <section.Icon />
                {section.title}
              </Link>
            </Button>
          ))}

          {/* Admin Panel Link */}
          {user?.role === "ADMIN" && (
            <Button asChild variant="secondary">
              <Link href="/admin">
                <Settings size={16} />
                Admin
              </Link>
            </Button>
          )}

          {/* My Orders Link for logged in users */}
          {user && user.role === "CLIENT" && (
            <Button asChild variant="outline">
              <Link href="/my-orders">Mis Órdenes</Link>
            </Button>
          )}

          <RegisterButton />
          <CartButton />
        </section>
      </header>

      <footer className="bg-primary flex w-full flex-row items-center justify-center gap-2">
        {bookCategories.map((category, index) => (
          <HoverCard key={index}>
            <HoverCardTrigger asChild>
              <Button asChild>
                <Link href={`/category/${category.slug}`}>
                  {category.title.toUpperCase()}
                </Link>
              </Button>
            </HoverCardTrigger>

            <HoverCardContent className="flex w-full flex-col gap-10 p-10">
              <section className="flex flex-row items-center gap-2">
                <Book />
                <p className="text-xl font-bold underline">{category.title}</p>
                <ArrowRight />
              </section>

              <section className="flex flex-row gap-10 text-sm">
                {category.subcategories.map((subcategory, subIndex) => (
                  <div key={subIndex} className="flex flex-col gap-2">
                    <p className="font-bold underline">
                      {subcategory.title.toUpperCase()}
                    </p>

                    {subcategory.items.map((item, itemIndex) => (
                      <Link key={itemIndex} href={item.slug}>
                        <p>{item.title}</p>
                      </Link>
                    ))}
                  </div>
                ))}
              </section>
            </HoverCardContent>
          </HoverCard>
        ))}
      </footer>
    </nav>
  );
}
