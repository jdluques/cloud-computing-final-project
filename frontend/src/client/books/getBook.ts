import { client } from "../client";

export async function getBook(id: string) {
  const response = await client.books.getBook({ params: { id } });

  if (response.status === 200) {
    return response.body;
  }

  throw new Error(`Failed to fetch book: ${response.status}`);
}
