import { BookCardSchema } from "@/types/books/BookCardSchema";
import { z } from "zod";

interface BooksGridProps {
  title: string;
  books: z.infer<typeof BookCardSchema>[];
  totalCount: number;
}

export default function BooksGrid(props: BooksGridProps) {
  return (
    <main>
      <p>{props.title}</p>

      <section>
        <p>Estás viendo: {props.totalCount} libros</p>
      </section>

      <section></section>
    </main>
  );
}
