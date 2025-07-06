import { client } from "../client";

export async function getUniversoJuvenil() {
  const response = await client.contents.getExitosEmpresariales();

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to fetch exitos empresariales: ${response.status}`);
}
