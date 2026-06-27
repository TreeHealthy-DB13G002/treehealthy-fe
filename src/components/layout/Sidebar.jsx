import { useState } from "react";
import { FiGrid, FiClipboard, FiBarChart2, FiActivity, FiBookOpen, FiSettings, FiChevronDown, FiX } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

import logoApp from "@/assets/icons/treehealthy-logo.png";

const menus = [
  { name: "Health Assessment", icon: FiClipboard, path: "/assessment" },
  { name: "Dashboard", icon: FiGrid, path: "/dashboard" },
  {
    name: "History",
    icon: FiBarChart2,
    children: [
      { name: "Health Analytics", icon: FiActivity, path: "/analytics" },
      { name: "Journey Log", icon: FiBookOpen, path: "/journey-log" },
    ],
  },
  { name: "Settings", icon: FiSettings, path: "/settings" },
];

const Sidebar = ({ isCollapsed, isMobileOpen, closeSidebar }) => {
  const location = useLocation();
  const [historyOpen, setHistoryOpen] = useState(true);

  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 md:hidden" onClick={closeSidebar} />}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300
          md:static md:translate-x-0
          ${isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        <div className={`flex items-center justify-between border-b border-slate-100 py-4 px-6 ${isCollapsed ? "md:justify-center md:px-0" : "gap-3"}`}>
          <div className="flex items-center gap-3">
            <img src={logoApp} alt="TreeHealthy" className="h-9 w-9 object-contain" />
            {(!isCollapsed || isMobileOpen) && (
              <div>
                <h1 className="text-md font-bold text-sky-600 leading-none pt-1">TreeHealthy</h1>
                <p className="text-xs text-slate-500 mt-0.5">AI Health Planner</p>
              </div>
            )}
          </div>

          {isMobileOpen && (
            <button onClick={closeSidebar} className="text-slate-500 p-1 rounded-md hover:bg-slate-100 md:hidden">
              <FiX size={18} />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1.5">
            {menus.map((menu) => {
              const Icon = menu.icon;
              const isMenuCollapsed = isCollapsed && !isMobileOpen;

              if (menu.children) {
                const isActive = menu.children.some((child) => location.pathname.startsWith(child.path));

                return (
                  <li key={menu.name}>
                    <button
                      onClick={() => !isMenuCollapsed && setHistoryOpen(!historyOpen)}
                      className={`flex w-full items-center rounded-xl py-2.5 transition-all duration-200 cursor-pointer
                      ${isMenuCollapsed ? "justify-center" : "justify-between px-4"}
                      ${isActive ? "bg-sky-50 text-sky-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        {!isMenuCollapsed && <span className="text-sm font-medium">{menu.name}</span>}
                      </div>
                      {!isMenuCollapsed && <FiChevronDown size={14} className={`transition-transform duration-300 ${historyOpen ? "rotate-180" : ""}`} />}
                    </button>

                    {!isMenuCollapsed && historyOpen && (
                      <ul className="mt-1 ml-5 space-y-1 border-l border-slate-200 pl-4">
                        {menu.children.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <li key={child.name}>
                              <NavLink
                                to={child.path}
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                                  ${isActive ? "bg-sky-100 font-semibold text-sky-700" : "text-slate-600 hover:bg-slate-50"}`
                                }
                              >
                                <ChildIcon size={14} />
                                {child.name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={menu.name}>
                  <NavLink
                    to={menu.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center rounded-xl py-2.5 transition-all duration-200
                      ${isMenuCollapsed ? "justify-center" : "gap-3 px-4"}
                      ${isActive ? "bg-sky-100 font-semibold text-sky-700" : "text-slate-600 hover:bg-slate-50"}`
                    }
                  >
                    <Icon size={18} />
                    {!isMenuCollapsed && <span className="text-sm font-medium">{menu.name}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-100 p-4 shrink-0">
          <div className={`flex rounded-xl bg-slate-50 p-2.5 ${isCollapsed && !isMobileOpen ? "justify-center" : "items-center gap-3"}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">A</div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-700 truncate">Alexander Ibraheem</p>
                <p className="text-xs text-slate-400 truncate">Premium Member</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
