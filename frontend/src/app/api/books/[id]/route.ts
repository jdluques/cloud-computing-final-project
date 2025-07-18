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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authToken = request.headers
      .get("authorization")
      ?.replace("Bearer ", "");

    if (!authToken) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();

    // Update book
    const updatedBook = {
      id,
      slug: body.title.toLowerCase().replace(/\s+/g, "-"),
      imageUrl: body.imageUrl,
      title: body.title,
      author: body.author,
      price: body.price.toString(),
      isbn: body.isbn,
      publisher: body.publisher,
      publicationYear: body.publicationYear,
      pages: body.pages,
      synopsis: body.synopsis,
      categorySlug: body.categorySlug,
      stock: body.stock,
    };

    // In a real app, update in database
    console.log("Updating book:", updatedBook);

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error("Book update error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authToken = request.headers
      .get("authorization")
      ?.replace("Bearer ", "");

    if (!authToken) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // In a real app, delete from database
    console.log("Deleting book:", id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Book deletion error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
