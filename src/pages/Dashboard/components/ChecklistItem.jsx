import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const colors = {
  completed: "bg-[#e2f9e9] border-[#bbf3cd] text-[#14532d]",
  in_progress: "bg-[#e0f2fe] border-[#bae6fd] text-[#0369a1]",
  failed: "bg-[#ffeeeb] border-[#fecdd3] text-[#991b1b]",
};

const badges = {
  completed: "text-[#14532d]",
  in_progress: "text-[#0369a1]",
  failed: "text-[#991b1b]",
};

const labels = {
  completed: "Done",
  in_progress: "In Progress",
  failed: "Failed",
};

const ChecklistItem = ({ title, status, description, onCheck }) => {
  // 🌟 FIX: Normalisasi status agar mendukung format String ("completed") maupun Boolean (is_completed: true)
  let normalizedStatus = status;
  if (typeof status === "boolean") {
    normalizedStatus = status ? "completed" : "in_progress";
  } else if (!colors[status]) {
    normalizedStatus = "in_progress"; // Fallback aman
  }

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl sm:rounded-[28px] border p-4 sm:px-4 sm:py-2.5 transition-all duration-300 shadow-3xs ${colors[normalizedStatus]}`}>
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
        {normalizedStatus === "completed" && (
          <span className="text-xl shrink-0 select-none filter drop-shadow-xs mt-0.5 sm:mt-0 text-[#16a34a]">
            <FiCheckCircle size={24} />
          </span>
        )}

        {normalizedStatus === "in_progress" && (
          <button
            type="button"
            onClick={onCheck}
            className="w-6 h-6 rounded-full border-2 border-[#0284c7] bg-white shrink-0 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-3xs flex items-center justify-center focus:outline-hidden mt-0.5 sm:mt-0"
          />
        )}

        {normalizedStatus === "failed" && (
          <div className="text-[#ef4444] shrink-0 font-black text-xl select-none leading-none mt-0.5 sm:mt-0">
            <FiAlertCircle size={24} />
          </div>
        )}

        <div className="min-w-0 text-left space-y-0.5">
          <p className={`text-sm font-bold tracking-tight break-words ${normalizedStatus === "completed" ? "line-through opacity-50 font-medium" : "text-slate-800"}`}>{title}</p>

          {description && (
            <p className={`text-xs font-medium leading-normal break-words sm:truncate ${normalizedStatus === "completed" ? "line-through opacity-40" : normalizedStatus === "failed" ? "text-slate-500" : "text-slate-600"}`}>{description}</p>
          )}
        </div>
      </div>

      <span className={`rounded-full bg-white px-4 py-1 sm:py-1.5 text-xs font-bold shadow-3xs border border-slate-100 shrink-0 select-none self-start sm:self-auto ${badges[normalizedStatus]}`}>{labels[normalizedStatus]}</span>
    </div>
  );
};

export default ChecklistItem;
