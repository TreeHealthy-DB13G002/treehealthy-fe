import { useEffect, useState } from "react";
import { FiClock, FiLogOut, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const time = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime(time);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4  shrink-0">
      <div className="flex items-center gap-3 md:gap-4">
        <button onClick={toggleSidebar} className="rounded-lg p-2 transition hover:bg-slate-100 active:scale-95 text-slate-600">
          <FiMenu size={20} />
        </button>
        <h2 className="text-lg md:text-xl font-bold text-slate-800">Dashboard</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
          <FiClock size={16} className="text-slate-600" />
          <span className="font-mono text-sm md:text-base font-semibold text-slate-700">{currentTime}</span>
        </div>

        <button onClick={handleLogout} className="flex items-center gap-2 rounded-xl bg-red-500 p-2.5 sm:px-4 sm:py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95 cursor-pointer">
          <FiLogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
