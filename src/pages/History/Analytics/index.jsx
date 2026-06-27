import { useState } from "react";
import AnalyticsHeader from "./components/AnalyticsHeader";
import ChartCard from "./components/ChartCard";
import PTMRiskChart from "./components/PTMRiskChart";
import RecommendationComplianceChart from "./components/RecommendationComplianceChart";

export default function HealthAnalytics() {
  const [timeRange, setTimeRange] = useState("8-weeks");

  const getLimit = () => {
    if (timeRange === "2-weeks") return 2;
    if (timeRange === "4-weeks") return 4;
    return 8;
  };

  const limit = getLimit();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl space-y-6">
        <AnalyticsHeader timeRange={timeRange} onTimeRangeChange={setTimeRange} />

        <div className="space-y-6">
          <ChartCard title="PTM Risk Score Trend" subtitle="Weekly fluctuation of your composite risk percentage" badgeText="-16% improvement" badgeType="success">
            <PTMRiskChart limit={limit} />
          </ChartCard>

          <ChartCard title="Task Compliance Rate" subtitle="Weekly completion percentage of daily health tasks" badgeText="Avg: 81%" badgeType="info">
            <RecommendationComplianceChart limit={limit} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
