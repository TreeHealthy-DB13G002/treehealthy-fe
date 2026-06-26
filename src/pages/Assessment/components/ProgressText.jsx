const ProgressText = ({ current, total }) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="mb-6 flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-wider text-brand-text opacity-80">
        Question {current} <span className="text-gray-300 mx-1">/</span> {total}
      </span>

      <span className="text-sm font-black text-brand-primary tracking-tight">{percentage}%</span>
    </div>
  );
};

export default ProgressText;
