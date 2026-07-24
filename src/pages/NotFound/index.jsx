import { useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-brand-bg flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-sky-100/60 rounded-full animate-ping opacity-75" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-sky-50 border border-sky-100 rounded-full flex items-center justify-center text-brand-primary shadow-xs">
            <FiAlertCircle size={36} className="text-sky-600" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black tracking-widest text-brand-primary uppercase">Error 404</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">Halaman Tidak Ditemukan</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed max-w-sm mx-auto">Maaf, halaman yang Anda cari tidak ada, telah dipindahkan, atau alamat URL yang dimasukkan salah.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Button variant="outline" onClick={() => navigate(-1)} className="w-full h-11 rounded-xl text-xs font-bold border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center justify-center gap-2">
            <FiArrowLeft size={16} /> Kembali
          </Button>

          <Button onClick={() => navigate("/dashboard")} className="w-full h-11 rounded-xl text-xs font-bold bg-brand-primary hover:bg-[#0369a1] text-white shadow-sm cursor-pointer flex items-center justify-center gap-2">
            <FiHome size={16} /> Ke Dashboard
          </Button>
        </div>
      </div>

      <p className="mt-6 text-[11px] font-semibold text-slate-400">TreeHealthy AI Health Planner • 2026</p>
    </div>
  );
}
