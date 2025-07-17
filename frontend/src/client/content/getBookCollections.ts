import { client } from "../client";

export async function getBookCollections() {
  const response = await client.contents.getBookCollections();

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to fetch book collections: ${response.status}`);
}
