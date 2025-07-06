import { HeroImageSchema } from "@/types/content";
import { c } from "./contract";

export const contentContract = c.router({
  getHeroImages: {
    method: "GET",
    path: "/contents/hero-images",
    responses: {
      200: HeroImageSchema.array(),
    },
  },
});
