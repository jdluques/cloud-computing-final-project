import { GetBooksQuerySchema } from "@/types/books/GetBooksQuerySchema";
import { z } from "zod";
import { client } from "../client";

export async function getBooks(query: z.infer<typeof GetBooksQuerySchema>) {
  const response = await client.books.getBooks({ query });

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to fetch books: ${response.status}`);
}
