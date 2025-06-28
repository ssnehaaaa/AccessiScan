import React, { useState } from "react";
import {
  LayoutDashboard,
  PlusSquare,
  FileText,
  BookOpen,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, to: "/dashboard" },
    { label: "New Scan", icon: <PlusSquare size={20} />, to: "/analyze" },
    { label: "Past Reports", icon: <FileText size={20} />, to: "/reports" },
    { label: "Accessibility Guidelines", icon: <BookOpen size={20} />, to: "/guidelines" },
    { label: "Settings", icon: <Settings size={20} />, to: "/settings" },
    { label: "Help/Support", icon: <HelpCircle size={20} />, to: "/support" },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } bg-white/70 backdrop-blur-lg shadow-xl border-r border-gray-200`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-300 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-extrabold text-indigo-700">🧭 Navigation</h1>}
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-indigo-600 focus:outline-none"
        >
          {collapsed ? <Menu size={22} /> : <X size={22} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.to;
            return (
              <li key={idx}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 shadow-sm"
                      : "text-gray-700 hover:bg-indigo-50"
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
