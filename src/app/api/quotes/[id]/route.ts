import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const quote = await prisma.quote.update({ where: { id: parseInt(params.id) }, data });
  return NextResponse.json(quote);
}
