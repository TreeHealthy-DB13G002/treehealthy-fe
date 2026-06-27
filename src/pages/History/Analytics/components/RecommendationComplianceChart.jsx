import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { recommendationData } from "../data/recommendationData";

export default function RecommendationComplianceChart({ limit }) {
  const filteredData = recommendationData.slice(-limit);

  return (
    <div className="space-y-4">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }} barSize={limit === 2 ? 80 : 44}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />

            <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} dy={10} />

            <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(val) => `${val}%`} tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />

            <Tooltip
              formatter={(value) => [`${value}%`, "Completion Rate"]}
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

            <Bar dataKey="compliance" fill="#0284c7" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-2 pt-2 text-xs font-bold pl-2 text-slate-700">
        <span className="h-3 w-3 rounded-md bg-[#0284c7]" />
        <span>Completion Rate</span>
      </div>
    </div>
  );
}
