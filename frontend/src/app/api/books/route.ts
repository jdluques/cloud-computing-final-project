import { MOCK_BOOKS } from "@/mocks/data";
import { GetBooksQuerySchema } from "@/types/books/GetBooksQuerySchema";
import { faker } from "@faker-js/faker";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchParamsObject = Object.fromEntries(searchParams.entries());
  const queryParams = GetBooksQuerySchema.parse(searchParamsObject);
  const page = queryParams.page || 1;
  const limit = queryParams.limit || 10;

  let response = MOCK_BOOKS;

  if (queryParams.collection) {
    response = response.filter(
      (book) => book.collectionSlug === queryParams.collection,
    );
  }

  if (queryParams.category) {
    response = response.filter(
      (book) => book.categorySlug === queryParams.category,
    );
  }

  if (queryParams.subcategory) {
    response = response.filter(
      (book) => book.subCategorySlug === queryParams.subcategory,
    );
  }

  if (queryParams.subsubcategory) {
    response = response.filter(
      (book) => book.subSubCategorySlug === queryParams.subsubcategory,
    );
  }

  if (queryParams.search) {
    const searchTerm = queryParams.search.toLowerCase();
    response = response.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.isbn.includes(searchTerm),
    );
  }

  const totalCount = response.length;

  const startIndex = (page - 1) * limit;
  const paginatedBooks = response.slice(startIndex, startIndex + limit);

  const transformedBooks = paginatedBooks.map((book) => ({
    id: book.id,
    author: book.author,
    title: book.title,
    price: book.price,
    imageUrl: book.imageUrl,
  }));

  return NextResponse.json({
    title: faker.lorem.sentence(),
    books: transformedBooks,
    totalCount,
  });
}
