import { getHeroImages } from "@/api/home";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

export default async function HeroSection() {
  const heroImages = await getHeroImages();

  return (
    <Carousel>
      <CarouselContent></CarouselContent>
    </Carousel>
  );
}
