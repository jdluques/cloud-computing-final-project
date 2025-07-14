import { z } from "zod";

export const PaginationSchema = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  sort: z
    .enum([
      "newest",
      "oldest",
      "price-low",
      "price-high",
      "name-asc",
      "name-desc",
    ])
    .optional(),
});
