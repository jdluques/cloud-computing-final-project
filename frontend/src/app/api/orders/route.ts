import { generateMockOrder, MOCK_ORDERS } from "@/mocks/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authToken = request.headers
      .get("authorization")
      ?.replace("Bearer ", "");

    if (!authToken) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Return mock orders for the authenticated user
    return NextResponse.json(MOCK_ORDERS);
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authToken = request.headers
      .get("authorization")
      ?.replace("Bearer ", "");

    if (!authToken) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { items, total, shippingAddress, paymentMethod } = body;

    // Create mock order using the generator
    const order = generateMockOrder({
      items,
      total,
      shippingAddress,
      paymentMethod,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
