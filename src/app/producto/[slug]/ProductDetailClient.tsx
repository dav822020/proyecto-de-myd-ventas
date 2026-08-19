"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, MessageSquare, FileText, ChevronRight, Ruler, Package } from "lucide-react";
import { ProductType } from "@/types";
import { useCartStore } from "@/store/cart";
import { useFavoritesStore } from "@/store/favorites";
import { formatPrice, parseImages } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  product: ProductType;
  related: ProductType[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const images = parseImages(product.images as unknown as string);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFav = useFavoritesStore((s) => s.isFavorite(product.id));

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  const specs = [
    product.height && { label: "Alto", value: `${product.height} cm` },
    product.width && { label: "Ancho", value: `${product.width} cm` },
    product.depth && { label: "Profundidad", value: `${product.depth} cm` },
    product.weight && { label: "Peso", value: `${product.weight} kg` },
    product.material && { label: "Material", value: product.material },
    product.finish && { label: "Acabado", value: product.finish },
    product.color && { label: "Color", value: product.color },
    product.warranty && { label: "Garantía", value: product.warranty },
  ].filter(Boolean) as { label: string; value: string }[];

  const whatsappMsg = encodeURIComponent(`Hola! Me interesa el producto: ${product.name} (${formatPrice(product.price)}). ¿Tienen disponibilidad?`);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
        <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
        <ChevronRight size={14} />
        <Link href="/catalogo" className="hover:text-accent transition-colors">Catálogo</Link>
        <ChevronRight size={14} />
        {product.category && (
          <>
            <Link href={`/catalogo?categoria=${product.category.slug}`} className="hover:text-accent transition-colors">{product.category.name}</Link>
            <ChevronRight size={14} />
          </>
        )}
        <span className="text-foreground truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-card-border mb-3">
            <Image
              src={images[active] || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.jpg"; }}
            />
            {discount && (
              <span className="absolute top-4 left-4 badge bg-danger/20 text-danger text-sm px-3 py-1">-{discount}%</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${i === active ? "border-accent" : "border-card-border hover:border-accent/40"}`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.jpg"; }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.category && (
            <Link href={`/catalogo?categoria=${product.category.slug}`} className="text-accent text-sm font-medium hover:underline">{product.category.name}</Link>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-3xl font-black text-accent">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <span className="text-text-muted text-lg line-through">{formatPrice(product.comparePrice)}</span>
            )}
            {discount && <span className="badge-danger px-2 py-1">Ahorra {discount}%</span>}
          </div>

          {/* Quick dims */}
          {(product.width || product.height || product.depth) && (
            <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-3 mb-5">
              <Ruler size={16} className="text-accent" />
              <span className="text-sm text-accent font-medium">
                {[product.height && `Alto ${product.height}cm`, product.width && `Ancho ${product.width}cm`, product.depth && `Prof ${product.depth}cm`].filter(Boolean).join(" × ")}
              </span>
            </div>
          )}

          <p className="text-text-light leading-relaxed mb-6">{product.description}</p>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-success" : "bg-danger"}`} />
            <span className={`text-sm font-medium ${product.stock > 0 ? "text-success" : "text-danger"}`}>
              {product.stock > 0 ? `En stock (${product.stock} disponibles)` : "Sin stock"}
            </span>
          </div>

          {/* Qty + Add */}
          <div className="flex gap-3 mb-4">
            <div className="flex items-center border border-card-border rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3 text-text-muted hover:text-foreground transition-colors">−</button>
              <span className="px-4 font-semibold">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-3 text-text-muted hover:text-foreground transition-colors">+</button>
            </div>
            <button
              onClick={() => { for (let i = 0; i < qty; i++) addItem(product); }}
              disabled={product.stock === 0}
              className="btn-primary flex-1 justify-center disabled:opacity-40"
            >
              <ShoppingCart size={18} /> Agregar al carrito
            </button>
            <button onClick={() => toggle(product)} className={`p-3 rounded-lg border transition-all ${isFav ? "border-red-500 bg-red-500/10 text-red-400" : "border-card-border text-text-muted hover:text-red-400"}`}>
              <Heart size={18} fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setQuoteOpen(true)} className="btn-secondary flex-1 justify-center text-sm">
              <FileText size={15} /> Solicitar cotización
            </button>
            <a href={`https://wa.me/593991234567?text=${whatsappMsg}`} target="_blank" rel="noreferrer" className="btn-secondary flex-1 justify-center text-sm">
              <MessageSquare size={15} /> Consultar
            </a>
          </div>
        </div>
      </div>

      {/* Ficha técnica */}
      {specs.length > 0 && (
        <section className="glass-card p-6 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Package size={16} className="text-accent" />
            </div>
            <h2 className="text-xl font-bold">Ficha Técnica</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specs.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 p-3 bg-card-border/30 rounded-lg">
                <span className="text-text-muted text-xs font-medium uppercase tracking-wide">{s.label}</span>
                <span className="text-foreground font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
          {product.careInstructions && (
            <div className="mt-5 p-4 bg-accent/5 border border-accent/10 rounded-lg">
              <p className="text-xs text-text-muted uppercase font-medium mb-1">Cuidado y mantenimiento</p>
              <p className="text-text-light text-sm">{product.careInstructions}</p>
            </div>
          )}
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Quote modal */}
      {quoteOpen && (
        <QuoteModal product={product} onClose={() => setQuoteOpen(false)} />
      )}
    </div>
  );
}

function QuoteModal({ product, onClose }: { product: ProductType; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", details: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, productId: product.id, productName: product.name }),
    });
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold">Solicitar cotización</h3>
          <button onClick={onClose} className="text-text-muted hover:text-foreground">✕</button>
        </div>
        <p className="text-text-muted text-sm mb-5">Producto: <span className="text-accent font-semibold">{product.name}</span></p>
        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <p className="font-semibold text-foreground mb-2">¡Cotización enviada!</p>
            <p className="text-text-muted text-sm mb-4">Te contactaremos pronto.</p>
            <button onClick={onClose} className="btn-primary">Cerrar</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input required placeholder="Nombre completo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
            <input required type="email" placeholder="Correo electrónico" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
            <input placeholder="Teléfono / WhatsApp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
            <textarea rows={3} placeholder="Detalles adicionales (medidas especiales, colores, etc.)" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="input-field resize-none" />
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center">Cancelar</button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">{loading ? "Enviando..." : "Enviar cotización"}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
