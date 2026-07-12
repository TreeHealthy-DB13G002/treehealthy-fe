import { useState } from "react";

const FeedbackModal = ({ isOpen, onClose, currentWeek = 1, startDate = "2026-06-15", endDate = "2026-06-21", stats = { avgCompliance: 83, perfectDays: 3, riskDrop: 16 }, onSubmitSuccess }) => {
  const [reflection, setReflection] = useState("");

  if (!isOpen) return null;

  // Helper untuk memformat tanggal database (YYYY-MM-DD) menjadi teks Indonesia rapi
  const formatDate = (dateString) => {
    try {
      const options = { day: "numeric", month: "long" };
      return new Date(dateString).toLocaleDateString("id-ID", options);
    } catch (e) {
      return dateString;
    }
  };

  const displayYear = new Date(endDate).getFullYear() || "2026";

  const handleSubmit = () => {
    if (onSubmitSuccess) {
      onSubmitSuccess({
        reflection, // Hanya mengirim data refleksi teks saja
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 flex flex-col space-y-5 text-left transform duration-300">
        {/* Header Bagian Atas */}
        <div className="flex justify-between items-start flex-shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-800">✨ Evaluasi Kesehatan Mingguan</span>
            </div>
            <p className="text-xs font-semibold text-slate-400">
              Minggu {currentWeek} • {formatDate(startDate)} - {formatDate(endDate)} {displayYear}
            </p>
          </div>
          <button onClick={onClose} className="h-7 w-7 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center hover:bg-slate-200 transition-all cursor-pointer">
            X
          </button>
        </div>

        {/* Grid Statistik 3 Kolom */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100 text-center flex-shrink-0">
          <div>
            <div className="text-2xl font-black text-brand-secondary">{stats.avgCompliance}%</div>
            <div className="text-[10px] font-bold text-brand-primary uppercase tracking-wide mt-0.5">Rata-rata Kepatuhan</div>
          </div>
          <div className="border-x border-slate-200">
            <div className="text-2xl font-black text-brand-secondary">{stats.perfectDays}</div>
            <div className="text-[10px] font-bold text-brand-primary uppercase tracking-wide mt-0.5">Hari Sempurna</div>
          </div>
          <div>
            <div className="text-2xl font-black text-brand-secondary">-{stats.riskDrop}%</div>
            <div className="text-[10px] font-bold text-brand-primary uppercase tracking-wide mt-0.5">Penurunan Risiko</div>
          </div>
        </div>

        {/* 🌟 Weekly Reflection Textarea (Sudah Diperpanjang & Ditinggikan) */}
        <div className="space-y-1.5 flex-1 flex flex-col">
          <label className="text-xs font-bold text-slate-700 block">Refleksi Mingguan</label>
          <textarea
            rows={6} // 🌟 Naik dari 3 ke 6 biar space mengetik jauh lebih lega dan panjang
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full flex-1 rounded-2xl border border-slate-200 p-4 text-xs focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-hidden bg-slate-50 font-medium text-slate-700 resize-none leading-relaxed"
            placeholder="Tuliskan secara detail mengenai pengalaman, tantangan fisik, perubahan pola makan, atau kendala yang Anda rasakan selama satu minggu ini..."
          />
        </div>

        {/* Tombol Utama */}
        <button onClick={handleSubmit} className="w-full bg-sky-600 text-white font-bold py-3 text-xs rounded-xl hover:bg-sky-700 transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer flex-shrink-0">
          Buka Program Selanjutnya & Bersihkan Dashboard
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
