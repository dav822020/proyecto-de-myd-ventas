import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const msgs = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(msgs);
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const msg = await prisma.message.create({ data });
  return NextResponse.json(msg, { status: 201 });
}
