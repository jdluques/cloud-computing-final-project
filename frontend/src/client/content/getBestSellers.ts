import { client } from "../client";

export async function getBestSellers() {
  const response = await client.contents.getNovedades();

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to fetch novedades: ${response.status}`);
}
