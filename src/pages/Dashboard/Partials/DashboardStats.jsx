import StatsCard from "../components/StatsCard";

const DashboardStats = ({ checklistProgress = 0, dashboardData, onOpenModal }) => {
  const risk = dashboardData?.ptm_risk_score ?? null;
  const currentDay = dashboardData?.current_plan_day ?? 1;
  const totalDays = dashboardData?.total_plan_days ?? 7;
  const streakDays = dashboardData?.streak_days ?? 0;

  const isAllTasksCompleted = checklistProgress === 100;

  // Skor Risiko PTM Styling
  let riskBgColor = "border-slate-200 bg-white";
  let riskSubtext = "⚪ Menunggu kalkulasi data kesehatan...";
  let riskValueLabel = "--";

  if (risk !== null) {
    riskValueLabel = `${risk}%`;
    if (risk < 30) {
      riskBgColor = "border-green-300 bg-green-50/80";
      riskSubtext = "🟢 Risiko Rendah: < 30.0%";
    } else if (risk >= 30 && risk <= 60) {
      riskBgColor = "border-amber-300 bg-amber-50/80";
      riskSubtext = "🟡 Risiko Sedang: 30.0% - 60.0%";
    } else {
      riskBgColor = "border-red-300 bg-red-50/80";
      riskSubtext = "🔴 Risiko Tinggi: > 60.0%";
    }
  }

  // Program Plan Styling
  const isProgramFinished = currentDay === totalDays && isAllTasksCompleted;
  let planBgColor = "border-sky-100 bg-gradient-to-br from-sky-50/40 to-white";
  let planValueLabel = `${currentDay}/${totalDays}`;
  let planSubtext = `Progress berjalan ${Math.round((currentDay / totalDays) * 100)}%`;

  if (currentDay > totalDays) {
    planBgColor = "border-amber-200 bg-amber-100/60";
    planSubtext = "⚠️ Siklus 7 hari selesai. Klik untuk isi evaluasi wajib.";
  } else if (isProgramFinished) {
    planBgColor = "border-emerald-300 bg-emerald-100 font-medium";
    planSubtext = "🎉 Program Selesai! Klik untuk isi evaluasi mingguan.";
  }

  const isPlanClickable = currentDay === 7;

  return (
    <div className="w-full">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <StatsCard
          variant="streak"
          label="Konsistensi Rutin"
          value={`${streakDays} Hari`}
          className={isAllTasksCompleted ? "border-orange-200 bg-orange-50/30" : "border-slate-200 bg-white"}
          subtext={isAllTasksCompleted ? "🔥 Misi hari ini tuntas! Streak Anda aktif menyala." : "Selesaikan seluruh checklist hari ini untuk mempertahankan streak!"}
        />

        <StatsCard variant="risk" label="Skor Risiko PTM" value={riskValueLabel} className={riskBgColor} subtext={riskSubtext} />

        <StatsCard variant="plan" label="Rencana Program Sehat" value={planValueLabel} progress={(currentDay / totalDays) * 100} className={planBgColor} subtext={planSubtext} isClickable={isPlanClickable} onClick={onOpenModal} />
      </div>
    </div>
  );
};

export default DashboardStats;
