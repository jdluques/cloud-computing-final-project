import { MOCK_HERO_IMAGES } from "@/mocks/data";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(MOCK_HERO_IMAGES);
}
