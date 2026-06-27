import { FiActivity, FiZap, FiCalendar } from "react-icons/fi";

const StatsCard = ({ variant, value, label, subtext, progress, className = "", onClick, isClickable = false }) => {
  const numericValue = parseFloat(value) || 0;

  const config = {
    streak: {
      icon: FiZap,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
    },
    risk: {
      icon: FiActivity,
      iconColor: numericValue > 60 ? "text-red-600" : numericValue >= 30 ? "text-amber-600" : "text-green-600",
      iconBg: numericValue > 60 ? "bg-red-100/60" : numericValue >= 30 ? "bg-amber-100/60" : "bg-green-100/60",
    },
    plan: {
      icon: FiCalendar,
      iconColor: "text-sky-600",
      iconBg: "bg-sky-50",
    },
  };

  const current = config[variant] || config.streak;
  const Icon = current.icon;

  const CardWrapper = isClickable ? "button" : "div";

  return (
    <CardWrapper
      onClick={isClickable ? onClick : undefined}
      className={`rounded-2xl border p-5 shadow-xs transition-all duration-300 text-left w-full
        ${isClickable ? "cursor-pointer hover:scale-[1.01] active:scale-99 hover:shadow-sm" : ""} 
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">{value}</h2>
        </div>

        <div className={`p-3 rounded-xl shrink-0 transition-colors duration-300 ${current.iconBg} ${current.iconColor}`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100/70">
        {progress !== undefined && variant !== "risk" ? (
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${current.iconColor.replace("text", "bg")}`} style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>
            <p className="text-xs font-semibold text-slate-400">{subtext}</p>
          </div>
        ) : (
          <p className="text-xs font-bold text-slate-500 leading-normal">{subtext}</p>
        )}
      </div>
    </CardWrapper>
  );
};

export default StatsCard;
