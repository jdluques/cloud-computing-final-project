import { Button } from "@/components/ui/button";
import { MOCK_BOOKS } from "@/mocks/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ComponentProps } from "react";
import InformationItem from "../_components/InformationItem";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Find book by ID in mock data (treating slug as ID for now)
  const book = MOCK_BOOKS.find((book) => book.id === slug);

  if (!book) {
    notFound();
  }

  const informationItems: ComponentProps<typeof InformationItem>[] = [
    { title: "SKU", value: book.sku },
    { title: "ISBN", value: book.isbn },
    { title: "Autor", value: book.author },
    { title: "Editorial", value: book.publisher },
    { title: "Año de publicación", value: book.publicationYear },
    { title: "Páginas", value: book.pages },
    { title: "Peso", value: book.weight },
    { title: "Ancho", value: book.width },
    { title: "Alto", value: book.height },
    { title: "Edad recomendada", value: book.targetAge },
  ];

  return (
    <main className="flex size-full bg-neutral-300 p-10">
      <div className="flex size-full flex-row justify-between gap-10 rounded-3xl bg-neutral-50 p-14">
        <section className="flex flex-col items-center justify-center gap-5">
          <Image
            src={book.imageUrl}
            alt={`Imagen de ${book.title}`}
            width={250}
            height={350}
          />

          <div className="flex size-full flex-col">
            {informationItems.map((item, index) => (
              <InformationItem
                title={item.title}
                value={item.value}
                key={index}
              />
            ))}
          </div>
        </section>

        <section className="flex size-full flex-col gap-6">
          <div>
            <p className="text-3xl font-bold">{book.title}</p>
            <p>{`POR: ${book.author}`}</p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <p className="text-2xl font-black">{`S/. ${book.price}`}</p>

            <Button className="h-14 w-sm text-xl font-bold">COMPRAR</Button>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">Reseña</p>

            <p>{book.synopsis}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
