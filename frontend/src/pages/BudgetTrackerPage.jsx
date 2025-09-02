import React, { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import SummaryPanel from '../components/SummaryPanel';
import { CategoryPie, TimeSeries } from '../components/CategoryChart';
import BudgetFormModal from '../components/BudgetFormModal';
import mockData from '../data/mockData';

// Roles allowed to use dark mode
const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

export default function BudgetTrackerPage({ userRole, darkMode }) {
  const STORAGE_KEY = 'campaignBudgets';

  const [budgets, setBudgets] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : mockData.budget.categories;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
  }, [budgets]);

  const totalBudget = budgets.reduce((sum, b) => sum + b.total, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  const enableDarkMode = rolesWithDarkMode.includes(userRole);
  const isDark = enableDarkMode && darkMode; // Sun icon → dark page, Moon icon → light page

  const handleAddBudget = (newBudget) => {
    setBudgets((prev) => [
      ...prev,
      { ...newBudget, total: Number(newBudget.total), spent: Number(newBudget.spent) }
    ]);
    setIsModalOpen(false);
  };

  return (
    <div className={`min-h-screen space-y-6 px-4 sm:px-6 lg:px-8 pb-8 transition-colors duration-300
      ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageTitle
        userRole={userRole}
        darkMode={darkMode}
          title="💰 Budget Tracker"
          subtitle="Real-time overview of campaign budget allocations and spending."
        />
      </div>

      {/* Summary */}
      <Card className={`p-4 sm:p-6 shadow-lg border rounded-xl transition-colors duration-300
        ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}` }
      darkMode={isDark} userRole={userRole}>
        <SummaryPanel total={totalBudget} spent={totalSpent} categories={budgets} darkMode={isDark} userRole={userRole} />
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`p-4 sm:p-6 shadow-md rounded-xl transition-colors duration-300
          ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        darkMode={isDark} userRole={userRole}>
          <h4 className={`font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            📊 Category Breakdown
          </h4>
          <CategoryPie categories={budgets} darkMode={isDark} userRole={userRole}  />
        </Card>

        <Card className={`p-4 sm:p-6 shadow-md rounded-xl transition-colors duration-300
          ${isDark ? 'bg-gray-800' : 'bg-white'}`}
       darkMode={isDark} userRole={userRole} >
          <h4 className={`font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            📈 Spending Over Time
          </h4>
          <TimeSeries data={budgets} darkMode={isDark} userRole={userRole} />
        </Card>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <BudgetFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBudget}
          darkMode={isDark}
        />
      )}
    </div>
  );
}
