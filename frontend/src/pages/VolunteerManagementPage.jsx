import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import mockData from '../data/mockData';

// Roles allowed to perform theme change
const themeChangeRoles = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const VolunteerManagementPage = ({ userRole, darkMode }) => {
  // White page when moon icon, Black page when sun icon (only for allowed roles)
  const isDarkBackground = themeChangeRoles.includes(userRole) ? darkMode : false;

  return (
    <div
      className={`px-4 sm:px-6 lg:px-8 py-6 min-h-screen transition-colors duration-300 
        ${isDarkBackground ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      {/* Page Header */}
      <PageTitle
        userRole={userRole}
        darkMode={isDarkBackground}
        title="Volunteer Management"
        subtitle="Onboard, manage, and communicate with your team."
      />

      {/* Responsive Table */}
      <Card
        userRole={userRole}
        darkMode={isDarkBackground}
        className="overflow-x-auto mt-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <table className="w-full text-left min-w-[700px]">
          <thead
            className={`sticky top-0 z-10 border-b 
              ${isDarkBackground ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
          >
            <tr>
              {['ID', 'Name', 'Assigned Area', 'Hours Logged', 'Status'].map((header) => (
                <th
                  key={header}
                  className={`p-4 text-sm font-semibold ${
                    isDarkBackground ? 'text-gray-200' : 'text-gray-600'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockData.volunteers.map((vol, index) => (
              <tr
                key={vol.id}
                className={`border-b transition-colors ${
                  isDarkBackground
                    ? index % 2 === 0
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                      : 'bg-gray-700 border-gray-700 hover:bg-gray-600'
                    : index % 2 === 0
                    ? 'bg-white hover:bg-gray-50'
                    : 'bg-gray-50/50 hover:bg-gray-100'
                }`}
              >
                <td className="p-4 font-mono text-xs sm:text-sm">{vol.id}</td>
                <td
                  className={`p-4 font-semibold ${
                    isDarkBackground ? 'text-gray-100' : 'text-gray-800'
                  }`}
                >
                  {vol.name}
                </td>
                <td className={`${isDarkBackground ? 'text-gray-300' : 'text-gray-700'} p-4`}>
                  {vol.area}
                </td>
                <td className={`${isDarkBackground ? 'text-gray-300' : 'text-gray-700'} p-4`}>
                  {vol.hours}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      vol.status === 'Active'
                        ? isDarkBackground
                          ? 'bg-green-900 text-green-300'
                          : 'bg-green-100 text-green-800'
                        : isDarkBackground
                        ? 'bg-gray-600 text-gray-200'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {vol.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default VolunteerManagementPage;
