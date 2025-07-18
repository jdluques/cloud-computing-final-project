import { HeroImage } from "@/types/contents/HeroImageSchema";
import { faker } from "@faker-js/faker";

export function generateHeroImage(): HeroImage {
  return {
    url: faker.image.urlLoremFlickr({ width: 1521, height: 428 }),
    href: "",
    alt: faker.lorem.sentence(3),
  };
}

export function generateHeroImages(count: number): HeroImage[] {
  return Array.from({ length: count }, generateHeroImage);
}

export const MOCK_HERO_IMAGES = generateHeroImages(5);
