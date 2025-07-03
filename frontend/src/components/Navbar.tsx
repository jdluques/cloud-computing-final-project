import { Book, LucideIcon, Pin, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const navigationSections: { title: string; href?: string; icon: LucideIcon }[] =
	[
		{ title: "Blog", href: "/blog", icon: Book },
		{ title: "Tiendas", href: "/shops", icon: Pin },
		{ title: "Regístrate", href: "/register", icon: User },
		{ title: "Carrito", href: "/cart", icon: ShoppingCart },
	];

const bookCategories: { title: string }[] = [
	{ title: "MANGA Y COMICS" },
	{ title: "NO FICCIÓN" },
	{ title: "LIBROS INFANTILES" },
	{ title: "LIBROS JUVENIALES" },
	{ title: "FICCIÓN" },
	{ title: "BIENESTAR Y SALUD" },
	{ title: "ACTUALIDAD Y EMPRESA" },
];

export default function Navbar() {
	return (
		<nav>
			<header>
				<section>
					<Image
						src={
							"https://iberoperu.vtexassets.com/assets/vtex.file-manager-graphql/images/f16cd716-7565-4b21-984a-cd7b1ccbd452___e0096655f3417c9fc0b2c96582f2ff76.png"
						}
						alt={"Ibero Librerías Logo"}
					/>
				</section>

				<section>
					<Input />
				</section>

				<section>
					{navigationSections.map((section, index) => (
						<Button key={index} />
					))}
				</section>
			</header>

			<footer>
				<section>
					{bookCategories.map((category, index) => (
						<Button key={index}>{category.title}</Button>
					))}
				</section>
			</footer>
		</nav>
	);
}
