"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, ToggleLeft, ToggleRight, Upload, X } from "lucide-react";

interface Category { id: number; name: string; slug: string; }
interface Product { id: number; name: string; slug: string; price: number; stock: number; active: boolean; featured: boolean; categoryId: number; category?: Category; images: string; description?: string; material?: string; finish?: string; color?: string; width?: number; height?: number; depth?: number; weight?: number; warranty?: string; careInstructions?: string; tags: string; comparePrice?: number; }

const EMPTY: Partial<Product> = { name: "", price: 0, comparePrice: undefined, categoryId: 0, description: "", material: "", finish: "", color: "", width: undefined, height: undefined, depth: undefined, weight: undefined, warranty: "", careInstructions: "", active: true, featured: false, stock: 1 };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<Partial<Product>>(EMPTY);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const [p, c] = await Promise.all([fetch("/api/products?limit=200").then(r => r.json()), fetch("/api/categories").then(r => r.json())]);
    setProducts(p.products || []); setCategories(c);
  };

  useEffect(() => { load(); }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => { setForm(EMPTY); setImages([]); setModal("create"); };
  const openEdit = (p: Product) => { setForm(p); setImages(JSON.parse(p.images || "[]")); setModal("edit"); };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) setImages(prev => [...prev, data.url]);
    }
    setUploading(false);
  };

  const save = async () => {
    const payload = { ...form, images: JSON.stringify(images), tags: JSON.stringify([]) };
    if (modal === "create") {
      await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch(`/api/products/${form.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setModal(null); load();
  };

  const del = async (id: number) => {
    if (!confirm("¿Eliminar este producto?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  };

  const toggle = async (p: Product) => {
    await fetch(`/api/products/${p.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: !p.active }) });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="text-text-muted text-sm">{products.length} productos</p>
        </div>
        <button onClick={openCreate} className="btn-primary"><Plus size={16} /> Nuevo producto</button>
      </div>

      <div className="glass-card p-4 mb-5">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar productos..." className="input-field pl-9 text-sm" />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-card-border text-xs text-text-muted">
              <tr>
                <th className="text-left px-4 py-3">Producto</th>
                <th className="text-left px-4 py-3">Categoría</th>
                <th className="text-right px-4 py-3">Precio</th>
                <th className="text-center px-4 py-3">Stock</th>
                <th className="text-center px-4 py-3">Estado</th>
                <th className="text-center px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {filtered.map(p => {
                const imgs = JSON.parse(p.images || "[]");
                return (
                  <tr key={p.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-card-border shrink-0">
                          {imgs[0] && <Image src={imgs[0]} alt="" fill className="object-cover" sizes="40px" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{p.name}</p>
                          {p.featured && <span className="badge-accent text-[10px]">Destacado</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-muted">{p.category?.name || "—"}</td>
                    <td className="px-4 py-3 text-right font-semibold text-accent text-sm">${p.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center text-sm">{p.stock}</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggle(p)} className={p.active ? "text-success" : "text-text-muted"}>
                        {p.active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-accent/10 text-text-muted hover:text-accent transition-colors"><Pencil size={15} /></button>
                        <button onClick={() => del(p.id)} className="p-1.5 rounded hover:bg-danger/10 text-text-muted hover:text-danger transition-colors"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-text-muted">No se encontraron productos.</div>}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="glass-card w-full max-w-2xl my-8 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">{modal === "create" ? "Nuevo producto" : "Editar producto"}</h2>
              <button onClick={() => setModal(null)}><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-text-muted text-xs mb-1 block">Nombre *</label>
                <input required value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Precio ($) *</label>
                <input type="number" step="0.01" value={form.price || ""} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Precio anterior ($)</label>
                <input type="number" step="0.01" value={form.comparePrice || ""} onChange={e => setForm({ ...form, comparePrice: parseFloat(e.target.value) || undefined })} className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Categoría *</label>
                <select value={form.categoryId || ""} onChange={e => setForm({ ...form, categoryId: parseInt(e.target.value) })} className="input-field">
                  <option value="">Seleccionar...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Stock</label>
                <input type="number" value={form.stock ?? 0} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) })} className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-text-muted text-xs mb-1 block">Descripción</label>
                <textarea rows={3} value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} className="input-field resize-none" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Material</label>
                <input value={form.material || ""} onChange={e => setForm({ ...form, material: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Acabado</label>
                <input value={form.finish || ""} onChange={e => setForm({ ...form, finish: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Color</label>
                <input value={form.color || ""} onChange={e => setForm({ ...form, color: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Garantía</label>
                <input value={form.warranty || ""} onChange={e => setForm({ ...form, warranty: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Ancho (cm)</label>
                <input type="number" value={form.width || ""} onChange={e => setForm({ ...form, width: parseFloat(e.target.value) || undefined })} className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Alto (cm)</label>
                <input type="number" value={form.height || ""} onChange={e => setForm({ ...form, height: parseFloat(e.target.value) || undefined })} className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Profundidad (cm)</label>
                <input type="number" value={form.depth || ""} onChange={e => setForm({ ...form, depth: parseFloat(e.target.value) || undefined })} className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Peso (kg)</label>
                <input type="number" value={form.weight || ""} onChange={e => setForm({ ...form, weight: parseFloat(e.target.value) || undefined })} className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-text-muted text-xs mb-1 block">Cuidado y mantenimiento</label>
                <textarea rows={2} value={form.careInstructions || ""} onChange={e => setForm({ ...form, careInstructions: e.target.value })} className="input-field resize-none" />
              </div>
              <div className="sm:col-span-2 flex gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.active ?? true} onChange={e => setForm({ ...form, active: e.target.checked })} className="w-4 h-4 accent-cyan-400" />
                  <span>Activo</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.featured ?? false} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-cyan-400" />
                  <span>Destacado</span>
                </label>
              </div>
              {/* Images */}
              <div className="sm:col-span-2">
                <label className="text-text-muted text-xs mb-2 block">Imágenes</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {images.map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden bg-card-border">
                      <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                      <button onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-danger flex items-center justify-center text-white text-xs">✕</button>
                    </div>
                  ))}
                  <button onClick={() => fileRef.current?.click()} disabled={uploading} className="w-16 h-16 rounded-lg border-2 border-dashed border-card-border hover:border-accent flex items-center justify-center text-text-muted hover:text-accent transition-colors">
                    <Upload size={18} />
                  </button>
                </div>
                <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImage} />
                {uploading && <p className="text-xs text-text-muted">Subiendo imágenes...</p>}
              </div>
            </div>
            <div className="flex gap-3 mt-6 pt-4 border-t border-card-border">
              <button onClick={() => setModal(null)} className="btn-ghost flex-1 justify-center">Cancelar</button>
              <button onClick={save} className="btn-primary flex-1 justify-center">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
