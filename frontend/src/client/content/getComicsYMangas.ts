import { client } from "../client";

export async function getComicsYMangas() {
  const response = await client.contents.getComicsYMangas();

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to fetch comics y mangas: ${response.status}`);
}
