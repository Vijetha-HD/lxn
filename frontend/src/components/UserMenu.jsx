import React, { useState } from 'react';
import ChevronsUpDownIcon from '../icons/ChevronsUpDownIcon';
import LogOutIcon from '../icons/LogOutIcon';

const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const UserMenu = ({ user, setPage, userRole, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const enableDarkMode = rolesWithDarkMode.includes(userRole);
  const isDark = enableDarkMode && darkMode;

  const yellowBg = '#fbbf24'; // Tailwind yellow-400
  const blueHover = '#3b82f6'; // Tailwind blue-500

  return (
    <div className="relative">
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={isDark ? { backgroundColor: yellowBg, color: '#111827' } : {}}
        onMouseEnter={(e) => { if (isDark) e.currentTarget.style.backgroundColor = blueHover; }}
        onMouseLeave={(e) => { if (isDark) e.currentTarget.style.backgroundColor = yellowBg; }}
        className="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 rounded-lg transition-colors"
      >
        <i className="bi bi-person-circle text-2xl sm:text-3xl"></i>
        <span className="hidden md:inline text-sm lg:text-base truncate max-w-24 lg:max-w-32">
          {user.name}
        </span>
        <ChevronsUpDownIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
      </button>

      {isOpen && (
        <>
          {/* Mobile overlay */}
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>

          {/* Dropdown menu */}
          <div
            style={isDark ? { backgroundColor: '#111827', borderColor: '#374151' } : {}}
            className="absolute right-0 mt-1 sm:mt-2 w-40 sm:w-48 rounded-md shadow-lg py-1 z-50 border transition-colors"
          >
            {['Profile', 'Settings'].map((item) => (
              <a
                key={item}
                href="#"
                style={isDark ? { color: '#111827', backgroundColor: yellowBg } : {}}
                onMouseEnter={(e) => { if (isDark) e.currentTarget.style.backgroundColor = blueHover; }}
                onMouseLeave={(e) => { if (isDark) e.currentTarget.style.backgroundColor = yellowBg; }}
                className="block px-3 sm:px-4 py-2 mb-0.5 text-xs sm:text-sm rounded transition-colors"
              >
                {item}
              </a>
            ))}

            <div
              className="border-t my-1 mx-2"
              style={isDark ? { borderColor: '#374151' } : {}}
            ></div>

            <button
              onClick={() => setPage('login')}
              style={{ color: isDark ? '#dc2626' : '#b91c1c', backgroundColor: isDark? yellowBg:"" }}
              onMouseEnter={(e) => { if (isDark) e.currentTarget.style.backgroundColor = blueHover; }}
              onMouseLeave={(e) => { if (isDark) e.currentTarget.style.backgroundColor = yellowBg; }}
              className="w-full text-left flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm rounded transition-colors"
            >
              <LogOutIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
