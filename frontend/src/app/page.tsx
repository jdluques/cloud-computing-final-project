import { getBookCollections } from "@/client/books/getBookCollections";
import BookCategorySection from "./_components/BookCategorySection";
import HeroSection from "./_components/HeroSection";

export default async function Page() {
  const bookCollections = await getBookCollections({ limit: 20 });

  return (
    <main className="flex w-full flex-col items-center justify-center gap-10">
      <HeroSection />

      {bookCollections.map((collection, index) => (
        <BookCategorySection
          key={index}
          category={collection.collectionName}
          items={collection.books}
        />
      ))}

      {/* <BookCategorySection
        category="✨NOVEDADES CON OLOR A TINTA"
        fetch={getNovedades}
      />

      <BookCategorySection
        category="🏆LOS MÁS VENDIDOS"
        fetch={getBestSellers}
      />

      <BookCategorySection
        category="💙ENCUENTRA TU CAMINO"
        fetch={getBienestarYSalud}
      />

      <BookCategorySection
        category="📊ÉXITOS EMPRESARIALES"
        fetch={getExitosEmpresariales}
      />

      <BookCategorySection
        category="🚀UNIVERSO JUVENIL📚"
        fetch={getUniversoJuvenil}
      />

      <BookCategorySection
        category="🪐MUNDO DE CÓMICS Y MANGAS"
        fetch={getComicsYMangas}
      />

      <BookCategorySection
        category="🧸LIBROS INFANTILES PARA TODOS"
        fetch={getLibrosInfantiles}
      /> */}
    </main>
  );
}
