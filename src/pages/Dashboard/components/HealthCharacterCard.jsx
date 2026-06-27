const HealthCharacterCard = ({ currentProgress = 0 }) => {
  const displayPercentage = Math.round(currentProgress);
  const isHealthy = displayPercentage > 50;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between h-auto md:h-full md:min-h-[380px]">
      <div className="flex flex-col items-center justify-center py-3 sm:py-4 flex-1">
        <div className="relative group">
          <img
            src={isHealthy ? "/images/tree-healthy.png" : "/images/tree-wilted.png"}
            alt="Status Pohon Kesehatan"
            className={`h-36 w-36 sm:h-44 sm:w-44 object-contain transition-transform duration-500 group-hover:scale-105 
              ${!isHealthy ? "animate-pulse" : ""}
            `}
          />
        </div>

        <p className={`mt-3 sm:mt-4 font-black text-sm tracking-wide ${isHealthy ? "text-emerald-600" : "text-amber-600"}`}>{isHealthy ? "🌳 Pohon Sehat & Subur" : "🍂 Pohon Layu (Butuh Nutrisi Sehat)"}</p>
      </div>

      <div className="space-y-2 border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Level {isHealthy ? "3 (Maju)" : "1 (Adaptasi)"}</span>
          <span className={isHealthy ? "text-emerald-600" : "text-amber-500"}>{displayPercentage}%</span>
        </div>

        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-200/30">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out 
              ${isHealthy ? "bg-emerald-500" : "bg-amber-500"}
            `}
            style={{ width: `${displayPercentage}%` }}
          />
        </div>

        <p className="text-center text-xs font-semibold text-slate-400/90 italic">{isHealthy ? "Pertahankan hidrasi dan aktivitas fisik untuk berevolusi!" : "Selesaikan 1 misi lagi agar pohon kembali segar!"}</p>
      </div>
    </div>
  );
};

export default HealthCharacterCard;
