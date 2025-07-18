import { MOCK_CATEGORIES } from "@/mocks/data";
import HeaderClient from "./HeaderClient";

interface BookCategory {
  slug: string;
  title: string;
  subcategories: Array<{
    title: string;
    items: Array<{
      title: string;
      slug: string;
    }>;
  }>;
}

// Server component to fetch data
export default function HeaderServer() {
  // Transform mock data to match the expected format
  const bookCategories: BookCategory[] = MOCK_CATEGORIES.map((category) => ({
    slug: category.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[áéíóúñ]/g, (match) => {
        const replacements: Record<string, string> = {
          á: "a",
          é: "e",
          í: "i",
          ó: "o",
          ú: "u",
          ñ: "n",
        };
        return replacements[match] || match;
      }),
    title: category.title,
    subcategories: category.subcategories.map((sub) => ({
      title: sub.title,
      items: sub.items.map((item) => ({
        title: item.title,
        slug: `/category/${category.title.toLowerCase().replace(/\s+/g, "-")}/${sub.title.toLowerCase().replace(/\s+/g, "-")}/${item.title.toLowerCase().replace(/\s+/g, "-")}`,
      })),
    })),
  }));

  return <HeaderClient bookCategories={bookCategories} />;
}
