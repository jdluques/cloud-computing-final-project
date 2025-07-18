import { MOCK_ADMIN_STATS } from "@/mocks/data";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(MOCK_ADMIN_STATS);
}
