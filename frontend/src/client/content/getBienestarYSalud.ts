import { client } from "../client";

export async function getBienestarYSalud() {
  const response = await client.contents.getBienestarYSalud();

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to fetch bienestar y salud: ${response.status}`);
}
