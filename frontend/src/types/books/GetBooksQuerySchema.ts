import { z } from "zod";
import { PaginationSchema } from "../PaginationSchema";

export const GetBooksQuerySchema = z.object({
  ...PaginationSchema.shape,
  genre: z
    .enum(["manga", "comic", "ficcion", "no-ficcion", "infantil", "juvenil"])
    .optional(),
});
