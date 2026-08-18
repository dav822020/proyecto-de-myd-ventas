import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const configs = await prisma.siteConfig.findMany();
  const obj: Record<string, string> = {};
  configs.forEach((c) => { obj[c.key] = c.value; });
  return NextResponse.json(obj);
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const results = await Promise.all(
    Object.entries(data).map(([key, value]) =>
      prisma.siteConfig.upsert({ where: { key }, update: { value: value as string }, create: { key, value: value as string } })
    )
  );
  return NextResponse.json(results);
}
