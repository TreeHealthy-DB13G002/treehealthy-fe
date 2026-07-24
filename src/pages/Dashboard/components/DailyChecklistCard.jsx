import ChecklistItem from "./ChecklistItem";
import { FiInbox, FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";

const DailyChecklistCard = ({ tasks = [], onToggleTask, currentPlanDay = 1, isLoading = false, isError = false, onRetry }) => {
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col h-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-100">
        <div className="text-left">
          <h2 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-1.5">📋 Ceklis Kesehatan Hari Ini</h2>
          <p className="text-xs font-medium text-slate-500">Target aktivitas harian dari Program Sehat 7 Hari Anda</p>
        </div>
        <span className="text-xs font-bold bg-[#e0f2fe] text-[#0369a1] px-3 py-1.5 rounded-full border border-sky-100 shadow-3xs whitespace-nowrap">
          {completedCount}/{tasks.length} Selesai
        </span>
      </div>

      <div className="space-y-3 min-h-[220px] max-h-[270px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent flex-1 flex flex-col justify-center" style={{ scrollBehavior: "smooth" }}>
        {isLoading ? (
          <Empty className="py-8 my-auto flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
              <FiRefreshCw size={22} className="animate-spin" />
            </div>
            <EmptyTitle className="text-sm font-bold text-slate-700">Menyiapkan Rencana Harian...</EmptyTitle>
            <EmptyDescription className="text-xs text-slate-400 max-w-xs">Tunggu sebentar, AI sedang merancang dan memuat tugas kesehatan Anda.</EmptyDescription>
          </Empty>
        ) : isError ? (
          <Empty className="py-8 my-auto flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-2">
              <FiAlertCircle size={24} />
            </div>
            <EmptyTitle className="text-sm font-bold text-slate-700">Gagal Memuat Rencana Harian</EmptyTitle>
            <EmptyDescription className="text-xs text-slate-400 max-w-xs mb-3">Terjadi kendala saat mengambil tugas. Pastikan koneksi internet terhubung.</EmptyDescription>
            {onRetry && (
              <button onClick={onRetry} className="px-3.5 py-1.5 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 shadow-xs">
                <FiRefreshCw size={12} /> Coba Lagi
              </button>
            )}
          </Empty>
        ) : tasks.length === 0 ? (
          <Empty className="py-8 my-auto flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-brand-secondary flex items-center justify-center mb-2">
              <FiInbox size={24} />
            </div>
            <EmptyTitle className="text-sm font-bold text-slate-700">Belum Ada Misi Hari Ini</EmptyTitle>
            <EmptyDescription className="text-xs text-slate-400 max-w-xs">Semua checklist harian belum tersedia atau telah selesai dikerjakan.</EmptyDescription>
          </Empty>
        ) : (
          tasks.map((task) => <ChecklistItem key={task.id} title={task.title || task.name} status={task.status || (task.is_completed ? "completed" : "in_progress")} description={task.description} onCheck={() => onToggleTask(task.id)} />)
        )}
      </div>
    </div>
  );
};

export default DailyChecklistCard;
