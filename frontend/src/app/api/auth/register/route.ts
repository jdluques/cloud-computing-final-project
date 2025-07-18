import { RegisterSchema } from "@/types/auth/AuthSchema";
import { faker } from "@faker-js/faker";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName } = RegisterSchema.parse(body);

    // In a real app, check if user exists and hash password
    // For mock purposes, just create a new user
    const newUser = {
      id: faker.string.uuid(),
      email,
      firstName,
      lastName,
      role: "CLIENT" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Generate mock token
    const token = faker.string.alphanumeric(32);

    return NextResponse.json(
      {
        user: newUser,
        token,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
