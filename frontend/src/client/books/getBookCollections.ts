import { GetBooksCollectionSchema } from "@/types/books/GetBooksCollectionSchema";
import { z } from "zod";
import { client } from "../client";

export async function getBookCollections(
  query: z.infer<typeof GetBooksCollectionSchema>,
) {
  const response = await client.books.getBookCollections({ query });

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to fetch book collections: ${response.status}`);
}
