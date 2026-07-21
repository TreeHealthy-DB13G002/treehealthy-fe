import HealthCharacterCard from "../components/HealthCharacterCard";
import DailyChecklistCard from "../components/DailyChecklistCard";

const DashboardContent = ({ tasks, currentProgress, treeHealth, onToggleTask, currentPlanDay, isLoading, isError, onRetry }) => {
  return (
    <div className="grid gap-6 md:grid-cols-5 items-start">
      <div className="md:col-span-2 h-full">
        <HealthCharacterCard currentProgress={currentProgress} treeHealth={treeHealth} />
      </div>

      <div className="md:col-span-3 h-full">
        <DailyChecklistCard tasks={tasks} onToggleTask={onToggleTask} currentPlanDay={currentPlanDay} isLoading={isLoading} isError={isError} onRetry={onRetry} />
      </div>
    </div>
  );
};

export default DashboardContent;
