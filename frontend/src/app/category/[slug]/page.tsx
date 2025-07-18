import BooksGrid from "@/app/_components/BooksGrid";
import { getBooks } from "@/client/books/getBooks";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await getBooks({ category: slug });

  return (
    <BooksGrid
      title={response.title}
      books={response.books}
      totalCount={response.totalCount}
    />
  );
}
