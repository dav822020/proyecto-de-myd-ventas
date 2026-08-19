import { Metadata } from "next";
import { Truck, Wrench, Palette, Shield, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Servicios", description: "Servicios de MYD Muebles: entrega, armado, personalización y garantía." };

const services = [
  { icon: <Truck size={32} className="text-accent" />, title: "Entrega a Domicilio", desc: "Entregamos en toda la ciudad y el país. Nuestro equipo se encarga del transporte cuidadoso de tus muebles.", details: ["Cobertura nacional", "Embalaje especializado", "Seguimiento en tiempo real", "Coordinas la fecha y hora", "Sin costo adicional en la ciudad"] },
  { icon: <Wrench size={32} className="text-accent" />, title: "Armado e Instalación", desc: "Nuestros técnicos van a tu hogar u oficina y arman cada mueble correctamente, dejando todo listo para usar.", details: ["Equipo certificado", "Incluido en la compra", "Mínimo tiempo de intervención", "Revisión final de calidad", "Hasta el cuarto o piso que necesites"] },
  { icon: <Palette size={32} className="text-accent" />, title: "Personalización", desc: "¿No encuentras exactamente lo que buscas? Diseñamos y fabricamos muebles a medida según tus requerimientos.", details: ["Medidas personalizadas", "Elección de materiales", "Colores y acabados a gusto", "Diseño asistido", "Presupuesto sin compromiso"] },
  { icon: <Shield size={32} className="text-accent" />, title: "Garantía de Calidad", desc: "Todos nuestros productos cuentan con garantía de fábrica. Respaldamos la calidad con hechos.", details: ["Hasta 3 años en estructura", "1 año en tapizados", "Asistencia técnica post-venta", "Reposición de piezas", "Atención al cliente dedicada"] },
];

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Nuestros <span className="text-accent">Servicios</span></h1>
        <div className="accent-line mx-auto mb-6" />
        <p className="text-text-muted text-lg max-w-2xl mx-auto">Más que muebles, ofrecemos una experiencia completa: desde el diseño hasta la instalación en tu espacio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {services.map((s) => (
          <div key={s.title} className="glass-card p-8">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">{s.icon}</div>
            <h2 className="text-xl font-bold mb-3">{s.title}</h2>
            <p className="text-text-muted mb-5 leading-relaxed">{s.desc}</p>
            <ul className="space-y-2">
              {s.details.map((d) => (
                <li key={d} className="flex items-center gap-2 text-sm text-text-light">
                  <span className="text-accent">✓</span> {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 md:p-12 text-center bg-accent/5 border-accent/20">
        <Phone size={32} className="text-accent mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">¿Necesitas un servicio personalizado?</h2>
        <p className="text-text-muted mb-6 max-w-xl mx-auto">Contáctanos y te asesoramos sin compromiso. Tenemos soluciones para proyectos de cualquier tamaño.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contacto" className="btn-primary">Solicitar información <ArrowRight size={16} /></Link>
          <a href="https://wa.me/593991234567" target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
