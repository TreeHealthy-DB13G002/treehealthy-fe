import { FiLock, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const colors = {
  completed: "bg-[#e2f9e9] border-[#bbf3cd] text-[#14532d]",
  locked: "bg-[#f1f1f1] border-[#e2e2e2] text-[#475569]",
  in_progress: "bg-[#e0f2fe] border-[#bae6fd] text-[#0369a1]",
  failed: "bg-[#ffeeeb] border-[#fecdd3] text-[#991b1b]",
};

const badges = {
  completed: "text-[#14532d]",
  locked: "text-[#475569]",
  in_progress: "text-[#0369a1]",
  failed: "text-[#991b1b]",
};

const labels = {
  completed: "Done",
  locked: "Locked",
  in_progress: "In Progress",
  failed: "Failed",
};

const ChecklistItem = ({ title, status, description, timeLockDesc, onCheck }) => {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl sm:rounded-[28px] border p-4 sm:px-4 sm:py-2.5 transition-all duration-300 shadow-3xs ${colors[status]}`}>
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
        {status === "completed" && (
          <span className="text-xl shrink-0 select-none filter drop-shadow-xs mt-0.5 sm:mt-0 text-[#16a34a]">
            <FiCheckCircle size={24} />
          </span>
        )}

        {status === "locked" && (
          <span className="text-xl shrink-0 select-none filter drop-shadow-xs mt-0.5 sm:mt-0 text-[#64748b]">
            <FiLock size={24} />
          </span>
        )}

        {status === "in_progress" && (
          <button
            type="button"
            onClick={onCheck}
            className="w-6 h-6 rounded-full border-2 border-[#0284c7] bg-white shrink-0 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-3xs flex items-center justify-center focus:outline-hidden mt-0.5 sm:mt-0"
          />
        )}

        {status === "failed" && (
          <div className="text-[#ef4444] shrink-0 font-black text-xl select-none leading-none mt-0.5 sm:mt-0">
            <FiAlertCircle size={24} />
          </div>
        )}

        <div className="min-w-0 text-left space-y-0.5">
          <p className={`text-sm font-bold tracking-tight break-words ${status === "completed" ? "line-through opacity-50 font-medium" : "text-slate-800"}`}>{title}</p>

          {description && (
            <p className={`text-xs font-medium leading-normal break-words sm:truncate ${status === "completed" ? "line-through opacity-40" : status === "locked" || status === "failed" ? "text-slate-500" : "text-slate-600"}`}>
              {description}
            </p>
          )}

          {timeLockDesc && <p className="text-xs font-medium text-slate-400/90 flex items-center gap-1 pt-0.5">{timeLockDesc}</p>}
        </div>
      </div>

      <span className={`rounded-full bg-white px-4 py-1 sm:py-1.5 text-xs font-bold shadow-3xs border border-slate-100 shrink-0 select-none self-start sm:self-auto ${badges[status]}`}>{labels[status]}</span>
    </div>
  );
};

export default ChecklistItem;
