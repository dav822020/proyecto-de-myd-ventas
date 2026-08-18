"use client";
import { useState } from "react";

interface Order { id: number; customerName: string; email: string; phone?: string|null; total: number; status: string; items: string; notes?: string|null; createdAt: string; }

export default function OrdersClient({ orders: init }: { orders: Order[] }) {
  const [orders, setOrders] = useState(init);
  const [selected, setSelected] = useState<Order | null>(null);

  const changeStatus = async (id: number, status: string) => {
    await fetch(`/api/orders/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pedidos y Cotizaciones</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-card-border text-xs text-text-muted"><tr>
              <th className="text-left px-4 py-3">Cliente</th>
              <th className="text-right px-4 py-3">Total</th>
              <th className="text-center px-4 py-3">Estado</th>
              <th className="text-center px-4 py-3">Fecha</th>
            </tr></thead>
            <tbody className="divide-y divide-card-border">
              {orders.map(o => (
                <tr key={o.id} onClick={() => setSelected(o)} className={`cursor-pointer hover:bg-white/2 transition-colors ${selected?.id === o.id ? "bg-accent/5" : ""}`}>
                  <td className="px-4 py-3"><p className="font-medium text-sm">{o.customerName}</p><p className="text-text-muted text-xs">{o.email}</p></td>
                  <td className="px-4 py-3 text-right font-semibold text-accent text-sm">${o.total.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`badge ${o.status === "pendiente" ? "badge-warning" : o.status === "atendido" ? "badge-success" : "badge-accent"}`}>{o.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-text-muted">{new Date(o.createdAt).toLocaleDateString("es-EC")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
          <div className="glass-card p-5">
            <h3 className="font-bold mb-4">Detalle del pedido #{selected.id}</h3>
            <div className="space-y-3 text-sm">
              <div><p className="text-text-muted text-xs">Cliente</p><p className="font-medium">{selected.customerName}</p></div>
              <div><p className="text-text-muted text-xs">Correo</p><p>{selected.email}</p></div>
              {selected.phone && <div><p className="text-text-muted text-xs">Teléfono</p><p>{selected.phone}</p></div>}
              <div><p className="text-text-muted text-xs">Total</p><p className="font-bold text-accent">${selected.total.toFixed(2)}</p></div>
              <div><p className="text-text-muted text-xs mb-1">Estado</p>
                <select value={selected.status} onChange={e => changeStatus(selected.id, e.target.value)} className="input-field text-sm">
                  {["pendiente","en_proceso","atendido","cancelado"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div><p className="text-text-muted text-xs">Productos</p>
                <div className="bg-card-border/30 rounded p-2 mt-1">
                  {(JSON.parse(selected.items || "[]") as { name: string; qty: number; price: number }[]).map((item, i) => (
                    <div key={i} className="flex justify-between text-xs py-1">{item.name} ×{item.qty}<span>${(item.price * item.qty).toFixed(2)}</span></div>
                  ))}
                </div>
              </div>
              {selected.notes && <div><p className="text-text-muted text-xs">Notas</p><p className="text-sm">{selected.notes}</p></div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
