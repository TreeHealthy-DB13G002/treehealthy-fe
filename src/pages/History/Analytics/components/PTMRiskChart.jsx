import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FiTrendingUp } from "react-icons/fi";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";

export default function PTMRiskChart({ filteredData = [] }) {
  const formattedData = filteredData.map((item) => ({
    week: item.week || item.label || "W1",
    score: item.score ?? item.value ?? 0,
  }));

  const baselineScore = formattedData.length > 0 ? formattedData[0].score : 0;
  const currentScore = formattedData.length > 0 ? formattedData[formattedData.length - 1].score : 0;

  if (formattedData.length === 0) {
    return (
      <Empty className="py-12 my-auto flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center mb-2">
          <FiTrendingUp size={24} />
        </div>
        <EmptyTitle className="text-sm font-bold text-slate-700">Belum Ada Data Tren Risiko PTM</EmptyTitle>
        <EmptyDescription className="text-xs text-slate-400 max-w-xs">Grafik tren risiko akan muncul secara otomatis setelah Anda menyelesaikan evaluasi mingguan.</EmptyDescription>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
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
              formatter={(value) => [`${value}%`, "Risiko PTM"]}
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

      <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs font-bold pl-2">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="h-3 w-3 rounded-full bg-[#0284c7]" />
          <span>Risiko PTM %</span>
        </div>
        <div className="text-slate-500">
          Awal Siklus: <span className="text-slate-800 font-extrabold">{baselineScore}%</span>
        </div>
        <div className="text-slate-500">
          Saat Ini: <span className="text-[#16a34a] font-extrabold">{currentScore}%</span>
        </div>
      </div>
    </div>
  );
}
