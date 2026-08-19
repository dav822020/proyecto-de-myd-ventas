"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { ProductType, CategoryType } from "@/types";

interface Props {
  products: ProductType[];
  categories: CategoryType[];
}

const SORT_OPTIONS = [
  { value: "new", label: "Más recientes" },
  { value: "price_asc", label: "Precio: menor a mayor" },
  { value: "price_desc", label: "Precio: mayor a menor" },
  { value: "name", label: "Nombre A–Z" },
];

export default function CatalogClient({ products, categories }: Props) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("categoria") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("new");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setCategoryFilter(searchParams.get("categoria") || "");
    setSearch(searchParams.get("q") || "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase()));
    if (categoryFilter) list = list.filter((p) => p.category?.slug === categoryFilter);
    if (minPrice) list = list.filter((p) => p.price >= parseFloat(minPrice));
    if (maxPrice) list = list.filter((p) => p.price <= parseFloat(maxPrice));
    switch (sort) {
      case "price_asc": list.sort((a, b) => a.price - b.price); break;
      case "price_desc": list.sort((a, b) => b.price - a.price); break;
      case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return list;
  }, [products, search, categoryFilter, minPrice, maxPrice, sort]);

  const clearFilters = () => {
    setSearch(""); setCategoryFilter(""); setMinPrice(""); setMaxPrice(""); setSort("new");
  };

  const hasFilters = search || categoryFilter || minPrice || maxPrice;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Catálogo de Muebles</h1>
        <p className="text-text-muted">{filtered.length} productos encontrados</p>
      </div>

      {/* Search + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="input-field pl-9"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input-field sm:w-52"
        >
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-secondary gap-2 ${showFilters ? "border-accent text-accent" : ""}`}
        >
          <SlidersHorizontal size={16} /> Filtros
          {hasFilters && <span className="w-2 h-2 bg-accent rounded-full" />}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="glass-card p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-text-muted text-xs mb-1 block">Categoría</label>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="input-field text-sm">
              <option value="">Todas</option>
              {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-text-muted text-xs mb-1 block">Precio mínimo ($)</label>
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" className="input-field text-sm" />
          </div>
          <div>
            <label className="text-text-muted text-xs mb-1 block">Precio máximo ($)</label>
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="9999" className="input-field text-sm" />
          </div>
          <div className="flex items-end">
            {hasFilters && (
              <button onClick={clearFilters} className="btn-ghost w-full justify-center text-sm">
                <X size={14} /> Limpiar filtros
              </button>
            )}
          </div>
        </div>
      )}

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setCategoryFilter("")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!categoryFilter ? "bg-accent text-black" : "bg-card border border-card-border text-text-muted hover:border-accent hover:text-accent"}`}
        >
          Todos
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategoryFilter(categoryFilter === c.slug ? "" : c.slug)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${categoryFilter === c.slug ? "bg-accent text-black" : "bg-card border border-card-border text-text-muted hover:border-accent hover:text-accent"}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-6xl mb-4">🔍</p>
          <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
          <p className="text-text-muted mb-6">Intenta con otros filtros o términos de búsqueda.</p>
          <button onClick={clearFilters} className="btn-primary">Limpiar filtros</button>
        </div>
      )}
    </div>
  );
}
