import { contract } from "@/contracts";
import { env } from "@/env";
import { initClient } from "@ts-rest/core";

// Server-side client configuration
export const client = initClient(contract, {
  baseUrl: env.BASE_URL,
  baseHeaders: {},
});
