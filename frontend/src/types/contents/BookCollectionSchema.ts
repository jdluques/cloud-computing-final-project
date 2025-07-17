import { z } from "zod";
import { BookCardSchema } from "../books/BookCardSchema";

export const BookCollectionSchema = z.object({
  title: z.string(),
  slug: z.string(),
  books: z.array(BookCardSchema),
});
