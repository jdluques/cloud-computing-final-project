import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BookCardSchema } from "@/types/books/BookCardSchema";
import { z } from "zod";
import BookCard from "./BookCard";

interface BooksGridProps {
  title: string;
  books: z.infer<typeof BookCardSchema>[];
  totalCount: number;
}

export default function BooksGrid(props: BooksGridProps) {
  return (
    <main className="flex size-full flex-col items-center gap-5 bg-neutral-100 px-10 py-6">
      <p className="text-3xl font-bold">{props.title}</p>

      <section className="flex w-full flex-row justify-between rounded-4xl bg-white p-4">
        <p>Estás viendo: {props.totalCount} libros</p>

        <DropdownMenu>
          <DropdownMenuTrigger>ORDENAR POR</DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>A</DropdownMenuItem>
            <DropdownMenuItem>B</DropdownMenuItem>
            <DropdownMenuItem>C</DropdownMenuItem>
            <DropdownMenuItem>D</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <section className="grid w-full justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {props.books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            imageUrl={book.imageUrl}
            price={book.price}
            href={`/book/${book.id}`}
          />
        ))}
      </section>

      <section className="py-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  );
}
