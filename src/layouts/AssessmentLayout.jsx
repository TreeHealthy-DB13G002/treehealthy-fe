import { Outlet } from "react-router-dom";

const AssessmentLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Outlet />
    </div>
  );
};

export default AssessmentLayout;
