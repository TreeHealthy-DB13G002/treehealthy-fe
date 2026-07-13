import { useState } from "react";
import AnalyticsHeader from "./components/AnalyticsHeader";
import ChartCard from "./components/ChartCard";
import PTMRiskChart from "./components/PTMRiskChart";
import RecommendationComplianceChart from "./components/RecommendationComplianceChart";
import { ptmRiskData } from "./data/ptmRiskData";
import { recommendationData } from "./data/recommendationData";

export default function HealthAnalytics() {
  const [timeRange, setTimeRange] = useState("8-weeks");

  const getLimit = () => {
    if (timeRange === "2-weeks") return 2;
    if (timeRange === "4-weeks") return 4;
    return 8;
  };

  const limit = getLimit();

  // ─── 🌟 KALKULASI DINAMIS BERDASARKAN FILTER WAKTU ───
  const currentRiskData = ptmRiskData.slice(-limit);
  const currentComplianceData = recommendationData.slice(-limit);

  // 1. Hitung Perbaikan Risiko PTM (% Penurunan dari awal range ke akhir range)
  let riskBadgeText = "Tidak ada data";
  if (currentRiskData.length > 1) {
    const firstScore = currentRiskData[0].score;
    const lastScore = currentRiskData[currentRiskData.length - 1].score;
    const improvement = firstScore - lastScore; // Positif berarti risiko turun
    riskBadgeText = `${improvement > 0 ? " Perbaikan " : ""}${improvement}%`;
  } else if (currentRiskData.length === 1) {
    riskBadgeText = `Skor: ${currentRiskData[0].score}%`;
  }

  // 2. Hitung Rata-rata Kepatuhan Tugas Tugas
  let avgComplianceText = "Avg: 0%";
  if (currentComplianceData.length > 0) {
    const total = currentComplianceData.reduce((sum, item) => sum + item.compliance, 0);
    const avg = Math.round(total / currentComplianceData.length);
    avgComplianceText = `Rata-rata: ${avg}%`;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 text-left">
        <AnalyticsHeader timeRange={timeRange} onTimeRangeChange={setTimeRange} />

        <div className="space-y-6">
          {/* Chart 1: Tren Risiko PTM */}
          <ChartCard title="Tren Skor Risiko PTM" subtitle="Fluktuasi mingguan dari persentase risiko komposit PTM Anda" badgeText={riskBadgeText} badgeType="success">
            <PTMRiskChart limit={limit} filteredData={currentRiskData} />
          </ChartCard>

          {/* Chart 2: Kepatuhan Tugas */}
          <ChartCard title="Tingkat Kepatuhan Aktivitas Sehat" subtitle="Persentase penyelesaian mingguan dari target ceklis harian Anda" badgeText={avgComplianceText} badgeType="info">
            <RecommendationComplianceChart limit={limit} filteredData={currentComplianceData} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
