"use client";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: "company_name", label: "Nombre de la empresa" },
  { key: "phone", label: "Teléfono" },
  { key: "whatsapp", label: "WhatsApp (solo números, con código de país)" },
  { key: "email", label: "Correo electrónico" },
  { key: "address", label: "Dirección" },
  { key: "schedule", label: "Horario de atención" },
  { key: "facebook", label: "Facebook (URL)" },
  { key: "instagram", label: "Instagram (URL)" },
  { key: "tiktok", label: "TikTok (URL)" },
  { key: "hero_title", label: "Título principal (hero)" },
  { key: "hero_subtitle", label: "Subtítulo principal" },
  { key: "company_description", label: "Descripción de la empresa", multiline: true },
];

export default function SettingsPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/site-config").then(r => r.json()).then(setConfig);
  }, []);

  const save = async () => {
    setLoading(true); setSaved(false);
    await fetch("/api/site-config", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(config) });
    setSaved(true); setLoading(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Configuración general</h1>
        <button onClick={save} disabled={loading} className="btn-primary">
          <Save size={16} /> {saved ? "Guardado ✓" : loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
      <div className="glass-card p-6 space-y-5">
        {FIELDS.map(f => (
          <div key={f.key}>
            <label className="text-text-muted text-xs mb-1 block">{f.label}</label>
            {f.multiline ? (
              <textarea rows={3} value={config[f.key] || ""} onChange={e => setConfig({ ...config, [f.key]: e.target.value })} className="input-field resize-none" />
            ) : (
              <input value={config[f.key] || ""} onChange={e => setConfig({ ...config, [f.key]: e.target.value })} className="input-field" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
