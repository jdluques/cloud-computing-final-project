import { authContract } from "./auth";
import { booksContract } from "./books";
import { contentsContract } from "./contents";
import { c } from "./contract";

export const contract = c.router({
  auth: authContract,
  contents: contentsContract,
  books: booksContract,
});
