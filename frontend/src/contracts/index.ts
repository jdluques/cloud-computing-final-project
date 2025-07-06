import { contentContract } from "./content";
import { c } from "./contract";

export const contract = c.router({
  contents: contentContract,
});
