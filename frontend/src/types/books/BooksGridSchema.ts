import { z } from "zod";
import { BookCardSchema } from "./BookCardSchema";

export const BooksGridSchema = z.object({
  title: z.string(),
  books: z.array(BookCardSchema),
  totalCount: z.number(),
});
