import { contract } from "@/contracts";
import { MOCK_BOOKS } from "@/mocks/data";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<z.infer<typeof contract.books.getBook.pathParams>>;
  },
) {
  const { id } = await params;
  return NextResponse.json(MOCK_BOOKS.find((book) => book.id === id));
}
