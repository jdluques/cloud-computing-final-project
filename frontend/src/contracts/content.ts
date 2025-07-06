import { CarouselItemSchema, HeroImageSchema } from "@/types/content";
import { c } from "./contract";

export const contentContract = c.router({
  getHeroImages: {
    method: "GET",
    path: "/contents/hero-images",
    responses: {
      200: HeroImageSchema.array(),
    },
  },
  getNovedades: {
    method: "GET",
    path: "/contents/novedades",
    responses: {
      200: CarouselItemSchema.array(),
    },
  },
  getBestSellers: {
    method: "GET",
    path: "/contents/best-sellers",
    responses: {
      200: CarouselItemSchema.array(),
    },
  },
  getBienestarYSalud: {
    method: "GET",
    path: "/contents/bienestar-y-salud",
    responses: {
      200: CarouselItemSchema.array(),
    },
  },
  getExitosEmpresariales: {
    method: "GET",
    path: "/contents/exitos-empresariales",
    responses: {
      200: CarouselItemSchema.array(),
    },
  },
  getUniversoJuvenil: {
    method: "GET",
    path: "/contents/universo-juvenil",
    responses: {
      200: CarouselItemSchema.array(),
    },
  },
  getComicsYMangas: {
    method: "GET",
    path: "/contents/comics-y-mangas",
    responses: {
      200: CarouselItemSchema.array(),
    },
  },
  getLibrosInfantiles: {
    method: "GET",
    path: "/contents/libros-infantiles",
    responses: {
      200: CarouselItemSchema.array(),
    },
  },
});
