const AssessmentCard = ({ children }) => {
  return (
    <div
      className="
        flex
        min-h-[460px]
        flex-col
        justify-between
        rounded-3xl
        border
        border-gray-100
        bg-white
        p-5
        sm:p-10
        shadow-[0_8px_30px_rgb(0,0,0,0.02)]
        transition-all
        duration-300
      "
    >
      {children}
    </div>
  );
};

export default AssessmentCard;
