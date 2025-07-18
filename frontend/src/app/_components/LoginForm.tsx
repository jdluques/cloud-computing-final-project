"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(5, "La contraseña debe tener al menos 6 caracteres"),
});

export default function LoginForm(props: { onClick: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Formulario enviado con los valores:", values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
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

        <Button type="submit">Iniciar Sesión</Button>

        <p className="text-md cursor-pointer" onClick={props.onClick}>
          ¿No tienes una cuenta? Regístrate
        </p>
      </form>
    </Form>
  );
}
