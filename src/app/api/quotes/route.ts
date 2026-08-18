import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const quotes = await prisma.quote.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(quotes);
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const quote = await prisma.quote.create({ data });
  return NextResponse.json(quote, { status: 201 });
}
