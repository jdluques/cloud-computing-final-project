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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const BookFormSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  author: z.string().min(1, "El autor es requerido"),
  price: z.string().min(1, "El precio es requerido"),
  imageUrl: z.string().url("URL de imagen inválida"),
  stock: z.string().min(1, "El stock es requerido"),
  isbn: z.string().min(1, "El ISBN es requerido"),
  publisher: z.string().min(1, "La editorial es requerida"),
  publicationYear: z.string().min(1, "El año de publicación es requerido"),
  pages: z.string().min(1, "El número de páginas es requerido"),
  synopsis: z.string().min(1, "La sinopsis es requerida"),
  categorySlug: z.string().min(1, "La categoría es requerida"),
});

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  stock: number;
  isbn: string;
  publisher: string;
  publicationYear: string;
  pages: string;
  synopsis: string;
  categorySlug: string;
}

interface BookFormProps {
  book?: Book | null;
  onSave: () => void;
  onCancel: () => void;
}

export function BookForm({ book, onSave, onCancel }: BookFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof BookFormSchema>>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      title: book?.title || "",
      author: book?.author || "",
      price: book?.price.toString() || "",
      imageUrl: book?.imageUrl || "",
      stock: book?.stock.toString() || "",
      isbn: book?.isbn || "",
      publisher: book?.publisher || "",
      publicationYear: book?.publicationYear || "",
      pages: book?.pages || "",
      synopsis: book?.synopsis || "",
      categorySlug: book?.categorySlug || "",
    },
  });

  async function onSubmit(values: z.infer<typeof BookFormSchema>) {
    setIsLoading(true);

    try {
      const bookData = {
        ...values,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
      };

      const url = book ? `/api/books/${book.id}` : "/api/books";
      const method = book ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        onSave();
      } else {
        alert("Error al guardar el libro");
      }
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Error al guardar el libro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autor</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio (S/.)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de Imagen</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Editorial</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="publicationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Año de Publicación</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Páginas</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categorySlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ficcion">Ficción</SelectItem>
                  <SelectItem value="no-ficcion">No Ficción</SelectItem>
                  <SelectItem value="literatura-clasica">
                    Literatura Clásica
                  </SelectItem>
                  <SelectItem value="ciencia-ficcion">
                    Ciencia Ficción
                  </SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="misterio">Misterio</SelectItem>
                  <SelectItem value="biografia">Biografía</SelectItem>
                  <SelectItem value="historia">Historia</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="synopsis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sinopsis</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Guardando..." : book ? "Actualizar" : "Crear"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}
