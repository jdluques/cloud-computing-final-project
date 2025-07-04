import BookCategorySection from "./_components/BookCategorySection";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <section>
        <BookCategorySection category="✨NOVEDADES CON OLOR A TINTA" />
        <BookCategorySection category="🏆LOS MÁS VENDIDOS" />
        <BookCategorySection category="💙ENCUENTRA TU CAMINO" />
        <BookCategorySection category="💙ENCUENTRA TU CAMINO" />
        <BookCategorySection category="📊ÉXITOS EMPRESARIALES" />
        <BookCategorySection category="🚀 Universo Juvenil 📚" />
        <BookCategorySection category="🪐MUNDO DE CÓMICS Y MANGAS" />
        <BookCategorySection category="🧸LIBROS INFANTILES PARA TODOS" />
      </section>

      <Footer />
    </main>
  );
}
