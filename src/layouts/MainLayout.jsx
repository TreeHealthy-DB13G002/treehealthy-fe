import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-100 overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} closeSidebar={() => setIsMobileOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden w-full">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 text-slate-700 bg-slate-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
