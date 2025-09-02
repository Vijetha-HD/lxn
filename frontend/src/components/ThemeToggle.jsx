import React from "react";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

// Roles that actually get dark mode
const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const ThemeToggle = ({ userRole, darkMode, setDarkMode }) => {
  const enableDarkMode = rolesWithDarkMode.includes(userRole);
  const isDark = enableDarkMode && darkMode;

  const handleToggle = () => {
    // Always flip icon
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 sm:p-2.5 lg:p-3 rounded-full transition-colors flex items-center justify-center flex-shrink-0
        ${isDark
          ? "text-gray-900 hover:opacity-80"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
      style={isDark ? { backgroundColor: '#fbbf24' } : {}}
      aria-label="Toggle dark mode"
    >
      {/* Moon = light page, Sun = dark page */}
      {darkMode ? (
        <SunIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      ) : (
        <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;