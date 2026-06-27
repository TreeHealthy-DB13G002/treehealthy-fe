import StatsCard from "../components/StatsCard";

const DashboardStats = ({ checklistProgress = 0, statsData, onOpenModal }) => {
  const risk = statsData?.riskScore ?? 0;
  const currentDay = statsData?.currentPlanDay ?? 0;
  const totalDays = statsData?.totalPlanDays ?? 7;

  const isAllTasksCompleted = checklistProgress === 100;

  const activeStreak = isAllTasksCompleted ? (statsData?.streakDays ?? 0) + 1 : (statsData?.streakDays ?? 0);

  let riskBgColor = "border-green-300 bg-green-50/80";
  let riskSubtext = "🟢 Risiko Rendah: < 30.0% (Tubuh Anda bugar)";

  if (risk >= 30 && risk <= 60) {
    riskBgColor = "border-amber-300 bg-amber-50/80 animate-pulse";
    riskSubtext = "🟡 Risiko Sedang: 30.0% - 60.0% (Perbaiki pola hidup)";
  } else if (risk > 60) {
    riskBgColor = "border-red-300 bg-red-50/80 animate-pulse";
    riskSubtext = "🔴 Risiko Tinggi: > 60.0% (Gawat, ikuti saran AI!)";
  }

  const isProgramFinished = currentDay === totalDays && isAllTasksCompleted;
  let planBgColor = "border-sky-100 bg-gradient-to-br from-sky-50/40 to-white";
  let planValueLabel = `${currentDay}/${totalDays}`;
  let planSubtext = `Progress berjalan ${Math.round((currentDay / totalDays) * 100)}%`;

  if (currentDay === 0) {
    planValueLabel = "0/7";
    planSubtext = "🚀 Fase Persiapan: Pengenalan modul aktivitas";
  } else if (currentDay > totalDays) {
    planBgColor = "border-amber-200 bg-amber-100/60";
    planSubtext = "⚠️ Waktu siklus habis. Klik untuk isi evaluasi wajib.";
  } else if (isProgramFinished) {
    planBgColor = "border-emerald-300 bg-emerald-100 font-medium";
    planSubtext = "🎉 Program Selesai! Klik di sini untuk isi feedback harian";
  }

  const isPlanClickable = isProgramFinished || currentDay > totalDays;

  return (
    <div className="w-full">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <StatsCard
          variant="streak"
          label="Konsistensi Rutin"
          value={`${activeStreak} Hari`}
          className={isAllTasksCompleted ? "border-orange-200 bg-orange-50/30" : "border-slate-200 bg-white"}
          subtext={isAllTasksCompleted ? "🔥 Misi hari ini tuntas! Streak Anda aktif menyala." : "Selesaikan seluruh checklist hari ini untuk mengaktifkan streak!"}
        />

        <StatsCard variant="risk" label="Skor Risiko PTM" value={`${risk}%`} className={riskBgColor} subtext={riskSubtext} />

        <StatsCard
          variant="plan"
          label="Rencana Program Sehat"
          value={planValueLabel}
          progress={currentDay === 0 ? 0 : (currentDay / totalDays) * 100}
          className={planBgColor}
          subtext={planSubtext}
          isClickable={isPlanClickable}
          onClick={onOpenModal}
        />
      </div>
    </div>
  );
};

export default DashboardStats;
