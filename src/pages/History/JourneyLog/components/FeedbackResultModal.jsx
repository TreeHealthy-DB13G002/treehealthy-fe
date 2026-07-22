import { FiX, FiCheckCircle, FiAward, FiAlertCircle } from "react-icons/fi";

export default function FeedbackResultModal({ isOpen, onClose, logData }) {
  if (!isOpen || !logData) return null;

  // ─── PARSING DATA DENGAN SAFE FALLBACK ───
  const complianceString = String(logData.compliance || "0%");
  const percentage = parseInt(complianceString) || 0;

  // Ekstrak angka "45 dari 56" jika formatnya string, atau ambil langsung dari object
  const matches = complianceString.match(/\d+/g);
  const doneTasks = logData.doneTasks ?? (matches && matches[1] ? matches[1] : 0);
  const totalTasks = logData.totalTasks ?? (matches && matches[2] ? matches[2] : 0);
  const perfectDays = logData.perfectDays ?? 0;

  // ─── REKOMENDASI OTOMATIS SISTEM ───
  let systemRecommendation = "";
  if (percentage >= 80) {
    systemRecommendation = "Performa luar biasa! Pertahankan konsistensi ini di minggu berikutnya untuk menjaga stabilitas kebugaran tubuh Anda.";
  } else if (percentage >= 50) {
    systemRecommendation = "Capaian Anda sudah cukup baik, namun beberapa pilar harian masih terlewat. Coba fokus memprioritaskan pilar yang paling sering bolong di minggu depan.";
  } else {
    systemRecommendation = "Misi minggu ini masih banyak yang terlewat. Jangan berkecil hati, mari perbaiki komitmen Anda perlahan dengan menyalakan pengingat notifikasi.";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs text-left">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-100 p-5 sm:p-8 max-h-[90vh] overflow-y-auto relative transform transition-all space-y-6 scrollbar-none">
        {/* Tombol Close */}
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-600 rounded-full p-1.5 hover:bg-slate-50 transition-colors cursor-pointer z-10">
          <FiX className="h-5 w-5" />
        </button>

        {/* Header Modal */}
        <div className="text-center space-y-1 pr-8 sm:pr-0">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">Evaluasi Hasil Siklus</h2>
          <p className="text-xs font-semibold text-slate-400">
            {logData.cycle} • {logData.dateRange}
          </p>
        </div>

        {/* ─── METRIC GRID SINKRON (3 KOLOM MATCH DENGAN INPUT) ─── */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
          <div>
            <span className="text-[10px] font-extrabold text-brand-primary uppercase tracking-wider block">Rasio Kepatuhan</span>
            <p className="text-xl sm:text-2xl font-black text-brand-secondary mt-0.5">{percentage}%</p>
          </div>

          <div className="border-x border-slate-200">
            <span className="text-[10px] font-extrabold text-brand-primary uppercase tracking-wider block">Hari Sempurna</span>
            <p className="text-xl sm:text-2xl font-black text-brand-secondary mt-0.5">{perfectDays}</p>
          </div>

          <div>
            <span className="text-[10px] font-extrabold text-brand-primary uppercase tracking-wider block">Tugas Selesai</span>
            <p className="text-xl sm:text-2xl font-black text-brand-secondary mt-0.5">
              {doneTasks} <span className="text-xs font-bold text-slate-400">/ {totalTasks}</span>
            </p>
          </div>
        </div>

        {/* Catatan Evaluasi Sistem */}
        <div className="space-y-2">
          <h4 className="text-[11px] sm:text-xs font-extrabold text-brand-primary uppercase tracking-wider">Catatan Evaluasi Sistem</h4>
          <div className="w-full bg-slate-50 border border-slate-100/80 rounded-2xl p-4 text-xs font-semibold text-slate-600 leading-relaxed flex gap-3 items-start">
            {percentage >= 80 ? (
              <FiAward className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            ) : percentage >= 50 ? (
              <FiCheckCircle className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
            ) : (
              <FiAlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            )}
            <p>{systemRecommendation}</p>
          </div>
        </div>

        {/* Catatan Refleksi User */}
        <div className="space-y-2">
          <h4 className="text-[11px] sm:text-xs font-extrabold text-brand-primary uppercase tracking-wider">Refleksi Anda</h4>
          <div className="w-full bg-sky-50/40 border border-sky-100/70 rounded-2xl p-4 text-xs font-medium text-slate-600 leading-relaxed shadow-3xs">
            {logData.userReflection || logData.reflection || "Anda tidak menginput catatan refleksi pada akhir siklus minggu ini."}
          </div>
        </div>

        {/* Footer Button */}
        <div className="pt-1">
          <button onClick={onClose} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl shadow-xs text-xs tracking-wide transition-colors cursor-pointer text-center">
            Tutup Lembar Hasil
          </button>
        </div>
      </div>
    </div>
  );
}
