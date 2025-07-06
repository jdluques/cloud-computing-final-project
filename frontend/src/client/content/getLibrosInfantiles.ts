import { client } from "../client";

export async function getLibrosInfantiles() {
  const response = await client.contents.getLibrosInfantiles();

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to fetch libros infantiles: ${response.status}`);
}
