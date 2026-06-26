import AssessmentCard from "./AssessmentCard";

const QuestionCard = ({ title, hint, children }) => {
  return (
    <AssessmentCard>
      <div className="flex flex-col h-full justify-between space-y-4">
        <div className="text-left space-y-1 min-h-[50px]">
          <h2 className="text-base font-bold text-brand-secondary leading-snug md:text-lg tracking-tight">{title}</h2>
          {hint && <p className="text-2xs font-medium text-slate-400 italic leading-normal">{hint}</p>}
        </div>

        <div className="flex-1 flex flex-col justify-between">{children}</div>
      </div>
    </AssessmentCard>
  );
};

export default QuestionCard;
