import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardContent from "./Partials/DashboardContent";
import DashboardStats from "./Partials/DashboardStats";
import FeedbackModal from "./components/FeedbackModal";
import { userService } from "@/services/userServices";
import { dashboardService } from "@/services/dashboardServices";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [fullname, setFullname] = useState("User");
  const [greeting, setGreeting] = useState("Selamat Pagi");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [dashboardData, setDashboardData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const getGreetingMessage = () => {
    const hours = new Date().getHours();
    if (hours >= 4 && hours < 11) return "Selamat Pagi";
    if (hours >= 11 && hours < 15) return "Selamat Siang";
    if (hours >= 15 && hours < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await dashboardService.getCurrentData();
      const data = response.data?.data || response.data;

      if (data) {
        const rawRisk = data.ptmRiskScore ? parseFloat(String(data.ptmRiskScore).replace("%", "")) : null;
        const rawDay = data.planDay ? parseInt(String(data.planDay).replace(/\D/g, "")) : 1;

        const normalizedData = {
          ...data,
          ptm_risk_score: rawRisk ?? data.ptm_risk_score ?? null,
          current_plan_day: rawDay || data.current_plan_day || 1,
          total_plan_days: data.total_plan_days || 7,
          streak_days: data.streakCount ?? data.streak_days ?? 0,
          tree_health: data.progressTree || data.tree_health || "healthy",
        };

        setDashboardData(normalizedData);
        setTasks(data.dailyChecklist || data.tasks || []);
      }
    } catch (error) {
      console.error("Fetch Dashboard Error:", error);
      setIsError(true);
      toast.error("Gagal memuat rencana harian");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      );
      setGreeting(getGreetingMessage());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    userService
      .getProfile()
      .then((res) => {
        const d = res.data || res;
        if (d?.fullname) setFullname(d.fullname);
      })
      .catch(() => {});

    fetchDashboardData();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getMsUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      return midnight.getTime() - now.getTime();
    };

    const midnightTimer = setTimeout(() => {
      toast.info("Hari baru telah dimulai! Memuat tugas hari ini...", { duration: 4000 });
      fetchDashboardData();
    }, getMsUntilMidnight());

    const handleFocus = () => {
      fetchDashboardData();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      clearTimeout(midnightTimer);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const currentDay = dashboardData?.current_plan_day || 1;
  const calculatedWeek = dashboardData?.current_week || Math.ceil(currentDay / 7) || 1;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const isAllTasksCompleted = tasks.length > 0 && completedCount === tasks.length;
  const currentProgress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const handleToggleTask = async (taskId) => {
    try {
      const updatedTasks = tasks.map((t) => {
        if (t.id === taskId) {
          const newStatus = t.status === "completed" ? "in_progress" : "completed";
          return { ...t, status: newStatus };
        }
        return t;
      });
      setTasks(updatedTasks);

      await dashboardService.toggleTask(taskId);
      await fetchDashboardData();

      const newCompletedCount = updatedTasks.filter((t) => t.status === "completed").length;
      const isNowAllDone = updatedTasks.length > 0 && newCompletedCount === updatedTasks.length;

      if (currentDay === 7 && isNowAllDone) {
        toast.success("Selamat! Program 7 Hari Selesai 🎉", {
          description: "Kamu telah menyelesaikan semua tugas kesehatan minggu ini.",
          duration: 6000,
          action: {
            label: "Isi Evaluasi",
            onClick: () => setShowFeedbackModal(true),
          },
        });
      }
    } catch (error) {
      toast.error("Gagal mengubah status tugas");
      fetchDashboardData();
    }
  };

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      const payload = {
        notes: feedbackData.reflection,
        current_week: calculatedWeek,
      };

      toast.promise(dashboardService.completeCycle(payload), {
        loading: "Memproses evaluasi & memperbarui siklus mingguan...",
        success: () => {
          setShowFeedbackModal(false);
          fetchDashboardData();
          return "Siklus baru berhasil dimuat!";
        },
        error: (err) => err.response?.data?.message || "Gagal menyimpan evaluasi.",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 text-left sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            {greeting}, {fullname}!
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {currentDate} • Minggu {calculatedWeek}, Hari {currentDay}
          </p>
        </div>

        {currentDay === 7 && isAllTasksCompleted && (
          <button
            onClick={() => setShowFeedbackModal(true)}
            className="self-start rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-amber-600 active:scale-95 sm:self-auto cursor-pointer animate-bounce"
          >
            📋 Isi Evaluasi Minggu {calculatedWeek}
          </button>
        )}
      </div>

      <DashboardStats checklistProgress={currentProgress} dashboardData={dashboardData} />

      <DashboardContent
        tasks={tasks}
        currentProgress={currentProgress}
        treeHealth={dashboardData?.tree_health || "healthy"}
        onToggleTask={handleToggleTask}
        currentPlanDay={currentDay}
        isLoading={isLoading}
        isError={isError}
        onRetry={fetchDashboardData}
      />

      <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} onSubmitSuccess={handleFeedbackSubmit} currentWeek={calculatedWeek} stats={dashboardData?.weekly_stats} />
    </div>
  );
};

export default Dashboard;
