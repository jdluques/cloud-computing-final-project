import { z } from "zod";
import { PaginationSchema } from "../PaginationSchema";

export const GetBooksCollectionSchema = z.object({
  ...PaginationSchema.shape,
  collection: z
    .enum([
      "best-sellers",
      "bienestar-y-salud",
      "comics-y-mangas",
      "exitos-empresariales",
      "infantiles",
      "novedades",
      "universo-juvenil",
    ])
    .optional(),
});
