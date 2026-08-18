"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "¿Fabrican muebles a medida?", a: "Sí, fabricamos muebles completamente personalizados. Puedes elegir medidas, materiales, colores y acabados. Contáctanos para recibir una cotización sin compromiso." },
  { q: "¿Cuánto tiempo demora la entrega?", a: "Los productos en stock se entregan en 3–7 días hábiles. Los muebles personalizados o fabricados a pedido tienen un plazo de 15–30 días hábiles dependiendo del proyecto." },
  { q: "¿El armado está incluido?", a: "Sí, el armado e instalación está incluido en todos nuestros productos. Nuestro equipo técnico va a tu domicilio a instalar los muebles correctamente." },
  { q: "¿Cuál es la garantía de los productos?", a: "Ofrecemos garantía de hasta 3 años en estructura de madera, 1 año en tapizados y herrajes. Cualquier defecto de fabricación es cubierto sin costo adicional." },
  { q: "¿Hacen entregas fuera de Quito?", a: "Sí, realizamos entregas a nivel nacional. El costo de envío varía según la distancia y el volumen del pedido. Contáctanos para calcular el costo de envío a tu ciudad." },
  { q: "¿Puedo ver los muebles antes de comprar?", a: "Contamos con showroom en Quito donde puedes ver nuestros modelos en físico. También puedes contactarnos para agendar una visita o solicitar más fotos y videos del producto." },
  { q: "¿Aceptan pagos en cuotas?", a: "Sí, trabajamos con varias opciones de financiamiento. Aceptamos tarjetas de crédito en cuotas y tenemos convenios con cooperativas de ahorro." },
  { q: "¿Los materiales son de calidad?", a: "Utilizamos exclusivamente materiales certificados: maderas tratadas y secadas, herrajes importados, tapizados premium y lacas profesionales. Todo bajo estricto control de calidad." },
  { q: "¿Puedo devolver un producto?", a: "Aceptamos devoluciones de productos en stock dentro de los 7 días de recibido, siempre que esté en perfectas condiciones. Los muebles personalizados no tienen devolución." },
  { q: "¿Cómo solicito una cotización?", a: "Puedes solicitar una cotización directamente desde nuestra web en el formulario de contacto, por WhatsApp al +593 99 123 4567, o visitando nuestro showroom." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-black mb-4">Preguntas <span className="text-accent">Frecuentes</span></h1>
        <div className="accent-line mx-auto mb-4" />
        <p className="text-text-muted">Respuestas a las preguntas más comunes sobre nuestros productos y servicios.</p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className={`glass-card overflow-hidden transition-all ${open === i ? "border-accent/30" : ""}`}>
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left gap-4">
              <span className="font-semibold text-foreground">{faq.q}</span>
              <ChevronDown size={18} className={`text-accent shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-text-light leading-relaxed border-t border-card-border pt-4">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
