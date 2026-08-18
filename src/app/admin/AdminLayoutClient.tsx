"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Package, Tags, ShoppingBag, MessageSquare, FileText, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/admin/products", label: "Productos", icon: <Package size={18} /> },
  { href: "/admin/categories", label: "Categorías", icon: <Tags size={18} /> },
  { href: "/admin/orders", label: "Pedidos", icon: <ShoppingBag size={18} /> },
  { href: "/admin/quotes", label: "Cotizaciones", icon: <FileText size={18} /> },
  { href: "/admin/messages", label: "Mensajes", icon: <MessageSquare size={18} /> },
  { href: "/admin/settings", label: "Configuración", icon: <Settings size={18} /> },
];

function AdminInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" && !pathname.includes("/admin/login")) {
      router.push("/admin/login");
    }
  }, [status, pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" /></div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-card-border flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-5 border-b border-card-border flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-black font-black text-xs">MYD</div>
            <span className="font-bold">Panel Admin</span>
          </Link>
          <button className="lg:hidden text-text-muted" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${pathname === item.href ? "bg-accent/10 text-accent font-semibold" : "text-text-muted hover:text-foreground hover:bg-white/5"}`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-card-border">
          <div className="text-xs text-text-muted mb-3">{session.user?.email}</div>
          <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="flex items-center gap-2 text-sm text-text-muted hover:text-danger transition-colors w-full">
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-card-border h-14 flex items-center px-5 gap-4">
          <button className="lg:hidden text-text-muted hover:text-foreground" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
          <Link href="/" target="_blank" className="text-xs text-text-muted hover:text-accent transition-colors">← Ver sitio web</Link>
        </header>
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminInner>{children}</AdminInner>
    </SessionProvider>
  );
}
