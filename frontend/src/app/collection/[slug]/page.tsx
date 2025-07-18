import { getBooks } from "@/client/books/getBooks";
import BooksGrid from "../../_components/BooksGrid";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await getBooks({ collection: slug });

  return (
    <BooksGrid title={response.title} books={response.books} totalCount={0} />
  );
}
