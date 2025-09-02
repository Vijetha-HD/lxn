import React, { useState, useEffect, useRef } from "react";

// Page imports
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

// Roles allowed to use dark mode
const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

export default function App() {
  const [page, setPage] = useState("landing"); // 'landing', 'login', 'dashboard'
  const [userRole, setUserRole] = useState(null);

  // Default: moon visible → light mode (white page)
  const [darkMode, setDarkMode] = useState(false);
  const landingPageRef = useRef(null);

  const user = {
    name: userRole ? userRole.split(" ")[0] : "Guest",
    email: userRole ? `${userRole.split(" ")[0].toLowerCase()}@lxn.app` : "",
  };

  useEffect(() => {
    const enableDark = rolesWithDarkMode.includes(userRole);

    if (darkMode && enableDark) {
      // Sun icon → enable dark page
      document.documentElement.classList.add("dark");
    } else {
      // Moon icon OR user not allowed → force light page
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, userRole]);

  const renderPage = () => {
    switch (page) {
      case "login":
        return (
          <LoginPage
            setPage={setPage}
            setUserRole={setUserRole}
            landingPageRef={landingPageRef}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            userRole={userRole}
            setPage={setPage}
            user={user}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        );
      case "landing":
      default:
        return (
          <LandingPage ref={landingPageRef} page={page} setPage={setPage} />
        );
    }
  };

  return (
    <div
      className="
        min-h-screen 
        flex flex-col
        antialiased 
        transition-colors duration-300 
        bg-white text-gray-900 
        dark:bg-gray-900 dark:text-gray-100
      "
    >
      {renderPage()}
    </div>
  );
}
