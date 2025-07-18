"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { LoginSchema } from "@/types/auth/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

export default function LoginForm(props: { onClick: () => void }) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      await login(values.email, values.password);
      // Form will close automatically when user state changes
    } catch (error) {
      setError("Credenciales inválidas");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">Iniciar Sesión</h2>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <EmailField field={field} />}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => <PasswordField field={field} />}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </Button>

        <p
          className="text-md cursor-pointer text-center"
          onClick={props.onClick}
        >
          ¿No tienes una cuenta? Regístrate
        </p>
      </form>
    </Form>
  );
}
