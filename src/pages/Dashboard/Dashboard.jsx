import { useEffect, useState } from "react";
import DashboardContent from "./Partials/DashboardContent";
import DashboardStats from "./Partials/DashboardStats";
import FeedbackModal from "./components/FeedbackModal";
import { initialStatsData } from "./data/dashboard";
import { userService } from "@/services/userServices"; // 🚀 Import userService

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [checklistProgress, setChecklistProgress] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [hasAlerted, setHasAlerted] = useState(false);
  const [fullname, setFullname] = useState("User"); // 🚀 State nama user
  const [greeting, setGreeting] = useState("Selamat Pagi"); // 🚀 State salam dinamis

  const [statsData, setStatsData] = useState(initialStatsData);

  // 🚀 Logic untuk mengambil salam berdasarkan jam saat ini
  const getGreetingMessage = () => {
    const hours = new Date().getHours();
    if (hours >= 4 && hours < 11) return "Selamat Pagi";
    if (hours >= 11 && hours < 15) return "Selamat Siang";
    if (hours >= 15 && hours < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  useEffect(() => {
    // 1. Jalankan update waktu & ucapan salam
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setCurrentDate(formattedDate);
      setGreeting(getGreetingMessage());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    // 2. Fetch nama lengkap user dari API
    const fetchUserData = async () => {
      try {
        const response = await userService.getProfile();
        const data = response.data || response;
        if (data?.fullname) {
          setFullname(data.fullname);
        }
      } catch (error) {
        console.error("Gagal memuat profil untuk dashboard:", error);
      }
    };

    fetchUserData();

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

  // TRIGGER PEMBERSIHAN & PERPINDAHAN SIKLUS MINGGU BARU
  const handleFeedbackSubmit = (userData) => {
    console.log("Feedback siap dikirim ke database BE:", userData);

    setStatsData((prev) => {
      const nextDay = 1;
      const isOverCutOff = prev.currentPlanDay > prev.totalPlanDays;
      const baseWeek = isOverCutOff ? Math.ceil(prev.currentPlanDay / 7) : Math.ceil(prev.currentPlanDay / 7) + 1;

      return {
        ...prev,
        currentPlanDay: nextDay,
        streakDays: prev.streakDays,
        riskScore: prev.riskScore,
        weekStartDate: "2026-06-22",
        weekEndDate: "2026-06-28",
        weeklyStats: {
          avgCompliance: 0,
          perfectDays: 0,
          riskDrop: 0,
        },
      };
    });

    setHasAlerted(false);
    setShowFeedbackModal(false);
    console.log("Dashboard berhasil dibersihkan! Selamat datang di minggu berikutnya.");
  };

  const calculatedWeek = currentDay === 0 ? 0 : Math.ceil(currentDay / 7);
  const modalWeek = isDay8CutOff ? Math.max(1, calculatedWeek - 1) : calculatedWeek;

  return (
    <div className="space-y-6">
      {/* Header Dashboard Dinamis */}
      <div className="text-left">
        {/* 🌟 Diubah menjadi salam dinamis + nama user real dari BE */}
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          {greeting}, {fullname}!
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-500">
          {currentDate} • {currentDay === 0 ? "Fase Persiapan" : isDay8CutOff ? "Tahap Evaluasi" : `Minggu ${calculatedWeek}, Hari ${currentDay}`}
        </p>
      </div>

      {/* Komponen Statistik Utama */}
      <DashboardStats checklistProgress={checklistProgress} statsData={statsData} onOpenModal={() => setShowFeedbackModal(true)} />

      {/* Komponen Isi Aktivitas Harian */}
      <DashboardContent currentProgress={isDay8CutOff ? 0 : checklistProgress} onProgressChange={setChecklistProgress} isEvalMode={isDay8CutOff} currentPlanDay={currentDay} weekStartDate={statsData.weekStartDate} />

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
