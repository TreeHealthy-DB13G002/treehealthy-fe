export default function StatusBadge({ status, type = "weekly" }) {
  const weeklyStyles = {
    Selesai: "bg-[#e2f9e9] border-[#bbf3cd] text-brand-success",
    "Butuh Evaluasi": "bg-amber-50 border-amber-200 text-[#d97706]",
    "Belum Mulai": "bg-slate-100 border-slate-200 text-slate-400",
  };

  const dailyStyles = {
    Sempurna: "bg-emerald-50 border-emerald-200 text-emerald-600",
    Terpenuhi: "bg-sky-50 border-sky-100 text-brand-primary",
    Kurang: "bg-rose-50 border-rose-100 text-destructive",
  };

  const riskStyles = {
    Rendah: "bg-emerald-50 border-emerald-200 text-emerald-600",
    Sedang: "bg-amber-50 border-amber-200 text-[#d97706]",
    Tinggi: "bg-rose-50 border-rose-100 text-destructive",
  };

  const activeStyle = type === "weekly" ? weeklyStyles : type === "risk" ? riskStyles : dailyStyles;

  return <span className={`inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide shadow-3xs ${activeStyle[status] || "bg-slate-100 border-slate-200 text-slate-400"}`}>{status}</span>;
}
