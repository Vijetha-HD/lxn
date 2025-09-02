import React from "react";
import MenuIcon from "../icons/MenuIcon";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

// Roles allowed to use dark mode
const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const DashboardHeader = ({
  userRole,
  setPage,
  user,
  darkMode,
  setDarkMode,
  toggleSidebar,
}) => {
  const enableDarkMode = rolesWithDarkMode.includes(userRole);
  const isDark = enableDarkMode && darkMode;

  return (
    <header
      className={`p-3 sm:p-4 flex justify-between items-center border-b sticky top-0 z-30 shadow-sm
        transition-colors duration-300
        ${isDark ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-900"}
      `}
    >
      {/* Left: Menu + Title */}
      <div className="flex items-center min-w-0 space-x-2 sm:space-x-4 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className={`md:hidden p-2 rounded transition-colors flex-shrink-0
            ${isDark ? "text-gray-900 hover:opacity-80" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}`}
          style={isDark ? { backgroundColor: '#fbbf24' } : {}}
          aria-label="Toggle sidebar"
        >
          <MenuIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? "text-gray-900" : "text-gray-900"}`} />
        </button>

        {/* App Title */}
        <div className="flex flex-col min-w-0 flex-1">
          <h1 className={`text-lg sm:text-xl lg:text-2xl font-extrabold truncate ${isDark ? "text-white" : "text-gray-900"}`}>
            <span className="hidden sm:inline">LXN Intelligence</span>
            <span className="sm:hidden">LXN</span>
          </h1>
          <p className={`text-xs mt-1 truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            <span className="hidden sm:inline">{userRole} Dashboard</span>
            <span className="sm:hidden">{userRole}</span>
          </p>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
        {/* Theme Toggle → only for allowed roles */}
        {enableDarkMode && (
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} userRole={userRole}/>
        )}

        <UserMenu user={user} setPage={setPage} userRole={userRole} darkMode={darkMode} />
      </div>
    </header>
  );
};

export default DashboardHeader;