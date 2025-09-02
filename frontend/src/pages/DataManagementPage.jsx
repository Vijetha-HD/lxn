import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';

// Roles for which moon/sun logic applies
const rolesWithCustomDarkMode = [
  "Campaign Manager",
  "Data Analyst",
  "Communications Director"
];

const DataManagementPage = ({ userRole, darkMode }) => {
  // Only apply darkMode for allowed roles
  const enableDark = rolesWithCustomDarkMode.includes(userRole) ? darkMode : false;

  return (
    <div
      className={`px-4 sm:px-6 lg:px-8 py-6 transition-colors duration-300
        ${enableDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}
      `}
    >
      {/* Page Header */}
      <PageTitle
        title="Data Management"
        userRole={userRole}
        darkMode={enableDark}
        subtitle="Tools for model building and data validation."
      />

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {/* Model Builder Card */}
        <Card
          userRole={userRole}
          darkMode={enableDark}
          className={`p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 rounded-xl
            ${enableDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}
          `}
        >
          <div>
            <h3 className="text-xl font-semibold mb-3">Custom Model Builder</h3>
            <p className={`${enableDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Use our visual editor to build and train custom prediction models with ease.
            </p>
          </div>
          <button
            className="w-full bg-primaryAccent text-black hover:bg-primaryAccent/80 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          >
            🚀 Launch Model Builder
          </button>
        </Card>

        {/* Data Validation Card */}
        <Card
          userRole={userRole}
          darkMode={enableDark}
          className={`p-6 hover:shadow-lg transition-shadow duration-300 rounded-xl
            ${enableDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}
          `}
        >
          <h3 className="text-xl font-semibold mb-4">Data Validation Log</h3>
          <ul className="space-y-3">
            {[
              { name: "Electoral Roll Q3 2024", status: "Validated", color: "text-green-400" },
              { name: "Social Media Stream", status: "Validated (0.1% error)", color: "text-yellow-400" },
              { name: "New Donor List", status: "Failed (Schema Mismatch)", color: "text-pink-500" },
            ].map((item, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg transition-colors
                  ${enableDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}
                `}
              >
                <span className={`${enableDark ? 'text-gray-100' : 'text-gray-800'} font-medium`}>
                  {item.name}
                </span>
                <span className={`${item.color} text-sm font-semibold`}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DataManagementPage;
