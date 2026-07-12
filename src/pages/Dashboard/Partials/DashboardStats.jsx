import StatsCard from "../components/StatsCard";

const DashboardStats = ({ checklistProgress = 0, statsData, onOpenModal }) => {
  const risk = statsData?.riskScore ?? null;
  const currentDay = statsData?.currentPlanDay ?? 0;
  const totalDays = statsData?.totalPlanDays ?? 7;

  const isAllTasksCompleted = checklistProgress === 100;
  const activeStreak = isAllTasksCompleted ? (statsData?.streakDays ?? 0) + 1 : (statsData?.streakDays ?? 0);

  // ─── 🌟 LOGIKA UNTUK TAMPILAN JIKA DATA RISKO KOSONG (NULL) ───
  let riskBgColor = "border-slate-200 bg-white";
  let riskSubtext = "⚪ Menunggu kalkulasi data kesehatan...";
  let riskValueLabel = "--";

  if (risk !== null) {
    riskValueLabel = `${risk}%`;
    if (risk < 30) {
      riskBgColor = "border-green-300 bg-green-50/80";
      riskSubtext = "🟢 Risiko Rendah: < 30.0%";
    } else if (risk >= 30 && risk <= 60) {
      riskBgColor = "border-amber-300 bg-amber-50/80 animate-pulse";
      riskSubtext = "🟡 Risiko Sedang: 30.0% - 60.0%";
    } else if (risk > 60) {
      riskBgColor = "border-red-300 bg-red-50/80 animate-pulse";
      riskSubtext = "🔴 Risiko Tinggi: > 60.0%";
    }
  }

  // ─── LOGIKA PROGRESS PROGRAM SEHAT ───
  const isProgramFinished = currentDay === totalDays && isAllTasksCompleted;
  let planBgColor = "border-sky-100 bg-gradient-to-br from-sky-50/40 to-white";
  let planValueLabel = `${currentDay}/${totalDays}`;

  const safeTotalDays = totalDays > 0 ? totalDays : 7;
  let planSubtext = `Progress berjalan ${Math.round((currentDay / safeTotalDays) * 100)}%`;

  if (currentDay === 0) {
    planValueLabel = `0/${safeTotalDays}`;
    planSubtext = "🚀 Fase Persiapan: Pengenalan modul aktivitas";
  } else if (currentDay > safeTotalDays) {
    planBgColor = "border-amber-200 bg-amber-100/60";
    planSubtext = "⚠️ Waktu siklus habis. Klik untuk isi evaluasi wajib.";
  } else if (isProgramFinished) {
    planBgColor = "border-emerald-300 bg-emerald-100 font-medium";
    planSubtext = "🎉 Program Selesai! Klik di sini untuk isi feedback harian";
  }

  const isPlanClickable = isProgramFinished || currentDay > safeTotalDays;

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

        {/* 🌟 FIX: Sekarang mengirim value yang sudah diproteksi, bebas dari bug 'null%' */}
        <StatsCard variant="risk" label="Skor Risiko PTM" value={riskValueLabel} className={riskBgColor} subtext={riskSubtext} />

        <StatsCard
          variant="plan"
          label="Rencana Program Sehat"
          value={planValueLabel}
          progress={currentDay === 0 ? 0 : (currentDay / safeTotalDays) * 100}
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
