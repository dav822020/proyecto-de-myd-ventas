import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, ShoppingBag, MessageSquare, FileText, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [productCount, orderCount, msgCount, quoteCount, pendingOrders, unreadMsgs] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.order.count(),
    prisma.message.count(),
    prisma.quote.count(),
    prisma.order.count({ where: { status: "pendiente" } }),
    prisma.message.count({ where: { status: "no_leido" } }),
  ]);

  const recentOrders = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
  const recentMsgs = await prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 5 });

  const stats = [
    { label: "Productos activos", value: productCount, icon: <Package size={22} />, href: "/admin/products", badge: null },
    { label: "Pedidos totales", value: orderCount, icon: <ShoppingBag size={22} />, href: "/admin/orders", badge: pendingOrders > 0 ? `${pendingOrders} pendientes` : null },
    { label: "Cotizaciones", value: quoteCount, icon: <FileText size={22} />, href: "/admin/quotes", badge: null },
    { label: "Mensajes", value: msgCount, icon: <MessageSquare size={22} />, href: "/admin/messages", badge: unreadMsgs > 0 ? `${unreadMsgs} sin leer` : null },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-text-muted text-sm mt-1">Bienvenido al panel de administración de MYD Muebles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="glass-card p-5 flex items-center gap-4 hover:border-accent/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">{s.icon}</div>
            <div>
              <p className="text-2xl font-black">{s.value}</p>
              <p className="text-text-muted text-xs">{s.label}</p>
              {s.badge && <span className="badge-warning mt-1 inline-block">{s.badge}</span>}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Pedidos recientes</h2>
            <Link href="/admin/orders" className="text-xs text-accent hover:underline flex items-center gap-1">Ver todos <ArrowRight size={12} /></Link>
          </div>
          {recentOrders.length === 0 ? <p className="text-text-muted text-sm">No hay pedidos aún.</p> : (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{o.customerName}</p>
                    <p className="text-text-muted text-xs">{new Date(o.createdAt).toLocaleDateString("es-EC")}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-accent">${o.total.toFixed(2)}</span>
                    <span className={`badge ${o.status === "pendiente" ? "badge-warning" : "badge-success"}`}>{o.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent messages */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Mensajes recientes</h2>
            <Link href="/admin/messages" className="text-xs text-accent hover:underline flex items-center gap-1">Ver todos <ArrowRight size={12} /></Link>
          </div>
          {recentMsgs.length === 0 ? <p className="text-text-muted text-sm">No hay mensajes aún.</p> : (
            <div className="space-y-3">
              {recentMsgs.map((m) => (
                <div key={m.id} className="flex items-center justify-between text-sm">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{m.name}</p>
                    <p className="text-text-muted text-xs truncate">{m.subject || m.body.slice(0, 40)}</p>
                  </div>
                  <span className={`badge ml-2 shrink-0 ${m.status === "no_leido" ? "badge-accent" : "bg-text-muted/20 text-text-muted"}`}>
                    {m.status === "no_leido" ? "Nuevo" : "Leído"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
