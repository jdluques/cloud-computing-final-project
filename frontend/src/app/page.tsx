import { MOCK_BOOKS, MOCK_COLLECTIONS } from "@/mocks/data";
import BookCollectionSection from "./_components/BookCollectionSection";
import HeroSection from "./_components/HeroSection";

export default async function Page() {
  // Using mock data directly (SSR) - combine collections with books
  const bookCollections = MOCK_COLLECTIONS.map((collection) => ({
    ...collection,
    books: MOCK_BOOKS.slice(0, 20), // Take first 20 books for each collection
  }));

  return (
    <main className="flex w-full flex-col items-center justify-center gap-10">
      <HeroSection />

      {bookCollections.map((collection, index) => (
        <BookCollectionSection
          key={index}
          title={collection.title}
          items={collection.books}
          collectionSlug={`/collection/${collection.slug}`}
        />
      ))}
    </main>
  );
}
