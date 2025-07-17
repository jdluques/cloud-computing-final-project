import { z } from "zod";
import { PaginationSchema } from "../PaginationSchema";

export const GetBooksQuerySchema = z.object({
  ...PaginationSchema.shape,
  collection: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  subsubcategory: z.string().optional(),
  search: z.string().optional(),
});
