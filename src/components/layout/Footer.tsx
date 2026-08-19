import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes" },
  { href: "/contacto", label: "Contacto" },
  { href: "/terminos", label: "Términos y Condiciones" },
];

const categories = [
  { href: "/catalogo?categoria=salas", label: "Salas" },
  { href: "/catalogo?categoria=comedores", label: "Comedores" },
  { href: "/catalogo?categoria=dormitorios", label: "Dormitorios" },
  { href: "/catalogo?categoria=oficina", label: "Oficina" },
  { href: "/catalogo?categoria=exteriores", label: "Exteriores" },
  { href: "/catalogo?categoria=decoracion", label: "Decoración" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-black font-black text-sm">MYD</div>
              <span className="font-bold text-lg">MYD <span className="text-accent">Muebles</span></span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-5">
              Fabricación propia de muebles de alta calidad en Ecuador. Más de 10 años transformando hogares con diseño y durabilidad.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com/mydmuebles" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-card-border hover:bg-accent hover:text-black flex items-center justify-center text-text-muted transition-all text-xs font-bold">f</a>
              <a href="https://instagram.com/mydmuebles" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-card-border hover:bg-accent hover:text-black flex items-center justify-center text-text-muted transition-all text-xs font-bold">in</a>
              <a href="https://tiktok.com/@mydmuebles" target="_blank" rel="noreferrer" aria-label="TikTok" className="w-9 h-9 rounded-lg bg-card-border hover:bg-accent hover:text-black flex items-center justify-center text-text-muted transition-all text-xs font-bold">TT</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Navegación</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-text-muted text-sm hover:text-accent transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Categorías</h4>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.href}><Link href={c.href} className="text-text-muted text-sm hover:text-accent transition-colors">{c.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Phone size={14} className="mt-0.5 shrink-0 text-accent" />
                <a href="tel:+593991234567" className="hover:text-accent transition-colors">+593 99 123 4567</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Mail size={14} className="mt-0.5 shrink-0 text-accent" />
                <a href="mailto:info@mydmuebles.com" className="hover:text-accent transition-colors">info@mydmuebles.com</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
                <span>Av. Principal 123, Quito, Ecuador</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <Clock size={14} className="mt-0.5 shrink-0 text-accent" />
                <span>Lun–Vie: 9:00–18:00<br />Sáb: 9:00–14:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-card-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} MYD Muebles. Todos los derechos reservados.</p>
          <p>Fabricación propia · Quito, Ecuador · RUC: 1234567890001</p>
        </div>
      </div>
    </footer>
  );
}
