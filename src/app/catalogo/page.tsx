import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { parseImages } from "@/lib/utils";
import CatalogClient from "./CatalogClient";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Catálogo de Muebles",
  description: "Explora nuestro catálogo completo de muebles: salas, comedores, dormitorios, oficina, exteriores y más.",
};

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { active: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  const serialized = products.map((p) => ({
    ...p,
    images: parseImages(p.images) as unknown as string,
    tags: JSON.parse(p.tags),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <CatalogClient products={serialized as unknown as import("@/types").ProductType[]} categories={categories} />;
}
