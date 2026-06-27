import HealthCharacterCard from "../components/HealthCharacterCard";
import DailyChecklistCard from "../components/DailyChecklistCard";

const DashboardContent = ({ currentProgress, onProgressChange, isEvalMode = false }) => {
  return (
    <div className="grid gap-6 md:grid-cols-5 items-start">
      <div className="md:col-span-2 h-full">
        <HealthCharacterCard currentProgress={currentProgress} />
      </div>

      <div className="md:col-span-3 h-full">
        <DailyChecklistCard onProgressChange={onProgressChange} isEvalMode={isEvalMode} />
      </div>
    </div>
  );
};

export default DashboardContent;
