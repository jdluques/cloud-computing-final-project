import { getBookCollections } from "@/client/content/getBookCollections";
import BookCollectionSection from "./_components/BookCollectionSection";
import HeroSection from "./_components/HeroSection";

export default async function Page() {
  const bookCollections = await getBookCollections();

  return (
    <main className="flex w-full flex-col items-center justify-center gap-10">
      <HeroSection />

      {bookCollections.map((collection, index) => (
        <BookCollectionSection
          key={index}
          title={collection.title}
          items={collection.books}
          href={`/${collection.slug}`}
        />
      ))}
    </main>
  );
}
