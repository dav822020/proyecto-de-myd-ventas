"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { ProductType } from "@/types";
import { useCartStore } from "@/store/cart";
import { useFavoritesStore } from "@/store/favorites";
import { formatPrice, parseImages } from "@/lib/utils";

interface Props {
  product: ProductType;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFav = useFavoritesStore((s) => s.isFavorite(product.id));
  const images = parseImages(product.images as unknown as string);
  const mainImage = images[0] || "/images/placeholder.jpg";
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  return (
    <div className="glass-card-hover group relative flex flex-col overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.featured && <span className="badge-accent">Destacado</span>}
        {discount && <span className="badge bg-danger/20 text-danger">-{discount}%</span>}
        {product.stock === 0 && <span className="badge bg-text-muted/20 text-text-muted">Sin stock</span>}
      </div>

      {/* Fav button */}
      <button
        onClick={() => toggle(product)}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isFav ? "bg-red-500 text-white" : "bg-card/80 text-text-muted hover:text-red-400"}`}
      >
        <Heart size={15} fill={isFav ? "white" : "none"} />
      </button>

      {/* Image */}
      <Link href={`/producto/${product.slug}`} className="block overflow-hidden aspect-[4/3] bg-card-border relative">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.jpg"; }}
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-text-muted text-xs mb-1">{product.category?.name}</p>
        <Link href={`/producto/${product.slug}`} className="font-semibold text-foreground hover:text-accent transition-colors line-clamp-2 mb-2 leading-snug">
          {product.name}
        </Link>

        {/* Dimensions badge */}
        {(product.width || product.height || product.depth) && (
          <p className="text-text-muted text-xs mb-3">
            {[product.height && `Alto: ${product.height}cm`, product.width && `Ancho: ${product.width}cm`, product.depth && `Prof: ${product.depth}cm`].filter(Boolean).join(" · ")}
          </p>
        )}

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-accent font-bold text-lg">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <span className="text-text-muted text-sm line-through">{formatPrice(product.comparePrice)}</span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => addItem(product)}
              disabled={product.stock === 0}
              className="btn-primary flex-1 text-sm py-2 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={15} />
              Agregar
            </button>
            <Link href={`/producto/${product.slug}`} className="btn-secondary px-3 py-2">
              <Eye size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
