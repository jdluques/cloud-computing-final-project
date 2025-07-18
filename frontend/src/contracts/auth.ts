import {
  AuthResponseSchema,
  LoginSchema,
  RegisterSchema,
  UserSchema,
} from "@/types/auth/AuthSchema";
import { c } from "./contract";

export const authContract = c.router({
  login: {
    method: "POST",
    path: "/api/auth/login",
    body: LoginSchema,
    responses: {
      200: AuthResponseSchema,
      401: c.type<{ error: string }>(),
      500: c.type<{ error: string }>(),
    },
  },
  register: {
    method: "POST",
    path: "/api/auth/register",
    body: RegisterSchema,
    responses: {
      201: AuthResponseSchema,
      400: c.type<{ error: string }>(),
      500: c.type<{ error: string }>(),
    },
  },
  me: {
    method: "GET",
    path: "/api/auth/me",
    headers: c.type<{ authorization: string }>(),
    responses: {
      200: c.type<{ user: typeof UserSchema }>(),
      401: c.type<{ error: string }>(),
      500: c.type<{ error: string }>(),
    },
  },
});
