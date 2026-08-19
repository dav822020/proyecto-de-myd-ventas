import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "MYD Muebles — Fabricación y Venta de Muebles en Ecuador",
    template: "%s | MYD Muebles",
  },
  description:
    "Muebles de alta calidad con fabricación propia en Ecuador. Salas, comedores, dormitorios, oficina, exteriores y decoración. Entrega a domicilio y garantía real.",
  keywords: "muebles Ecuador, muebles Quito, fabricación muebles, sala, comedor, dormitorio",
  openGraph: {
    title: "MYD Muebles — Fabricación y Venta de Muebles en Ecuador",
    description: "Muebles de alta calidad con fabricación propia en Ecuador.",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
