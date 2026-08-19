"use client";
import { useState } from "react";

interface Quote { id: number; customerName: string; email: string; phone?: string|null; productName?: string|null; details?: string|null; status: string; createdAt: string; }

export default function QuotesClient({ quotes: init }: { quotes: Quote[] }) {
  const [quotes, setQuotes] = useState(init);

  const changeStatus = async (id: number, status: string) => {
    await fetch(`/api/quotes/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setQuotes(quotes.map(q => q.id === id ? { ...q, status } : q));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cotizaciones</h1>
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-card-border text-xs text-text-muted"><tr>
            <th className="text-left px-4 py-3">Cliente</th>
            <th className="text-left px-4 py-3">Producto</th>
            <th className="text-left px-4 py-3">Detalles</th>
            <th className="text-center px-4 py-3">Estado</th>
            <th className="text-center px-4 py-3">Fecha</th>
          </tr></thead>
          <tbody className="divide-y divide-card-border">
            {quotes.map(q => (
              <tr key={q.id} className="hover:bg-white/2">
                <td className="px-4 py-3"><p className="font-medium text-sm">{q.customerName}</p><p className="text-text-muted text-xs">{q.email}</p>{q.phone&&<p className="text-text-muted text-xs">{q.phone}</p>}</td>
                <td className="px-4 py-3 text-sm text-text-light">{q.productName||"—"}</td>
                <td className="px-4 py-3 text-sm text-text-muted max-w-xs truncate">{q.details||"—"}</td>
                <td className="px-4 py-3 text-center">
                  <select value={q.status} onChange={e=>changeStatus(q.id,e.target.value)} className="text-xs bg-transparent border border-card-border rounded px-2 py-1">
                    {["pendiente","en_proceso","atendido","cancelado"].map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-center text-xs text-text-muted">{new Date(q.createdAt).toLocaleDateString("es-EC")}</td>
              </tr>
            ))}
            {quotes.length===0&&<tr><td colSpan={5} className="text-center py-10 text-text-muted">No hay cotizaciones aún.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
