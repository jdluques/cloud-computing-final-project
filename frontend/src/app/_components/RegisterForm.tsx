"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z
    .string()
    .min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
});

export default function RegisterForm(props: { onClick: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>

              <FormControl>
                <Input placeholder="Ingresa tu nombre" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>

              <FormControl>
                <Input
                  placeholder="Vuelve a ingresar tu contraseña"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Registrarse</Button>

        <p className="text-md cursor-pointer" onClick={props.onClick}>
          ¿Ya tienes una cuenta? Inicia sesión
        </p>
      </form>
    </Form>
  );
}
