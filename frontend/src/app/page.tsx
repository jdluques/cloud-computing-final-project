import { getBestSellers } from "@/client/content/getBestSellers";
import { getBienestarYSalud } from "@/client/content/getBienestarYSalud";
import { getComicsYMangas } from "@/client/content/getComicsYMangas";
import { getExitosEmpresariales } from "@/client/content/getExitosEmpresariales";
import { getLibrosInfantiles } from "@/client/content/getLibrosInfantiles";
import { getNovedades } from "@/client/content/getNovedades";
import { getUniversoJuvenil } from "@/client/content/getUniversoJuvenil";
import BookCategorySection from "./_components/BookCategorySection";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-10">
      <HeroSection />

      <BookCategorySection
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
      />

      <Footer />
    </main>
  );
}
