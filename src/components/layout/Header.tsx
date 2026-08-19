"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Heart, Search, Menu, X, Phone } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useFavoritesStore } from "@/store/favorites";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<{ id: number; name: string; slug: string }[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCartStore((s) => s.count());
  const favIds = useFavoritesStore((s) => s.ids);
  const loadFavs = useFavoritesStore((s) => s.load);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadFavs();
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadFavs]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (search.trim().length < 2) { setSuggestions([]); return; }
      const res = await fetch(`/api/products?q=${encodeURIComponent(search)}&limit=5`);
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.products || []);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-card-border" : "bg-transparent"}`}>
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-accent/10 text-xs text-text-muted border-b border-accent/10">
        <span className="flex items-center gap-1"><Phone size={11} /> +593 99 123 4567</span>
        <span>Fabricación propia · Entrega a domicilio · Garantía real</span>
        <span>Lun–Vie 9:00–18:00 | Sáb 9:00–14:00</span>
      </div>

      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-black font-black text-sm group-hover:shadow-accent-glow-sm transition-all">MYD</div>
          <span className="font-bold text-lg text-foreground hidden sm:block">
            MYD <span className="text-accent">Muebles</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div ref={searchRef} className="relative">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg text-text-muted hover:text-accent transition-colors">
              <Search size={20} />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-12 w-72 glass-card p-3 shadow-card-shadow">
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar productos..."
                  className="input-field text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && search.trim()) {
                      window.location.href = `/catalogo?q=${encodeURIComponent(search)}`;
                    }
                  }}
                />
                {suggestions.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {suggestions.map((s) => (
                      <li key={s.id}>
                        <Link
                          href={`/producto/${s.slug}`}
                          className="block px-3 py-2 text-sm text-text-light hover:text-accent hover:bg-white/5 rounded transition-colors"
                          onClick={() => { setSearchOpen(false); setSearch(""); }}
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Favorites */}
          <Link href="/catalogo?favoritos=1" className="relative p-2 rounded-lg text-text-muted hover:text-accent transition-colors">
            <Heart size={20} />
            {favIds.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-black text-[10px] font-bold rounded-full flex items-center justify-center">{favIds.length}</span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/carrito" className="relative p-2 rounded-lg text-text-muted hover:text-accent transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-black text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </Link>

          {/* Mobile menu */}
          <button className="md:hidden p-2 text-text-muted hover:text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-card mx-4 mb-4 p-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link py-3 px-3 rounded-lg hover:bg-white/5" onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-card-border text-sm text-text-muted">
            <div className="flex items-center gap-2"><Phone size={13} /> +593 99 123 4567</div>
          </div>
        </div>
      )}
    </header>
  );
}
