import { getBook } from "@/client/books/getBook";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ComponentProps } from "react";
import InformationItem from "../_components/InformationItem";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await getBook(slug);
  const informationItems: ComponentProps<typeof InformationItem>[] = [
    { title: "SKU", value: response.sku },
    { title: "ISBN", value: response.isbn },
    { title: "Autor", value: response.author },
    { title: "Editorial", value: response.publisher },
    { title: "Año de publicación", value: response.publicationYear },
    { title: "Páginas", value: response.pages },
    { title: "Peso", value: response.weight },
    { title: "Ancho", value: response.width },
    { title: "Alto", value: response.height },
    { title: "Edad recomendada", value: response.targetAge },
  ];

  return (
    <main className="flex size-full bg-neutral-300 p-10">
      <div className="flex size-full flex-row justify-between gap-10 rounded-3xl bg-neutral-50 p-14">
        <section className="flex flex-col items-center justify-center gap-5">
          <Image
            src={response.imageUrl}
            alt={`Imagen de ${response.title}`}
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
            <p className="text-3xl font-bold">{response.title}</p>
            <p>{`POR: ${response.author}`}</p>
          </div>

          <div className="flex flex-row items-center justify-between">
            <p className="text-2xl font-black">{`S/. ${response.price}`}</p>

            <Button className="h-14 w-sm text-xl font-bold">COMPRAR</Button>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">Reseña</p>

            <p>{response.synopsis}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
