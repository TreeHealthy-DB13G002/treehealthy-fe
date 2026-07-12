import { useState, useEffect } from "react";
import ChecklistItem from "./ChecklistItem";
import tasks from "../data/tasks";

const DailyChecklistCard = ({ onProgressChange, isEvalMode = false, currentPlanDay = 1 }) => {
  const [taskList, setTaskList] = useState(tasks);
  const isOnboardingMode = currentPlanDay === 0;

  const calculateProgress = (currentTasks) => {
    if (!currentTasks || currentTasks.length === 0) return 0;
    const completedCount = currentTasks.filter((t) => t.status === "completed").length;
    return (completedCount / currentTasks.length) * 100;
  };

  useEffect(() => {
    const progress = isEvalMode || isOnboardingMode ? 0 : calculateProgress(taskList);
    if (onProgressChange) {
      onProgressChange(progress);
    }
  }, [taskList, isEvalMode, isOnboardingMode]);

  const handleCheckTask = (id) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id && task.status === "in_progress") {
          return {
            ...task,
            status: "completed",
          };
        }
        return task;
      }),
    );
  };

  // ─── TAMPILAN FASE EVALUASI ───
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

  // ─── TAMPILAN FASE ONBOARDING ───
  if (isOnboardingMode) {
    return (
      <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/30 p-6 sm:p-8 text-center flex flex-col items-center justify-center h-full min-h-[340px] space-y-4">
        <span className="text-4xl animate-bounce">🌱</span>
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-slate-800">Mempersiapkan Modul Sehat Anda</h3>
          <p className="text-xs font-medium text-slate-500 max-w-sm mx-auto leading-relaxed">
            AI kami berhasil merancang <span className="font-bold text-sky-600">7-Day Action Plan</span> khusus untuk profil risiko Anda. Misi pertama Anda akan resmi aktif **besok pagi**.
          </p>
        </div>
        <div className="w-full max-w-xs bg-white border border-slate-100 p-3 rounded-xl text-left space-y-1 shadow-2xs">
          <span className="text-[10px] font-black uppercase text-sky-600 tracking-wider">Tips Malam Ini:</span>
          <p className="text-[11px] font-medium text-slate-400 leading-normal">Usahakan tidur sebelum jam 22.00 dan siapkan botol minum 2 Liter untuk mempermudah checklist besok pagi, bro!</p>
        </div>
      </div>
    );
  }

  // ─── TAMPILAN KONDISI NORMAL ───
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col h-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-100">
        <div className="text-left">
          <h2 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-1.5">📋 Ceklis Kesehatan Hari Ini</h2>
          <p className="text-xs font-medium text-slate-500">Target aktivitas harian dari Program Sehat 7 Hari Anda</p>
        </div>
        <span className="text-xs font-bold bg-[#e0f2fe] text-[#0369a1] px-3 py-1.5 rounded-full border border-sky-100 shadow-3xs whitespace-nowrap">
          {taskList.filter((t) => t.status === "completed").length}/{taskList.length} Selesai
        </span>
      </div>

      <div className="space-y-3 max-h-[270px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent" style={{ scrollBehavior: "smooth" }}>
        {taskList.map((task) => (
          <ChecklistItem key={task.id} title={task.title} status={task.status} description={task.description} onCheck={() => handleCheckTask(task.id)} />
        ))}
      </div>
    </div>
  );
};

export default DailyChecklistCard;
