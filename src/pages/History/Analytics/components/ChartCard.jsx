export default function ChartCard({ title, subtitle, badgeText, badgeType, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs text-left">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div className="space-y-0.5">
          <h2 className="text-base font-bold text-[#0369a1] tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs font-medium text-slate-500">{subtitle}</p>}
        </div>

        {badgeText && (
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-bold shadow-3xs tracking-tight border
            ${badgeType === "success" ? "bg-[#e2f9e9] border-[#bbf3cd] text-[#16a34a]" : "bg-[#e0f2fe] border-[#bae6fd] text-[#0369a1]"}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}
