import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookCardSchema } from "@/types/books/BookCardSchema";
import Image from "next/image";
import z from "zod";

interface BookCategorySectionProps {
  category: string;
  items: z.infer<typeof BookCardSchema>[];
}

export default async function BookCategorySection(
  props: BookCategorySectionProps,
) {
  return (
    <main className="flex w-full flex-col gap-5">
      <section className="flex items-center justify-between px-15">
        <h1 className="text-xl font-bold">{props.category}</h1>

        <Button>Ver todos</Button>
      </section>

      <Carousel className="flex w-full flex-row px-14">
        <CarouselContent>
          {props.items.map((items, index) => (
            <CarouselItem key={index} className="basis-1/6">
              <Card>
                <CardHeader>
                  <Image
                    src={items.imageUrl}
                    alt={items.title}
                    width={178}
                    height={255}
                  />
                </CardHeader>

                <CardContent>
                  <h3>{items.title}</h3>
                  <p>{items.author}</p>
                </CardContent>

                <CardFooter>
                  <p>S/. {items.price}</p>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4" />

        <CarouselNext className="right-4" />
      </Carousel>
    </main>
  );
}
