import { getHeroImages } from "@/client/content/getHeroImages";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default async function HeroSection() {
  const heroImages = await getHeroImages();

  return (
    <Carousel>
      <CarouselContent>
        {heroImages.map((heroImage, index) => (
          <CarouselItem key={index}>
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              width={1521}
              height={428}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />

      <CarouselNext />
    </Carousel>
  );
}
