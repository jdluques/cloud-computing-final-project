import BooksGrid from "@/app/_components/BooksGrid";
import { MOCK_BOOKS, MOCK_CATEGORIES } from "@/mocks/data";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Find category by slug and get books for that category
  const category = MOCK_CATEGORIES.find(
    (cat) => cat.title.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  const categoryTitle = category ? category.title : "Categoría";
  const books = MOCK_BOOKS.slice(0, 50); // Show first 50 books for the category

  return (
    <BooksGrid title={categoryTitle} books={books} totalCount={books.length} />
  );
}
