import { z } from "zod";

export const BookCardSchema = z.object({
  id: z.string(),
  author: z.string(),
  title: z.string(),
  price: z.number(),
  imageUrl: z.string().url(),
});
