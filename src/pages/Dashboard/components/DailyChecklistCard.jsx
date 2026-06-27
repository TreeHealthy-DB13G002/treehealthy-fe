import { useState, useEffect } from "react";
import ChecklistItem from "./ChecklistItem";

const initialTasks = [
  {
    id: 1,
    title: "Kualitas Tidur Semalam",
    description: "Durasi 7.5 Jam - Sirkadian Terjaga",
    timeLockDesc: "🎉 Berhasil dilaporkan jam 07.15 subuh",
    status: "completed",
  },
  {
    id: 2,
    title: "Hidrasi Air Putih (Target 2L)",
    description: "Gelas ke-4: Ambil air minum di pantry kantor",
    timeLockDesc: "⏳ Gembok terbuka otomatis dalam 15 menit lagi (14.45)",
    status: "locked",
  },
  {
    id: 3,
    title: "Jeda Mental & Micro-Break",
    description: "Menjauh dari layar komputer, lakukan stretching 10 menit",
    timeLockDesc: "⏱️ Jam Kritis: Batas pengisian 1 jam lagi (Maks 15.30)",
    status: "in_progress",
  },
  {
    id: 4,
    title: "Validasi: Bebas Gorengan & Makanan Asin",
    description: "Misi Gagal: User melapor makan bakwan jam 12.30",
    timeLockDesc: "💔 Streak patah. PROGRESS POHON BERKURANG!",
    status: "failed",
  },
  {
    id: 5,
    title: "Olahraga Kardio Ringan 30 Menit",
    description: "Membakar kalori harian dan melatih detak jantung",
    timeLockDesc: "🔒 Terkunci hingga jadwal jam 16.00 sore",
    status: "locked",
  },
  {
    id: 6,
    title: "Konsumsi Sayur & Buah Seimbang",
    description: "Serat alami untuk mereduksi tumpukan kolesterol",
    timeLockDesc: "🔒 Terkunci hingga jadwal jam 19.00 malam",
    status: "locked",
  },
  {
    id: 7,
    title: "Cek Tekanan Darah Mandiri",
    description: "Mencatat tensi darah di riwayat kesehatan bulanan",
    timeLockDesc: "🔒 Terkunci hingga jadwal jam 20.00 malam",
    status: "locked",
  },
  {
    id: 8,
    title: "Meditasi / Relaksasi 10 Menit",
    description: "Menurunkan hormon kortisol sebelum tidur",
    timeLockDesc: "🔒 Terkunci hingga jadwal jam 21.30 malam",
    status: "locked",
  },
];

const DailyChecklistCard = ({ onProgressChange, isEvalMode = false }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const calculateProgress = (currentTasks) => {
    const completedCount = currentTasks.filter((t) => t.status === "completed").length;
    return (completedCount / currentTasks.length) * 100;
  };

  useEffect(() => {
    const progress = isEvalMode ? 0 : calculateProgress(tasks);
    if (onProgressChange) {
      onProgressChange(progress);
    }
  }, [tasks, isEvalMode]);

  const handleCheckTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id && task.status === "in_progress") {
          return {
            ...task,
            status: "completed",
            timeLockDesc: "🎉 Berhasil diselesaikan hari ini",
          };
        }
        return task;
      }),
    );
  };

  if (isEvalMode) {
    return (
      <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/20 p-6 sm:p-8 text-center flex flex-col items-center justify-center h-full min-h-[340px] space-y-3">
        <span className="text-3xl">🎉</span>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-800">Siklus Program 7 Hari Selesai</h3>
          <p className="text-xs font-medium text-slate-400 max-w-xs mx-auto leading-relaxed">Tidak ada tugas harian aktif. Silakan isi feedback evaluasi di boks statistik atas untuk mendapatkan AI Action Plan terbaru.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col h-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-100">
        <div className="text-left">
          <h2 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-1.5">📋 Today's Health Checklist</h2>
          <p className="text-xs font-medium text-slate-500">Daily tasks from your 7-Day Action Plan</p>
        </div>
        <span className="text-xs font-bold bg-[#e0f2fe] text-[#0369a1] px-3 py-1.5 rounded-full border border-sky-100 shadow-3xs whitespace-nowrap">
          {tasks.filter((t) => t.status === "completed").length}/{tasks.length} Completed
        </span>
      </div>

      {/* Container List Scrollable */}
      <div className="space-y-3 max-h-[270px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent" style={{ scrollBehavior: "smooth" }}>
        {tasks.map((task) => (
          <ChecklistItem key={task.id} title={task.title} status={task.status} description={task.description} timeLockDesc={task.timeLockDesc} onCheck={() => handleCheckTask(task.id)} />
        ))}
      </div>
    </div>
  );
};

export default DailyChecklistCard;
