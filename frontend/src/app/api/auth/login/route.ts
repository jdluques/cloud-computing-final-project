import { LoginSchema } from "@/types/auth/AuthSchema";
import { faker } from "@faker-js/faker";
import { NextRequest, NextResponse } from "next/server";

// Mock user database
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@ibero.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    role: "ADMIN" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "client@example.com",
    password: "client123",
    firstName: "John",
    lastName: "Doe",
    role: "CLIENT" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = LoginSchema.parse(body);

    // Find user
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    // Generate mock token
    const token = faker.string.alphanumeric(32);

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
