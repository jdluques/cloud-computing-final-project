import { contract } from "@/contracts";
import { initClient } from "@ts-rest/core";

export const client = initClient(contract, {
  baseUrl: "http://localhost:8081",
  baseHeaders: {},
});
