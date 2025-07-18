import { NextRequest, NextResponse } from "next/server";

// Mock users database (same as in login)
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@ibero.com",
    firstName: "Admin",
    lastName: "User",
    role: "ADMIN" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "client@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "CLIENT" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    // Mock token validation - extract user ID from token
    // In real app, properly decode and validate JWT
    const tokenMatch = token.match(/mock-jwt-token-(\d+)-/);
    if (!tokenMatch) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const userId = tokenMatch[1];
    const user = MOCK_USERS.find((u) => u.id === userId);

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 401 },
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
