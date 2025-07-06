import { client } from "../client";

export async function getHeroImages() {
  const response = await client.contents.getHeroImages();

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to fetch hero images: ${response.status}`);
}
