import z from "zod";

export const HeroImageSchema = z.object({
  url: z.string().url(),
  href: z.string().url(),
  alt: z.string(),
});
