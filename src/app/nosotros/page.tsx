import { Metadata } from "next";
import { Award, Users, Wrench, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce la historia, misión y equipo de MYD Muebles. Fabricación propia de muebles en Ecuador.",
};

const values = [
  { icon: <Award className="text-accent" size={24} />, title: "Calidad", desc: "Materiales premium seleccionados para garantizar durabilidad y estética." },
  { icon: <Wrench className="text-accent" size={24} />, title: "Artesanía", desc: "Cada mueble es fabricado con precisión artesanal en nuestro taller propio." },
  { icon: <Users className="text-accent" size={24} />, title: "Compromiso", desc: "Acompañamos a nuestros clientes desde el diseño hasta la entrega." },
  { icon: <Star className="text-accent" size={24} />, title: "Innovación", desc: "Incorporamos tendencias de diseño global adaptadas al gusto ecuatoriano." },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          Sobre <span className="text-accent">MYD Muebles</span>
        </h1>
        <div className="accent-line mx-auto mb-6" />
        <p className="text-text-muted text-xl max-w-3xl mx-auto leading-relaxed">
          Somos una empresa ecuatoriana fundada con la pasión de transformar hogares y espacios de trabajo con muebles de alta calidad, diseño exclusivo y fabricación propia.
        </p>
      </div>

      {/* Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">Nuestra historia</h2>
          <div className="space-y-4 text-text-light leading-relaxed">
            <p>MYD Muebles nació hace más de 10 años con un taller pequeño y un sueño grande: fabricar muebles que combinen funcionalidad, durabilidad y estética a un precio justo.</p>
            <p>Con el tiempo, crecimos incorporando maquinaria moderna, ampliando nuestro equipo de carpinteros y diseñadores, y extendiendo nuestra cobertura a todo el Ecuador.</p>
            <p>Hoy somos una empresa sólida, orgullosa de cada pieza que fabricamos, cada cliente satisfecho y cada espacio transformado.</p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-8">
            {[["10+", "Años"], ["500+", "Proyectos"], ["100%", "Ecuatoriano"]].map(([n, l]) => (
              <div key={l} className="text-center glass-card p-4">
                <div className="text-2xl font-black text-accent">{n}</div>
                <div className="text-text-muted text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-8 flex flex-col gap-4">
          <h3 className="text-xl font-bold text-foreground mb-2">Fabricación propia</h3>
          <p className="text-text-muted leading-relaxed">Nuestro taller cuenta con equipamiento de última generación y un equipo de artesanos especializados que fabrican cada mueble con precisión y cuidado.</p>
          <ul className="space-y-2 mt-2">
            {["Madera seleccionada y certificada", "Herrajes importados de alta durabilidad", "Tapizados con materiales premium", "Control de calidad en cada etapa", "Acabados con lacas y barnices profesionales"].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-text-light">
                <span className="text-accent mt-0.5">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Nuestros valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">{v.icon}</div>
              <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
              <p className="text-text-muted text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="glass-card p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Nuestra misión</h2>
        <p className="text-text-light text-lg leading-relaxed max-w-2xl mx-auto">
          Proveer soluciones de mobiliario de alta calidad que transformen espacios y mejoren la calidad de vida de nuestros clientes, manteniendo siempre los más altos estándares de fabricación, diseño y servicio.
        </p>
      </div>
    </div>
  );
}
