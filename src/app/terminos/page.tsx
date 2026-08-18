import { Metadata } from "next";

export const metadata: Metadata = { title: "Términos y Condiciones", description: "Términos, condiciones y políticas de venta de MYD Muebles." };

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-4xl font-black mb-4">Términos y <span className="text-accent">Condiciones</span></h1>
      <div className="accent-line mb-8" />
      <div className="glass-card p-8 space-y-8 text-text-light leading-relaxed">
        {[
          { title: "1. Política de ventas", body: "Todos los precios publicados en nuestra web están en dólares americanos (USD) e incluyen IVA. Los precios están sujetos a cambios sin previo aviso. La confirmación del pedido está sujeta a disponibilidad de stock." },
          { title: "2. Formas de pago", body: "Aceptamos pagos en efectivo, transferencia bancaria, depósito, tarjeta de crédito/débito y servicios de pago en línea. Para pedidos personalizados se requiere un anticipo del 50%." },
          { title: "3. Entrega y tiempos", body: "Los productos en stock se entregan en 3–7 días hábiles en Quito y 7–15 días a nivel nacional. Los muebles personalizados tienen un plazo de 15–30 días hábiles. MYD Muebles se reserva el derecho de coordinar fecha y hora de entrega con el cliente." },
          { title: "4. Política de devoluciones", body: "Aceptamos devoluciones de productos en stock dentro de los 7 días calendario de recibido, siempre que el producto esté en perfectas condiciones, sin uso y en su embalaje original. Los productos personalizados o fabricados a medida no tienen devolución." },
          { title: "5. Garantía", body: "Todos nuestros productos tienen garantía de fábrica. La garantía cubre defectos de fabricación, no daños por mal uso, golpes, humedad excesiva o modificaciones. El periodo de garantía varía por producto y se indica en cada ficha técnica." },
          { title: "6. Privacidad de datos", body: "Los datos personales recopilados (nombre, correo, teléfono) son utilizados exclusivamente para gestionar pedidos, cotizaciones y comunicaciones relacionadas con nuestros productos y servicios. No compartimos ni vendemos datos a terceros." },
          { title: "7. Propiedad intelectual", body: "Todos los diseños, fotografías, textos e imágenes publicados en este sitio web son propiedad de MYD Muebles y están protegidos por las leyes de propiedad intelectual del Ecuador." },
          { title: "8. Jurisdicción", body: "Cualquier controversia relacionada con estos términos y condiciones se resolverá conforme a las leyes de la República del Ecuador, con jurisdicción en la ciudad de Quito." },
        ].map((s) => (
          <div key={s.title}>
            <h2 className="text-lg font-bold text-foreground mb-2">{s.title}</h2>
            <p className="text-text-muted">{s.body}</p>
          </div>
        ))}
        <p className="text-xs text-text-muted pt-4 border-t border-card-border">Última actualización: agosto 2026 · MYD Muebles Ecuador</p>
      </div>
    </div>
  );
}
