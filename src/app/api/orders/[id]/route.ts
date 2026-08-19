import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const order = await prisma.order.update({ where: { id: parseInt(params.id) }, data });
  return NextResponse.json(order);
}
