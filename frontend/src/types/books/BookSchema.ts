import { z } from "zod";
import { BookCardSchema } from "./BookCardSchema";

export const BookSchema = BookCardSchema.extend({
  sku: z.string(),
  isbn: z.string(),
  publisher: z.string(),
  publicationYear: z.string(),
  pages: z.string(),
  weight: z.string(),
  width: z.string(),
  height: z.string(),
  targetAge: z.string(),
  synopsis: z.string(),
  categorySlug: z.string(),
  subCategorySlug: z.string(),
  subSubCategorySlug: z.string(),
  collectionSlug: z.string().optional(),
});

export type Book = z.infer<typeof BookSchema>;
