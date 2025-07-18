import { MOCK_BOOKS, MOCK_COLLECTIONS } from "@/mocks/data";
import BooksGrid from "../../_components/BooksGrid";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Find collection by slug and get books for that collection
  const collection = MOCK_COLLECTIONS.find((col) => col.slug === slug);

  const collectionTitle = collection ? collection.title : "Colección";
  const books = MOCK_BOOKS.slice(0, 30); // Show first 30 books for the collection

  return (
    <BooksGrid
      title={collectionTitle}
      books={books}
      totalCount={books.length}
    />
  );
}
