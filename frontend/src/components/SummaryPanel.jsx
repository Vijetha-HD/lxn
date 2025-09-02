import React, { useEffect, useState } from 'react';

// Roles allowed to use dark mode
const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

export default function SummaryPanel({ darkMode, userRole }) {
  const [summary, setSummary] = useState({ totalAmount: 0, totalSpent: 0 });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('budgets')) || [];
    const totals = saved.reduce(
      (acc, cur) => {
        acc.totalAmount += Number(cur.amount || 0);
        acc.totalSpent += Number(cur.spent || 0);
        return acc;
      },
      { totalAmount: 110000000, totalSpent: 64900000 }
    );
    setSummary(totals);
  }, []);

  const percent = summary.totalAmount
    ? (summary.totalSpent / summary.totalAmount) * 100
    : 0;

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  const enableDarkMode = rolesWithDarkMode.includes(userRole);
  const isDark = enableDarkMode && darkMode;

  // Dark mode progress bar colors
  const progressColor =
    percent < 50
      ? isDark ? 'bg-green-400' : 'bg-green-500'
      : percent < 80
      ? isDark ? 'bg-yellow-400' : 'bg-yellow-500'
      : isDark ? 'bg-red-400' : 'bg-red-500';

  return (
    <div className={`p-4 sm:p-6 rounded-lg shadow-md w-full transition-colors duration-300
      ${isDark ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-900'}`}
    >
      <h4 className={`font-semibold text-lg sm:text-xl ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
        Budget Summary
      </h4>

      {/* Totals */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <div className={`order-1 text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {formatCurrency(summary.totalSpent)}
        </div>
        <div className={`order-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
          / {formatCurrency(summary.totalAmount)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className={`w-full rounded-full h-3 overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div
            style={{ width: `${Math.min(100, percent)}%` }}
            className={`h-3 transition-all duration-500 ease-in-out ${progressColor}`}
          />
        </div>
        <div className={`text-xs mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {percent.toFixed(1)}% Spent
        </div>
      </div>
    </div>
  );
}
