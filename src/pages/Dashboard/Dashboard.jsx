import { useEffect, useState } from "react";
import DashboardContent from "./Partials/DashboardContent";
import DashboardStats from "./Partials/DashboardStats";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");

  const [checklistProgress, setChecklistProgress] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [hasAlerted, setHasAlerted] = useState(false);

  const [statsData, setStatsData] = useState({
    streakDays: 3,
    riskScore: 34.5,
    currentPlanDay: 6,
    totalPlanDays: 7,
  });

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setCurrentDate(formattedDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentDay = statsData.currentPlanDay;
  const totalDays = statsData.totalPlanDays;
  const isAllTasksCompleted = checklistProgress === 100;

  const isDay7Finished = currentDay === totalDays && isAllTasksCompleted;
  const isDay8CutOff = currentDay > totalDays;

  useEffect(() => {
    if ((isDay7Finished || isDay8CutOff) && !hasAlerted) {
      if (isDay7Finished) {
        alert("🎉 Luar biasa! Seluruh program sehat 7 hari Anda telah tuntas 100% hari ini!");
      } else if (isDay8CutOff) {
        alert("⚠️ Batas waktu program 7 hari Anda telah selesai. Silakan isi feedback evaluasi.");
      }
      setShowFeedbackModal(true);
      setHasAlerted(true);
    }
  }, [isDay7Finished, isDay8CutOff, hasAlerted]);

  const calculatedWeek = currentDay === 0 ? 0 : Math.ceil(currentDay / 7);

  return (
    <div className="space-y-6">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">
          {currentDate} • {currentDay === 0 ? "Fase Persiapan" : isDay8CutOff ? "Tahap Evaluasi" : `Minggu ${calculatedWeek}, Hari ${currentDay}`}
        </p>
      </div>

      <DashboardStats checklistProgress={checklistProgress} statsData={statsData} onOpenModal={() => setShowFeedbackModal(true)} />

      <DashboardContent currentProgress={isDay8CutOff ? 0 : checklistProgress} onProgressChange={setChecklistProgress} isEvalMode={isDay8CutOff} />

      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl text-center space-y-4 border border-slate-100">
            <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
            <h3 className="text-lg font-bold text-slate-800">Lembar Evaluasi & Feedback Program</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isDay8CutOff
                ? "Siklus program 7 hari telah berakhir. Bagikan perubahan fisik yang Anda rasakan untuk generate modul resep kesehatan AI berikutnya."
                : "Selamat atas keberhasilan Anda menuntaskan seluruh target! Bagikan cerita sehatmu di bawah ini."}
            </p>
            <textarea rows={3} className="w-full rounded-2xl border border-slate-200 p-3 text-xs focus:border-sky-500 focus:outline-hidden bg-slate-50" placeholder="Tuliskan pengalaman atau kendala fisik yang Anda rasakan..." />
            <div className="flex gap-2.5 pt-2">
              <button onClick={() => setShowFeedbackModal(false)} className="flex-1 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all cursor-pointer">
                Kembali
              </button>
              <button
                onClick={() => {
                  alert("Feedback berhasil disimpan! AI sedang menyusun Action Plan siklus baru.");
                  setShowFeedbackModal(false);
                }}
                className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-all cursor-pointer shadow-xs"
              >
                Kirim Evaluasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
