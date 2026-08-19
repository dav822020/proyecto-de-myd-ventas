"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Category { id: number; name: string; slug: string; icon?: string; order: number; }

export default function AdminCategoriesPage() {
  const [cats, setCats] = useState<Category[]>([]);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<Partial<Category>>({});

  const load = async () => { const data = await fetch("/api/categories").then(r => r.json()); setCats(data); };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (modal === "create") await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, slug: form.name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-"), order: form.order || 0 }) });
    else await fetch(`/api/categories/${form.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setModal(null); load();
  };
  const del = async (id: number) => { if (!confirm("¿Eliminar categoría?")) return; await fetch(`/api/categories/${id}`, { method: "DELETE" }); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <button onClick={() => { setForm({}); setModal("create"); }} className="btn-primary"><Plus size={16} /> Nueva categoría</button>
      </div>
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-card-border text-xs text-text-muted"><tr>
            <th className="text-left px-4 py-3">Nombre</th>
            <th className="text-left px-4 py-3">Slug</th>
            <th className="text-center px-4 py-3">Icono</th>
            <th className="text-center px-4 py-3">Orden</th>
            <th className="text-center px-4 py-3">Acciones</th>
          </tr></thead>
          <tbody className="divide-y divide-card-border">
            {cats.map(c => (
              <tr key={c.id} className="hover:bg-white/2">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-text-muted text-sm">{c.slug}</td>
                <td className="px-4 py-3 text-center text-xl">{c.icon}</td>
                <td className="px-4 py-3 text-center text-sm">{c.order}</td>
                <td className="px-4 py-3"><div className="flex justify-center gap-2">
                  <button onClick={() => { setForm(c); setModal("edit"); }} className="p-1.5 rounded hover:bg-accent/10 text-text-muted hover:text-accent transition-colors"><Pencil size={15} /></button>
                  <button onClick={() => del(c.id)} className="p-1.5 rounded hover:bg-danger/10 text-text-muted hover:text-danger transition-colors"><Trash2 size={15} /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5"><h2 className="font-bold">{modal === "create" ? "Nueva categoría" : "Editar categoría"}</h2><button onClick={() => setModal(null)}><X size={18} /></button></div>
            <div className="space-y-3">
              <div><label className="text-xs text-text-muted mb-1 block">Nombre</label><input value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} className="input-field" /></div>
              <div><label className="text-xs text-text-muted mb-1 block">Icono (emoji)</label><input value={form.icon||""} onChange={e=>setForm({...form,icon:e.target.value})} className="input-field" placeholder="🛋️" /></div>
              <div><label className="text-xs text-text-muted mb-1 block">Orden</label><input type="number" value={form.order||0} onChange={e=>setForm({...form,order:parseInt(e.target.value)})} className="input-field" /></div>
            </div>
            <div className="flex gap-3 mt-5"><button onClick={()=>setModal(null)} className="btn-ghost flex-1 justify-center">Cancelar</button><button onClick={save} className="btn-primary flex-1 justify-center">Guardar</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
