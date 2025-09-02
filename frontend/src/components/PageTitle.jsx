import React from "react";

const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const PageTitle = ({ title, subtitle, userRole, darkMode }) => {
  const enableDark = rolesWithDarkMode.includes(userRole) && darkMode;

  // Colors for dark/light pages
  const mainTitleColor = enableDark ? "#f9fafb" : "#111827"; // white vs black
  const subtitleColor = enableDark ? "#d1d5db" : "#4b5563"; // lighter shades
  const dividerColor = enableDark ? "#fbbf24" : "#f59e0b"; // yellow shades

  return (
    <div className="mb-6 animate-fadeIn">
      {/* Main Title */}
      <h1
        style={{ color: mainTitleColor }}
        className="
          text-2xl sm:text-3xl lg:text-4xl xl:text-5xl
          font-bold tracking-tight
        "
      >
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{ color: subtitleColor }}
          className="
            text-sm sm:text-base lg:text-lg xl:text-xl
            mt-2 max-w-2xl leading-relaxed
          "
        >
          {subtitle}
        </p>
      )}

      {/* Decorative Divider */}
      <div
        style={{ backgroundColor: dividerColor }}
        className="mt-4 w-16 h-1 rounded-full"
      ></div>
    </div>
  );
};

export default PageTitle;
