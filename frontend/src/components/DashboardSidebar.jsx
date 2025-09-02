import React from "react";
import Logo from "./Logo";
import XIcon from "../icons/XIcon";
import BarChartIcon from "../icons/BarChartIcon";
import UsersIcon from "../icons/UsersIcon";
import TargetIcon from "../icons/TargetIcon";
import TrendingUpIcon from "../icons/TrendingUpIcon";
import FileTextIcon from "../icons/FileTextIcon";
import SunIcon from "../icons/SunIcon";
import DollarSignIcon from "../icons/DollarSignIcon";
import CalendarIcon from "../icons/CalendarIcon";
import MicIcon from "../icons/MicIcon";
import LineChartIcon from "../icons/LineChartIcon";

// Roles allowed to use dark mode
const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

// Sidebar items per role
const navData = {
  "Campaign Manager": [
    { name: "Main Dashboard", icon: <BarChartIcon /> },
    { name: "Budget Tracker", icon: <DollarSignIcon /> },
    { name: "Competitor Analysis", icon: <UsersIcon /> },
    { name: "Event Management", icon: <CalendarIcon /> },
    { name: "Ad Campaign Performance", icon: <TrendingUpIcon /> },
  ],
  "Data Analyst": [
    { name: "Main Dashboard", icon: <BarChartIcon /> },
    { name: "Data Pipeline", icon: <LineChartIcon /> },
    { name: "Model Performance", icon: <TrendingUpIcon /> },
  ],
  Candidate: [
    { name: "Main Dashboard", icon: <BarChartIcon /> },
    { name: "Daily Briefing", icon: <SunIcon /> },
    { name: "Speeches & Talking Points", icon: <MicIcon /> },
  ],
  "Field Organizer": [
    { name: "Main Dashboard", icon: <BarChartIcon /> },
    { name: "Volunteer Management", icon: <UsersIcon /> },
    { name: "GOTV Dashboard", icon: <TargetIcon /> },
  ],
  "Communications Director": [
    { name: "Main Dashboard", icon: <BarChartIcon /> },
    { name: "Press Releases", icon: <FileTextIcon /> },
    { name: "Social Media Planner", icon: <CalendarIcon /> },
  ],
};

const DashboardSidebar = ({
  userRole,
  activeScreen,
  setActiveScreen,
  isOpen,
  setIsOpen,
  darkMode,
}) => {
  const navItems = navData[userRole] || [];
  const enableDarkMode = rolesWithDarkMode.includes(userRole);
  const isDark = enableDarkMode && darkMode;

  const sidebarContent = (
    <div
      className={`flex flex-col h-full transition-colors duration-300
        ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
    >
      {/* Logo */}
      <div className="flex justify-center items-center py-6 relative">
        <Logo />
        <button
          onClick={() => setIsOpen(false)}
          className={`absolute right-4 md:hidden p-2 rounded transition-colors
            ${isDark ? "text-gray-900 hover:opacity-80" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}`}
          style={isDark ? { backgroundColor: '#fbbf24' } : {}}
          aria-label="Close sidebar"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 overflow-y-auto flex-1">
        {navItems.map((item) => {
          const isActive = item.name === activeScreen;

          // Dark mode: yellow buttons for non-active, different styling for active
          const buttonClasses = isDark
            ? isActive
              ? "bg-primaryAccent text-black shadow-md rounded-lg transition-colors"
              : "text-gray-900 hover:opacity-80 shadow-md rounded-lg transition-colors" 
            : isActive
              ? "bg-primaryAccent text-black shadow-md border-l-4 border-purple-500 rounded-lg transition-colors"
              : "text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors";

          const iconClasses = isDark 
            ? isActive 
              ? "text-black" 
              : "text-gray-900"
            : isActive 
              ? "text-black" 
              : "text-primaryAccent";

          return (
            <button
              key={item.name}
              onClick={() => {
                setActiveScreen(item.name);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 font-medium ${buttonClasses}`}
              style={isDark && !isActive ? { backgroundColor: '#fbbf24' } : {}}
              aria-current={isActive ? "page" : undefined}
            >
              <div className={`w-6 h-6 flex-shrink-0 ${iconClasses}`}>
                {item.icon}
              </div>
              <span className="flex-grow">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 shadow-lg z-50 transform transition-transform duration-300 md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="w-64 hidden md:flex flex-col flex-shrink-0">
        {sidebarContent}
      </aside>
    </>
  );
};

export default DashboardSidebar;