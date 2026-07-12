import HealthCharacterCard from "../components/HealthCharacterCard";
import DailyChecklistCard from "../components/DailyChecklistCard";

const DashboardContent = ({ currentProgress, onProgressChange, isEvalMode = false, currentPlanDay, weekStartDate }) => {
  return (
    <div className="grid gap-6 md:grid-cols-5 items-start">
      <div className="md:col-span-2 h-full">
        <HealthCharacterCard currentProgress={currentProgress} />
      </div>

      <div className="md:col-span-3 h-full">
        <DailyChecklistCard key={`${weekStartDate}-day-${currentPlanDay}`} onProgressChange={onProgressChange} isEvalMode={isEvalMode} currentPlanDay={currentPlanDay} />
      </div>
    </div>
  );
};

export default DashboardContent;
