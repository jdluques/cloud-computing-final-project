import { client } from "../client";

export async function getBookCategories() {
  const response = await client.contents.getBookCategories();

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to fetch book categories: ${response.status}`);
}
