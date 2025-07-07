import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ArrowRight, Book } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { bookCategories } from "../_content/bookCategories";
import { navigationSections } from "../_content/navigationSections";

export default function Header() {
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

      <footer className="bg-primary flex w-full flex-row items-center justify-center gap-2">
        {bookCategories.map((category, index) => (
          <HoverCard key={index}>
            <HoverCardTrigger>
              <Button asChild>
                <Link href={""}>{category.title.toUpperCase()}</Link>
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
                      <Link key={itemIndex} href={""}>
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
