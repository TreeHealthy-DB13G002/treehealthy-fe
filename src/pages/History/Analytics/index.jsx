import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";
import AnalyticsHeader from "./components/AnalyticsHeader";
import ChartCard from "./components/ChartCard";
import PTMRiskChart from "./components/PTMRiskChart";
import RecommendationComplianceChart from "./components/RecommendationComplianceChart";
import { analyticsService } from "@/services/analyticsServices";

export default function HealthAnalytics() {
  const [timeRange, setTimeRange] = useState("8-weeks");
  const [isLoading, setIsLoading] = useState(true);

  const [ptmRiskData, setPtmRiskData] = useState([]);
  const [complianceData, setComplianceData] = useState([]);

  useEffect(() => {
    const fetchChartsData = async () => {
      try {
        setIsLoading(true);
        const response = await analyticsService.getCharts();
        const data = response.data?.data || response.data || {};

        setPtmRiskData(data.ptm_risk || data.risk_trends || []);
        setComplianceData(data.compliance || data.compliance_trends || []);
      } catch (error) {
        console.error("Fetch Analytics Error:", error);
        toast.error("Gagal memuat data grafik analitik");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartsData();
  }, []);

  const getLimit = () => {
    if (timeRange === "2-weeks") return 2;
    if (timeRange === "4-weeks") return 4;
    return 8;
  };

  const limit = getLimit();

  const currentRiskData = ptmRiskData.slice(-limit);
  const currentComplianceData = complianceData.slice(-limit);

  let riskBadgeText = "Tidak ada data";
  if (currentRiskData.length > 1) {
    const firstScore = currentRiskData[0].score ?? currentRiskData[0].value ?? 0;
    const lastScore = currentRiskData[currentRiskData.length - 1].score ?? currentRiskData[currentRiskData.length - 1].value ?? 0;
    const improvement = firstScore - lastScore;

    if (improvement > 0) {
      riskBadgeText = `Perbaikan ${improvement}%`;
    } else if (improvement < 0) {
      riskBadgeText = `Naik ${Math.abs(improvement)}%`;
    } else {
      riskBadgeText = "Stabil";
    }
  } else if (currentRiskData.length === 1) {
    riskBadgeText = `Skor: ${currentRiskData[0].score ?? currentRiskData[0].value ?? 0}%`;
  }

  let avgComplianceText = "Avg: 0%";
  if (currentComplianceData.length > 0) {
    const total = currentComplianceData.reduce((sum, item) => sum + (item.compliance ?? item.score ?? item.value ?? 0), 0);
    const avg = Math.round(total / currentComplianceData.length);
    avgComplianceText = `Rata-rata: ${avg}%`;
  }

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center gap-2 text-slate-400 font-medium">
        <FiLoader className="animate-spin text-xl text-sky-600" />
        <span>Memuat data analitik...</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 text-left">
      <AnalyticsHeader timeRange={timeRange} onTimeRangeChange={setTimeRange} />

      <div className="space-y-6">
        <ChartCard title="Tren Skor Risiko PTM" subtitle="Fluktuasi mingguan dari persentase risiko komposit PTM Anda" badgeText={riskBadgeText} badgeType="success">
          <PTMRiskChart filteredData={currentRiskData} />
        </ChartCard>

        <ChartCard title="Tingkat Kepatuhan Aktivitas Sehat" subtitle="Persentase penyelesaian mingguan dari target ceklis harian Anda" badgeText={avgComplianceText} badgeType="info">
          <RecommendationComplianceChart limit={limit} filteredData={currentComplianceData} />
        </ChartCard>
      </div>
    </div>
  );
}
