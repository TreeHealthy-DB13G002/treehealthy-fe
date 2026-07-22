import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FiCheckSquare } from "react-icons/fi";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty";

export default function RecommendationComplianceChart({ limit, filteredData = [] }) {
  const formattedData = filteredData.map((item) => ({
    week: item.week || item.label || "W1",
    compliance: item.compliance ?? item.score ?? item.value ?? 0,
  }));

  if (formattedData.length === 0) {
    return (
      <Empty className="py-12 my-auto flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center mb-2">
          <FiCheckSquare size={24} />
        </div>
        <EmptyTitle className="text-sm font-bold text-slate-700">Belum Ada Data Kepatuhan</EmptyTitle>
        <EmptyDescription className="text-xs text-slate-400 max-w-xs">Selesaikan misi dan ceklis aktivitas harian Anda untuk melihat tingkat kepatuhan mingguan.</EmptyDescription>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }} barSize={limit === 2 ? 80 : 44}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(val) => `${val}%`} tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />

            <Tooltip
              formatter={(value) => [`${value}%`, "Tingkat Kepatuhan"]}
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
        <span>Rasio Keberhasilan Misi Harian</span>
      </div>
    </div>
  );
}
