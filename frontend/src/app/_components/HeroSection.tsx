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
    <div className="relative w-full">
      <Carousel className="w-full">
        <CarouselContent className="w-full">
          {heroImages.map((heroImage, index) => (
            <CarouselItem key={index} className="relative h-[428px] w-full">
              <Image src={heroImage.url} alt={heroImage.alt} fill />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2" />

        <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}
