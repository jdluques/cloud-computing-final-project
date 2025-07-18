import { MOCK_BOOKS, MOCK_COLLECTIONS } from "@/mocks/data";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    MOCK_COLLECTIONS.map((collection) => ({
      ...collection,
      books: faker.helpers.arrayElements(MOCK_BOOKS, 20),
    })),
  );
}
