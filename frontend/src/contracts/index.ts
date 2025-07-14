import { booksContract } from "./books";
import { contentsContract } from "./contents";
import { c } from "./contract";

export const contract = c.router({
  contents: contentsContract,
  books: booksContract,
});
