"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "ADMIN")) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="mt-4">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Panel de Administración</h1>
        <p className="text-gray-600">Gestiona el inventario de libros</p>
      </div>

      <nav className="mb-8">
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.push("/admin")}>
            Dashboard
          </Button>
          <Button variant="outline" onClick={() => router.push("/admin/books")}>
            Gestionar Libros
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/orders")}
          >
            Órdenes
          </Button>
        </div>
      </nav>

      {children}
    </div>
  );
}
