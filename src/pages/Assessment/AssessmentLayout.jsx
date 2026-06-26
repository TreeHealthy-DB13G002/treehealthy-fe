import StepIndicator from "./components/StepIndicator";

const AssessmentLayout = ({ children, step, totalSteps }) => {
  return (
    <div className="min-h-screen bg-slate-50/50 py-8 md:py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:gap-8 px-4 sm:px-6">
        <StepIndicator currentStep={step} totalSteps={totalSteps} />

        <div className="w-full transition-all duration-300 ease-in-out">{children}</div>
      </div>
    </div>
  );
};

export default AssessmentLayout;
