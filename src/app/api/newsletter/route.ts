import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "Newsletter disabled" }, { status: 410 });
}

export async function POST() {
  return NextResponse.json({ error: "Newsletter disabled" }, { status: 410 });
}

// Note: All Prisma-dependent logic was removed to ensure the frontend build
// does not bundle Prisma. If newsletter functionality is needed later,
// implement it in the backend service or add proper Prisma setup for Vercel.
