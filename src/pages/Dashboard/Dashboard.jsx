import { useEffect, useState } from "react";
import DashboardContent from "./Partials/DashboardContent";
import DashboardStats from "./Partials/DashboardStats";
import FeedbackModal from "./components/FeedbackModal";
import { initialStatsData } from "./data/dashboard";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [checklistProgress, setChecklistProgress] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [hasAlerted, setHasAlerted] = useState(false);

  const [statsData, setStatsData] = useState(initialStatsData);

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
      setShowFeedbackModal(true);
      setHasAlerted(true);
    }
  }, [isDay7Finished, isDay8CutOff, hasAlerted]);

  // 🌟 TRIGGER PEMBERSIHAN & PERPINDAHAN SIKLUS MINGGU BARU
  const handleFeedbackSubmit = (userData) => {
    console.log("Feedback siap dikirim ke database BE:", userData);

    setStatsData((prev) => {
      const nextDay = 1; // 🚨 Reset kembali ke Hari 1
      const isOverCutOff = prev.currentPlanDay > prev.totalPlanDays;

      // Hitung kelipatan minggu baru secara dinamis
      const baseWeek = isOverCutOff ? Math.ceil(prev.currentPlanDay / 7) : Math.ceil(prev.currentPlanDay / 7) + 1;

      return {
        ...prev,
        currentPlanDay: nextDay, // 🚨 Reset Hari ke 1
        streakDays: prev.streakDays, // 🔥 Streak dipertahankan lanjut
        riskScore: prev.riskScore, // 🩺 Skor risiko medis tetap aman dipertahankan

        // Simulasikan pergeseran tanggal target (Maju 7 hari ke siklus berikutnya)
        weekStartDate: "2026-06-22",
        weekEndDate: "2026-06-28",

        // 🚨 CLEAR TOTAL 3 KOLOM STATISTIK MINGGUAN KARENA MASUK MINGGU BARU
        weeklyStats: {
          avgCompliance: 0,
          perfectDays: 0,
          riskDrop: 0,
        },
      };
    });

    // 🚨 RESET FLAG PELINDUNG MODAL SUPAYA MINGGU DEPAN BISA MUNCUL LAGI
    setHasAlerted(false);
    setShowFeedbackModal(false);
    console.log("Dashboard berhasil dibersihkan! Selamat datang di minggu berikutnya.");
  };

  const calculatedWeek = currentDay === 0 ? 0 : Math.ceil(currentDay / 7);
  const modalWeek = isDay8CutOff ? Math.max(1, calculatedWeek - 1) : calculatedWeek;

  return (
    <div className="space-y-6">
      {/* Header Dashboard */}
      <div className="text-left">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">
          {currentDate} • {currentDay === 0 ? "Fase Persiapan" : isDay8CutOff ? "Tahap Evaluasi" : `Minggu ${calculatedWeek}, Hari ${currentDay}`}
        </p>
      </div>

      {/* Komponen Statistik Utama */}
      <DashboardStats checklistProgress={checklistProgress} statsData={statsData} onOpenModal={() => setShowFeedbackModal(true)} />

      {/* Komponen Isi Aktivitas Harian */}
      {/* 🌟 TIP CERDAS FE: Kita oper currentPlanDay dan totalDays sebagai pemicu key re-render */}
      <DashboardContent
        currentProgress={isDay8CutOff ? 0 : checklistProgress}
        onProgressChange={setChecklistProgress}
        isEvalMode={isDay8CutOff}
        currentPlanDay={currentDay}
        weekStartDate={statsData.weekStartDate} // Digunakan sebagai key identity
      />

      {/* Komponen Feedback Modal Terpisah */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        isDay8CutOff={isDay8CutOff}
        onSubmitSuccess={handleFeedbackSubmit}
        currentWeek={modalWeek}
        startDate={statsData.weekStartDate}
        endDate={statsData.weekEndDate}
        stats={statsData.weeklyStats}
      />
    </div>
  );
};

export default Dashboard;
