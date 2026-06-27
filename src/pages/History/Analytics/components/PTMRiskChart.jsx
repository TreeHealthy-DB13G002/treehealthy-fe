import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ptmRiskData } from "../data/ptmRiskData";

export default function PTMRiskChart({ limit }) {
  const filteredData = ptmRiskData.slice(-limit);

  return (
    <div className="space-y-4">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="analyticsRiskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />

            <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} dy={10} />

            <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(val) => `${val}%`} tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />

            <Tooltip
              formatter={(value) => [`${value}%`, "PTM Risk"]}
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                color: "#0f172a",
                fontSize: "12px",
                fontWeight: "600",
              }}
            />

            <Area type="monotone" dataKey="score" stroke="none" fill="url(#analyticsRiskGradient)" connectNulls />
            <Area type="monotone" dataKey="score" stroke="#0284c7" strokeWidth={3} fill="none" dot={{ r: 4, fill: "#0284c7", strokeWidth: 0 }} activeDot={{ r: 6, fill: "#0369a1", strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 pt-2 text-xs font-bold pl-2">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="h-3 w-3 rounded-full bg-[#0284c7]" />
          <span>PTM Risk %</span>
        </div>
        <div className="text-slate-500">
          Baseline: <span className="text-slate-800 font-extrabold">34%</span>
        </div>
        <div className="text-slate-500">
          Current: <span className="text-[#16a34a] font-extrabold">18%</span>
        </div>
      </div>
    </div>
  );
}
