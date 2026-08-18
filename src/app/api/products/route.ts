import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("categoria") || "";
  const featured = searchParams.get("featured") === "1";
  const limit = parseInt(searchParams.get("limit") || "50");
  const where: Record<string, unknown> = { active: true };
  if (q) where.OR = [{ name: { contains: q } }, { description: { contains: q } }];
  if (category) where.category = { slug: category };
  if (featured) where.featured = true;
  const products = await prisma.product.findMany({ where, include: { category: true }, take: limit, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const product = await prisma.product.create({ data: { ...data, images: JSON.stringify(data.images || []), tags: JSON.stringify(data.tags || []) }, include: { category: true } });
  return NextResponse.json(product, { status: 201 });
}
