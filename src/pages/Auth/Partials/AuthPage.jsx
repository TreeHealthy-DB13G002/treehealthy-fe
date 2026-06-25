import { ArrowLeft } from "lucide-react";
import AuthBranding from "./AuthBranding";

const AuthPage = ({ children }) => {
  return (
    <section className="relative grid min-h-screen lg:grid-cols-2 bg-white">
      {/* 🚀 TOMBOL GLOBAL: Melayang di pojok kiri atas untuk Mobile & Desktop */}
      <div className="absolute top-4 left-4 lg:top-12 lg:left-12 z-50">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold bg-white/95 px-4 py-2 rounded-xl border border-gray-200/80 lg:border-white/60 shadow-md lg:shadow-xs backdrop-blur-md text-brand-secondary hover:text-brand-primary transition-colors"
        >
          <ArrowLeft size={14} /> Kembali ke Beranda
        </a>
      </div>

      {/* Sisi Kiri: Foto + Overlay (Hanya muncul di Desktop) */}
      <AuthBranding />

      {/* Sisi Kanan: Form (Login/Register/Forgot/Reset) */}
      <div className="flex items-center justify-center bg-white px-6 pt-16 pb-12 lg:py-12 overflow-y-auto">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </section>
  );
};

export default AuthPage;
