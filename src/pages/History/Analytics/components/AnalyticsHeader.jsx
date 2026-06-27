import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AnalyticsHeader({ timeRange, onTimeRangeChange }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight">Health Analytics</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Visual analytics of your health progress over time</p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="w-[130px] rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-slate-700 shadow-3xs hover:bg-slate-50 focus:ring-0 focus:ring-offset-0 focus:outline-hidden transition-all duration-200 data-[state=open]:border-slate-300">
            <div className="flex items-center gap-1.5">
              <SelectValue placeholder="Select range" />
            </div>
          </SelectTrigger>

          <SelectContent
            position="popper"
            sideOffset={6}
            className="w-[130px] rounded-xl border border-slate-200/80 bg-white p-1 font-semibold text-slate-700 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 duration-150"
          >
            <SelectItem value="2-weeks" className="text-xs font-bold text-slate-600 focus:bg-slate-50 focus:text-[#0369a1] cursor-pointer rounded-lg py-2 px-3 transition-colors">
              2 Weeks
            </SelectItem>
            <SelectItem value="4-weeks" className="text-xs font-bold text-slate-600 focus:bg-slate-50 focus:text-[#0369a1] cursor-pointer rounded-lg py-2 px-3 transition-colors">
              4 Weeks
            </SelectItem>
            <SelectItem value="8-weeks" className="text-xs font-bold text-slate-600 focus:bg-slate-50 focus:text-[#0369a1] cursor-pointer rounded-lg py-2 px-3 transition-colors">
              8 Weeks
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
