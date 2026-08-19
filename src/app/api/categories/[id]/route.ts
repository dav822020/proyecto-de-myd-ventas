import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const cat = await prisma.category.update({ where: { id: parseInt(params.id) }, data });
  return NextResponse.json(cat);
}
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.category.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ ok: true });
}
