import { contract } from "@/contracts";
import { env } from "@/env";
import { initClient } from "@ts-rest/core";

// Client-side client configuration
export const clientSideClient = initClient(contract, {
  baseUrl: env.NEXT_PUBLIC_BASE_URL,
  baseHeaders: {},
});
