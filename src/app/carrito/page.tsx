"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, parseImages } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, count } = useCartStore();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const orderItems = items.map((i) => ({ id: i.product.id, name: i.product.name, price: i.product.price, qty: i.quantity }));
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, items: JSON.stringify(orderItems), total: total() }),
    });
    clearCart();
    setStep("done");
    setLoading(false);
  };

  if (step === "done") {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-black mb-3">¡Pedido recibido!</h1>
        <p className="text-text-muted mb-8">Nos pondremos en contacto contigo para confirmar los detalles y coordinar la entrega.</p>
        <Link href="/" className="btn-primary">Volver al inicio <ArrowRight size={16} /></Link>
      </div>
    );
  }

  if (count() === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <ShoppingBag size={64} className="text-text-muted mx-auto mb-6" />
        <h1 className="text-3xl font-black mb-3">Tu carrito está vacío</h1>
        <p className="text-text-muted mb-8">Explora nuestro catálogo y agrega los muebles que te gusten.</p>
        <Link href="/catalogo" className="btn-primary">Ver catálogo <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Tu carrito ({count()} {count() === 1 ? "producto" : "productos"})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const imgs = parseImages(item.product.images as unknown as string);
            return (
              <div key={item.product.id} className="glass-card p-4 flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-card-border shrink-0">
                  <Image src={imgs[0] || "/images/placeholder.jpg"} alt={item.product.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/producto/${item.product.slug}`} className="font-semibold hover:text-accent transition-colors line-clamp-1">{item.product.name}</Link>
                  <p className="text-text-muted text-sm mt-0.5">{formatPrice(item.product.price)} c/u</p>
                </div>
                <div className="flex items-center border border-card-border rounded-lg">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1.5 text-text-muted hover:text-foreground">−</button>
                  <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1.5 text-text-muted hover:text-foreground">+</button>
                </div>
                <div className="text-accent font-bold w-20 text-right">{formatPrice(item.product.price * item.quantity)}</div>
                <button onClick={() => removeItem(item.product.id)} className="text-text-muted hover:text-danger transition-colors p-1"><Trash2 size={16} /></button>
              </div>
            );
          })}
        </div>

        {/* Summary + Checkout */}
        <div className="glass-card p-6 h-fit">
          <h2 className="text-lg font-bold mb-5">Resumen del pedido</h2>
          <div className="space-y-2 mb-5">
            {items.map((i) => (
              <div key={i.product.id} className="flex justify-between text-sm text-text-muted">
                <span className="truncate flex-1 mr-2">{i.product.name} ×{i.quantity}</span>
                <span>{formatPrice(i.product.price * i.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-card-border pt-4 mb-6">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-accent">{formatPrice(total())}</span>
            </div>
          </div>

          {step === "cart" ? (
            <button onClick={() => setStep("checkout")} className="btn-primary w-full justify-center">
              Continuar con el pedido <ArrowRight size={16} />
            </button>
          ) : (
            <form onSubmit={handleOrder} className="space-y-3">
              <h3 className="font-semibold text-foreground mb-3">Datos de entrega</h3>
              <input required placeholder="Nombre completo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field text-sm" />
              <input required type="email" placeholder="Correo electrónico" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field text-sm" />
              <input placeholder="Teléfono / WhatsApp" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field text-sm" />
              <input placeholder="Dirección de entrega" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="input-field text-sm" />
              <textarea rows={2} placeholder="Notas adicionales..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-field text-sm resize-none" />
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">{loading ? "Enviando..." : "Confirmar pedido"}</button>
              <button type="button" onClick={() => setStep("cart")} className="btn-ghost w-full justify-center text-sm">← Volver al carrito</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
