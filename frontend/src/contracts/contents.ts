import { BookCategorySchema } from "@/types/contents/BookCategorySchema";
import { BookCollectionSchema } from "@/types/contents/BookCollectionSchema";
import { HeroImageSchema } from "@/types/contents/HeroImageSchema";
import z from "zod";
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
      200: z.array(BookCategorySchema),
    },
  },
  getBookCollections: {
    method: "GET",
    path: "/contents/book-collections",
    responses: {
      200: z.array(BookCollectionSchema),
    },
  },
});
