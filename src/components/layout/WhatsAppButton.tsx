"use client";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "593991234567";
  const message = encodeURIComponent("Hola! Me interesa conocer más sobre sus muebles.");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 text-white flex items-center justify-center shadow-lg hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 active:scale-95"
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}
