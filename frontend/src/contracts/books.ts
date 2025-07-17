import { BookSchema } from "@/types/books/BookSchema";
import { BooksGridSchema } from "@/types/books/BooksGridSchema";
import { GetBooksQuerySchema } from "@/types/books/GetBooksQuerySchema";
import z from "zod";
import { c } from "./contract";

export const booksContract = c.router({
  getBooks: {
    method: "GET",
    path: "/books",
    query: GetBooksQuerySchema,
    responses: {
      200: BooksGridSchema,
    },
  },
  getBook: {
    method: "GET",
    path: "/books/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: BookSchema,
    },
  },
});
