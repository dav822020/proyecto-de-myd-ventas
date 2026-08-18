import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: parseInt(params.id) }, include: { category: true } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  if (data.images && Array.isArray(data.images)) data.images = JSON.stringify(data.images);
  if (data.tags && Array.isArray(data.tags)) data.tags = JSON.stringify(data.tags);
  const product = await prisma.product.update({ where: { id: parseInt(params.id) }, data, include: { category: true } });
  return NextResponse.json(product);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ ok: true });
}
