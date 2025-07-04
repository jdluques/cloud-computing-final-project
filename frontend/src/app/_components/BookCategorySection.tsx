import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";

interface BookCategorySectionProps {
	category: string;
}

export default function BookCategorySection(props: BookCategorySectionProps) {
	return (
		<main>
			<section>
				<h2>{props.category}</h2>

				<Button />
			</section>

			<section>
				<Carousel></Carousel>
			</section>
		</main>
	);
}
