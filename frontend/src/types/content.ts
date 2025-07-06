import z from "zod";

export const HeroImageSchema = z.object({
  url: z.string().url(),
  href: z.string().url(),
  alt: z.string(),
});

export const CarouselItemSchema = z.object({
  author: z.string(),
  title: z.string(),
  price: z.number(),
  imageUrl: z.string().url(),
});
