import { useState } from "react";
import { FiX } from "react-icons/fi";

const FeedbackModal = ({ isOpen, onClose, currentWeek = 1, stats = {}, onSubmitSuccess }) => {
  const [reflection, setReflection] = useState("");

  if (!isOpen) return null;

  // Parsing data stats secara aman dari prop
  const compliance = stats?.avg_compliance ?? stats?.avgCompliance ?? stats?.compliance ?? 0;
  const perfectDays = stats?.perfect_days ?? stats?.perfectDays ?? 0;
  const doneTasks = stats?.done_tasks ?? stats?.doneTasks ?? 0;
  const totalTasks = stats?.total_tasks ?? stats?.totalTasks ?? 0;

  const handleSubmit = () => {
    if (onSubmitSuccess) {
      onSubmitSuccess({ reflection });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 flex flex-col space-y-5 text-left transform duration-300">
        {/* Header Modal */}
        <div className="flex justify-between items-start flex-shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-800">✨ Evaluasi Kesehatan Mingguan</span>
            </div>
            <p className="text-xs font-semibold text-slate-400">Siklus Minggu {currentWeek}</p>
          </div>
          <button onClick={onClose} className="h-7 w-7 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center hover:bg-slate-200 transition-all cursor-pointer">
            <FiX size={16} />
          </button>
        </div>

        {/* ─── METRIC GRID SINKRON (3 KOLOM KONSISTEN) ─── */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100 text-center flex-shrink-0">
          <div>
            <div className="text-xl sm:text-2xl font-black text-brand-secondary">{compliance}%</div>
            <div className="text-[10px] font-bold text-brand-primary uppercase tracking-wide mt-0.5">Rasio Kepatuhan</div>
          </div>

          <div className="border-x border-slate-200">
            <div className="text-xl sm:text-2xl font-black text-brand-secondary">{perfectDays}</div>
            <div className="text-[10px] font-bold text-brand-primary uppercase tracking-wide mt-0.5">Hari Sempurna</div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-black text-brand-secondary">
              {doneTasks} <span className="text-xs font-bold text-slate-400">/ {totalTasks}</span>
            </div>
            <div className="text-[10px] font-bold text-brand-primary uppercase tracking-wide mt-0.5">Tugas Selesai</div>
          </div>
        </div>

        {/* Textarea Refleksi */}
        <div className="space-y-1.5 flex-1 flex flex-col">
          <label className="text-xs font-bold text-slate-700 block">Refleksi Mingguan</label>
          <textarea
            rows={5}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full flex-1 rounded-2xl border border-slate-200 p-4 text-xs focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-hidden bg-slate-50 font-medium text-slate-700 resize-none leading-relaxed"
            placeholder="Tuliskan secara detail mengenai pengalaman, tantangan fisik, perubahan pola makan, atau kendala yang Anda rasakan selama satu minggu ini..."
          />
        </div>

        <button onClick={handleSubmit} className="w-full bg-sky-600 text-white font-bold py-3 text-xs rounded-xl hover:bg-sky-700 transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer flex-shrink-0">
          Kirim Evaluasi & Lanjutkan Siklus
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
