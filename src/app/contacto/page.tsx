"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", body: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) setSent(true);
      else setError("Error al enviar. Intenta nuevamente.");
    } catch { setError("Error de conexión."); }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Contáctanos</h1>
        <div className="accent-line mx-auto mb-4" />
        <p className="text-text-muted text-lg max-w-xl mx-auto">Estamos para ayudarte. Escríbenos, llámanos o visítanos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold mb-6">Envíanos un mensaje</h2>
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <p className="font-semibold text-xl mb-2">¡Mensaje enviado!</p>
              <p className="text-text-muted">Nos pondremos en contacto contigo pronto.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", body: "" }); }} className="btn-primary mt-6">Enviar otro mensaje</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-text-muted text-xs mb-1 block">Nombre *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre" className="input-field" />
                </div>
                <div>
                  <label className="text-text-muted text-xs mb-1 block">Teléfono</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+593..." className="input-field" />
                </div>
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Correo electrónico *</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tucorreo@email.com" className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Asunto</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="¿En qué te podemos ayudar?" className="input-field" />
              </div>
              <div>
                <label className="text-text-muted text-xs mb-1 block">Mensaje *</label>
                <textarea required rows={5} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Escribe tu mensaje aquí..." className="input-field resize-none" />
              </div>
              {error && <p className="text-danger text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                <Send size={16} /> {loading ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          )}
        </div>

        {/* Info + Map */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-5">Información de contacto</h2>
            <div className="space-y-4">
              <a href="tel:+593991234567" className="flex items-center gap-3 text-text-light hover:text-accent transition-colors">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><Phone size={16} className="text-accent" /></div>
                <div><p className="text-xs text-text-muted">Teléfono / WhatsApp</p><p className="font-medium">+593 99 123 4567</p></div>
              </a>
              <a href="mailto:info@mydmuebles.com" className="flex items-center gap-3 text-text-light hover:text-accent transition-colors">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><Mail size={16} className="text-accent" /></div>
                <div><p className="text-xs text-text-muted">Correo electrónico</p><p className="font-medium">info@mydmuebles.com</p></div>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><MapPin size={16} className="text-accent" /></div>
                <div><p className="text-xs text-text-muted">Dirección</p><p className="font-medium">Av. Principal 123, Quito, Ecuador</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><Clock size={16} className="text-accent" /></div>
                <div><p className="text-xs text-text-muted">Horario de atención</p><p className="font-medium">Lun–Vie: 9:00–18:00 | Sáb: 9:00–14:00</p></div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="glass-card p-2 overflow-hidden rounded-xl flex-1 min-h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15960.23!2d-78.5245!3d-0.2295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sQuito!5e0!3m2!1ses!2sec!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "250px", borderRadius: "10px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación MYD Muebles"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
