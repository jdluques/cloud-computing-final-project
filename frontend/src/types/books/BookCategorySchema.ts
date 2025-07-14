import { z } from "zod";

const ItemSchema = z.object({
  title: z.string(),
  slug: z.string(),
});

export const BookCategorySchema = z.object({
  ...ItemSchema.shape,
  subcategories: z.array(
    z.object({
      ...ItemSchema.shape,
      items: z.array(
        z.object({
          ...ItemSchema.shape,
        }),
      ),
    }),
  ),
});
