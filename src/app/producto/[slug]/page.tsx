import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseImages } from "@/lib/utils";
import ProductDetailClient from "./ProductDetailClient";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.description || `${product.name} — MYD Muebles`,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug, active: true },
    include: { category: true },
  });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, active: true, id: { not: product.id } },
    include: { category: true },
    take: 4,
  });

  const serialized = {
    ...product,
    images: parseImages(product.images) as unknown as string,
    tags: JSON.parse(product.tags),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  const serializedRelated = related.map((p) => ({
    ...p,
    images: parseImages(p.images) as unknown as string,
    tags: JSON.parse(p.tags),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return <ProductDetailClient product={serialized as unknown as import("@/types").ProductType} related={serializedRelated as unknown as import("@/types").ProductType[]} />;
}
