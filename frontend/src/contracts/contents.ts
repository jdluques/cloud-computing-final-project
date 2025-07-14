import { BookCategorySchema } from "@/types/books/BookCategorySchema";
import { HeroImageSchema } from "@/types/contents/HeroImageSchema";
import { c } from "./contract";

export const contentsContract = c.router({
  getHeroImages: {
    method: "GET",
    path: "/contents/hero-images",
    responses: {
      200: HeroImageSchema.array(),
    },
  },
  getBookCategories: {
    method: "GET",
    path: "/contents/book-categories",
    responses: {
      200: BookCategorySchema.array(),
    },
  },
});
