import z from "zod";

export const HeroImageSchema = z.object({
  url: z.string().url(),
  href: z.string().url(),
  alt: z.string(),
});

export type HeroImage = z.infer<typeof HeroImageSchema>;
