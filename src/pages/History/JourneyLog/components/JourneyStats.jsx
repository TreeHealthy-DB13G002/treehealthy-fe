export default function JourneyStats({ data, isDetailView = false, weekRisk = "Rendah" }) {
  if (isDetailView) {
    // Tentukan kapasitas maksimal berdasarkan kategori risiko pilar aturan
    const tasksPerDay = weekRisk === "Rendah" ? 7 : 8;
    const totalTargetTasks = data.length * tasksPerDay;

    const totalDoneTasks = data.reduce((acc, day) => {
      return acc + day.tasks.filter(Boolean).length;
    }, 0);

    const complianceRate = totalTargetTasks > 0 ? Math.round((totalDoneTasks / totalTargetTasks) * 100) : 0;

    const perfectDays = data.filter((day) => {
      const done = day.tasks.filter(Boolean).length;
      return done === tasksPerDay;
    }).length;

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card-base border border-border bg-brand-white">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Kepatuhan Minggu Ini</span>
          <h3 className="text-2xl font-extrabold text-brand-secondary mt-1">{complianceRate}%</h3>
        </div>
        <div className="card-base border border-border bg-brand-white">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
            Hari Sempurna ({tasksPerDay}/{tasksPerDay} Task)
          </span>
          <h3 className="text-2xl font-extrabold text-brand-secondary mt-1">
            {perfectDays} <span className="text-sm font-medium text-slate-400">Hari</span>
          </h3>
        </div>
        <div className="card-base border border-sidebar-border bg-brand-bg">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Tugas Terselesaikan</span>
          <h3 className="text-2xl font-extrabold text-brand-secondary mt-1">
            {totalDoneTasks} <span className="text-sm font-medium text-slate-500">/ {totalTargetTasks} Task</span>
          </h3>
        </div>
      </div>
    );
  }

  const completedWeeks = data.filter((w) => w.status === "Selesai");

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="card-base border border-border bg-brand-white">
        <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Rata-Rata Kepatuhan Global</span>
        <h3 className="text-2xl font-extrabold text-brand-secondary mt-1">74%</h3>
      </div>
      <div className="card-base border border-border bg-brand-white">
        <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Siklus Mingguan Selesai</span>
        <h3 className="text-2xl font-extrabold text-brand-secondary mt-1">
          {completedWeeks.length} <span className="text-sm font-medium text-slate-400">Minggu</span>
        </h3>
      </div>
      <div className="card-base border border-sidebar-border bg-brand-bg">
        <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Total Evaluasi Diperlukan</span>
        <h3 className="text-2xl font-extrabold text-brand-secondary mt-1">
          {data.filter((w) => w.status === "Butuh Evaluasi").length} <span className="text-sm font-medium text-slate-500">Siklus</span>
        </h3>
      </div>
    </div>
  );
}
