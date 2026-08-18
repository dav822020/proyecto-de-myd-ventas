"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.ok) router.push("/admin");
    else setError("Credenciales incorrectas");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-black font-black mx-auto mb-4">MYD</div>
          <h1 className="text-xl font-bold">Panel de Administración</h1>
          <p className="text-text-muted text-sm mt-1">MYD Muebles</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-text-muted text-xs mb-1 block">Correo electrónico</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="admin@mydmuebles.com" />
          </div>
          <div>
            <label className="text-text-muted text-xs mb-1 block">Contraseña</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="••••••••" />
          </div>
          {error && <p className="text-danger text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
