const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mx-auto w-full max-w-5xl px-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isCompleted = currentStep > step;
        const isActive = currentStep === step;

        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div
              className={`
                flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold tracking-tight transition-all duration-300
                ${isCompleted || isActive ? "bg-brand-primary text-white shadow-xs" : "bg-gray-100 text-brand-text/60 border border-gray-200"}
              `}
            >
              {step}
            </div>

            {step !== totalSteps && (
              <div className="h-0.5 flex-1 mx-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full bg-brand-primary transition-all duration-500 ease-in-out`} style={{ width: isCompleted ? "100%" : "0%" }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
