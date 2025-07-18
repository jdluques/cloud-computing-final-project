import BookCard from "@/app/_components/BookCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookCardSchema } from "@/types/books/BookCardSchema";
import Link from "next/link";
import z from "zod";

interface BookCollectionSectionProps {
  title: string;
  items: z.infer<typeof BookCardSchema>[];
  collectionSlug: string;
}

export default async function BookCollectionSection(
  props: BookCollectionSectionProps,
) {
  return (
    <main className="flex w-full flex-col gap-5">
      <section className="flex items-center justify-between px-15">
        <h1 className="text-xl font-bold">{props.title}</h1>

        <Button asChild>
          <Link href={`/collection/${props.collectionSlug}`}>Ver Todos</Link>
        </Button>
      </section>

      <Carousel className="flex w-full flex-row px-14">
        <CarouselContent>
          {props.items.map((item, index) => (
            <CarouselItem key={index} className="basis-1/6">
              <BookCard
                id={item.id}
                title={item.title}
                author={item.author}
                imageUrl={item.imageUrl}
                price={item.price}
                href={`/book/${item.id}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4" />

        <CarouselNext className="right-4" />
      </Carousel>
    </main>
  );
}
