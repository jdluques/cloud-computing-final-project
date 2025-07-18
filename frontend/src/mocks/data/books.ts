import { Book } from "@/types/books/BookSchema";
import { faker } from "@faker-js/faker";
import { MOCK_CATEGORIES } from "./categories";
import { MOCK_COLLECTIONS } from "./collections";

export function generateBook(): Book {
  return {
    id: faker.string.uuid(),
    imageUrl: faker.image.urlLoremFlickr({
      width: 178,
      height: 255,
      category: "book",
    }),
    author: faker.book.author(),
    title: faker.book.title(),
    price: faker.number
      .float({ min: 1, max: 500, fractionDigits: 2 })
      .toString(),
    publisher: faker.book.publisher(),
    isbn: faker.commerce.isbn(),
    sku: faker.string.numeric(8),
    publicationYear: faker.date
      .between({ from: "1900", to: "2025" })
      .getFullYear()
      .toString(),
    pages: faker.number.int({ min: 10, max: 5000 }).toString(),
    weight: faker.number
      .float({ min: 50, max: 2000, fractionDigits: 0 })
      .toString(),
    width: faker.number
      .float({ min: 10, max: 20, fractionDigits: 1 })
      .toString(),
    height: faker.number
      .float({ min: 15, max: 30, fractionDigits: 1 })
      .toString(),
    targetAge: faker.number.int({ min: 3, max: 18 }).toString(),
    synopsis: faker.lorem.paragraphs(3),
    categorySlug: faker.helpers.arrayElement(
      MOCK_CATEGORIES.map((category) => category.slug),
    ),
    subCategorySlug: faker.helpers.arrayElement(
      MOCK_CATEGORIES.flatMap((category) =>
        category.subcategories.map((sub) => sub.slug),
      ),
    ),
    subSubCategorySlug: faker.helpers.arrayElement(
      MOCK_CATEGORIES.flatMap((category) =>
        category.subcategories.flatMap((subCategory) =>
          subCategory.items.map((subSub) => subSub.slug),
        ),
      ),
    ),
    collectionSlug: faker.helpers.arrayElement(
      MOCK_COLLECTIONS.map((collection) => collection.slug),
    ),
  };
}

export function generateBooks(count: number): Book[] {
  console.log(`Generating ${count} mock books...`);
  return Array.from({ length: count }, generateBook);
}

export const MOCK_BOOKS = generateBooks(1000);
