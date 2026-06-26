const QuestionOptions = ({ options, value, onChange }) => {
  return (
    <div className="h-[260px] flex flex-col justify-start space-y-3 mt-2">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              w-full rounded-2xl border p-4 text-left font-semibold text-sm transition-all duration-200 cursor-pointer
              transform active:scale-[0.99] select-none shrink-0 h-[54px] flex items-center
              ${isSelected ? "border-brand-primary bg-brand-primary/5 text-brand-secondary shadow-xs" : "border-gray-200 bg-white text-brand-text hover:border-brand-primary/60 hover:bg-slate-50/50"}
            `}
          >
            <div className="flex items-center gap-3 w-full">
              <div
                className={`
                  h-4 w-4 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200
                  ${isSelected ? "border-brand-primary bg-brand-primary" : "border-gray-300"}
                `}
              >
                {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
              </div>

              <span className="leading-snug flex items-center flex-1 w-full min-w-0">
                {option.emoji && <span className="mr-2 text-base shrink-0">{option.emoji}</span>}
                <span className="block text-left">{option.label}</span>
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default QuestionOptions;
