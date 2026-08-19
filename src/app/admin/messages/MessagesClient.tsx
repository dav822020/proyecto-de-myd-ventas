"use client";
import { useState } from "react";

interface Msg { id: number; name: string; email: string; phone?: string|null; subject?: string|null; body: string; status: string; createdAt: string; }

export default function MessagesClient({ messages: init }: { messages: Msg[] }) {
  const [msgs, setMsgs] = useState(init);
  const [selected, setSelected] = useState<Msg|null>(null);

  const markRead = async (id: number) => {
    await fetch(`/api/messages/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "leido" }) });
    setMsgs(msgs.map(m => m.id===id ? {...m, status:"leido"} : m));
    if (selected?.id===id) setSelected({...selected, status:"leido"});
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mensajes de contacto</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card divide-y divide-card-border">
          {msgs.map(m => (
            <button key={m.id} onClick={()=>{setSelected(m); if(m.status==="no_leido") markRead(m.id);}} className={`w-full text-left px-4 py-3 hover:bg-white/2 transition-colors ${selected?.id===m.id?"bg-accent/5":""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{m.name}</span>
                <span className={`badge text-[10px] ${m.status==="no_leido"?"badge-accent":"bg-text-muted/20 text-text-muted"}`}>{m.status==="no_leido"?"Nuevo":"Leído"}</span>
              </div>
              <p className="text-text-muted text-xs truncate">{m.subject||m.body.slice(0,50)}</p>
              <p className="text-text-muted text-xs mt-1">{new Date(m.createdAt).toLocaleDateString("es-EC")}</p>
            </button>
          ))}
          {msgs.length===0&&<p className="p-6 text-text-muted text-sm text-center">No hay mensajes aún.</p>}
        </div>
        {selected && (
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">{selected.subject||"Sin asunto"}</h3>
            <div className="space-y-3 text-sm mb-5">
              <div><p className="text-text-muted text-xs">De</p><p className="font-medium">{selected.name} — <a href={`mailto:${selected.email}`} className="text-accent">{selected.email}</a></p></div>
              {selected.phone&&<div><p className="text-text-muted text-xs">Teléfono</p><p>{selected.phone}</p></div>}
              <div><p className="text-text-muted text-xs">Fecha</p><p>{new Date(selected.createdAt).toLocaleString("es-EC")}</p></div>
            </div>
            <div className="bg-card-border/30 rounded-lg p-4 text-sm text-text-light leading-relaxed whitespace-pre-wrap">{selected.body}</div>
            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject||"Tu mensaje"}`} className="btn-primary mt-4 inline-flex">Responder por correo</a>
          </div>
        )}
      </div>
    </div>
  );
}
