import Link from "next/link";
import { ArrowRight, Star, Shield, Truck, Wrench, Award, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { parseImages } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";

export const dynamic = 'force-dynamic';

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true, active: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    });
    return products.map((p) => ({
      ...p,
      images: parseImages(p.images) as unknown as string,
      tags: JSON.parse(p.tags),
    }));
  } catch { return []; }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({ orderBy: { order: "asc" } });
  } catch { return []; }
}

const categoryIcons: Record<string, string> = {
  salas: "🛋️", comedores: "🍽️", dormitorios: "🛏️",
  oficina: "💼", exteriores: "🌿", accesorios: "🪴", decoracion: "🎨",
};

const whyUs = [
  { icon: <Wrench className="text-accent" size={28} />, title: "Fabricación Propia", desc: "Diseñamos y construimos cada mueble en nuestro taller con materiales seleccionados." },
  { icon: <Truck className="text-accent" size={28} />, title: "Entrega a Domicilio", desc: "Llevamos tu pedido a cualquier lugar de Ecuador con cuidado y puntualidad." },
  { icon: <Shield className="text-accent" size={28} />, title: "Garantía Real", desc: "Hasta 3 años de garantía en estructura. Respaldamos la calidad de nuestro trabajo." },
  { icon: <Wrench className="text-accent" size={28} />, title: "Armado Incluido", desc: "Nuestro equipo arma e instala tus muebles sin costo adicional." },
  { icon: <Award className="text-accent" size={28} />, title: "Personalización", desc: "Adaptamos medidas, colores y materiales a tus necesidades y espacio." },
  { icon: <Star className="text-accent" size={28} />, title: "+10 Años de Experiencia", desc: "Una década fabricando muebles de calidad para hogares ecuatorianos." },
];

const testimonials = [
  { name: "María González", city: "Quito", text: "Excelente calidad y atención. El juego de sala superó mis expectativas. 100% recomendado.", rating: 5 },
  { name: "Carlos Espinoza", city: "Guayaquil", text: "Compré el closet y quedó perfecto. La entrega fue puntual y el armado impecable.", rating: 5 },
  { name: "Ana Morales", city: "Cuenca", text: "Los muebles de mi oficina son exactamente lo que necesitaba. Muy buena calidad.", rating: 5 },
];

export default async function Home() {
  const [featured, categories] = await Promise.all([getFeaturedProducts(), getCategories()]);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-accent text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse-slow" />
            Fabricación propia · Ecuador
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight mb-6">
            Muebles que
            <span className="text-accent block">transforman espacios</span>
          </h1>
          <p className="text-text-muted text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Diseño exclusivo, materiales premium y fabricación propia para tu hogar u oficina en Ecuador.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogo" className="btn-primary text-lg px-8 py-4">
              Ver Catálogo <ArrowRight size={20} />
            </Link>
            <Link href="/contacto" className="btn-secondary text-lg px-8 py-4">
              Solicitar Cotización
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
            {[["500+", "Proyectos"], ["10+", "Años"], ["100%", "Garantizado"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-black text-accent">{n}</div>
                <div className="text-text-muted text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-text-muted/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-accent rounded-full" />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="section-title">Explora por Categoría</h2>
          <div className="accent-line mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogo?categoria=${cat.slug}`}
              className="glass-card-hover flex flex-col items-center gap-3 p-6 text-center group"
            >
              <span className="text-4xl">{categoryIcons[cat.slug] || "📦"}</span>
              <span className="text-sm font-medium text-text-light group-hover:text-accent transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">Productos Destacados</h2>
              <div className="accent-line mt-4" />
            </div>
            <Link href="/catalogo" className="btn-ghost hidden md:flex">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p as unknown as import("@/types").ProductType} />
            ))}
          </div>
          <div className="text-center mt-10 md:hidden">
            <Link href="/catalogo" className="btn-secondary">Ver todos los productos</Link>
          </div>
        </section>
      )}

      {/* WHY US */}
      <section className="bg-card border-y border-card-border py-20 mt-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">¿Por qué elegir MYD Muebles?</h2>
            <p className="section-subtitle mx-auto text-center">Calidad, compromiso y años de experiencia fabricando muebles en Ecuador.</p>
            <div className="accent-line mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="glass-card p-6 flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <div className="accent-line mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-accent-gold fill-accent-gold" />
                ))}
              </div>
              <p className="text-text-light text-sm leading-relaxed mb-5 italic">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">{t.name[0]}</div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-text-muted text-xs">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="mx-4 md:mx-8 mb-10 rounded-2xl overflow-hidden relative">
        <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/20 rounded-2xl p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">¿Tienes un proyecto en mente?</h2>
            <p className="text-text-muted text-lg mb-8 max-w-xl mx-auto">Cotización gratis. Nos adaptamos a tus medidas, materiales y presupuesto.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto" className="btn-primary text-lg px-8 py-4">Solicitar cotización <ArrowRight size={20} /></Link>
              <a href="https://wa.me/593991234567" target="_blank" rel="noreferrer" className="btn-secondary text-lg px-8 py-4">WhatsApp directo</a>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Shield size={20} />, text: "Garantía hasta 3 años" },
            { icon: <Truck size={20} />, text: "Entrega a domicilio" },
            { icon: <CheckCircle size={20} />, text: "Materiales certificados" },
            { icon: <Wrench size={20} />, text: "Armado incluido" },
          ].map((item) => (
            <div key={item.text} className="glass-card flex items-center gap-3 p-4 text-sm">
              <span className="text-accent shrink-0">{item.icon}</span>
              <span className="text-text-light font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
