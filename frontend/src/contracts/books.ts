import { BookCardSchema } from "@/types/books/BookCardSchema";
import { GetBooksCollectionSchema } from "@/types/books/GetBooksCollectionSchema";
import { GetBooksQuerySchema } from "@/types/books/GetBooksQuerySchema";
import { z } from "zod";
import { c } from "./contract";

export const booksContract = c.router({
  getBooks: {
    method: "GET",
    path: "/books",
    query: GetBooksQuerySchema,
    responses: {
      200: z.object({
        books: z.array(BookCardSchema),
        totalCount: z.number(),
        genreName: z.string(),
      }),
    },
  },
  getBookCollections: {
    method: "GET",
    path: "/books/collections",
    query: GetBooksCollectionSchema,
    responses: {
      200: z
        .object({
          books: z.array(BookCardSchema),
          collectionName: z.string(),
        })
        .array(),
    },
  },
});
