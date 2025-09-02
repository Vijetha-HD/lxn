import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import mockData from '../data/mockData';

// Roles allowed to use dark mode
const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const platformColors = {
  Google: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100',
  Facebook: 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100',
  Instagram: 'bg-pink-100 text-pink-800 dark:bg-pink-700 dark:text-pink-100',
  LinkedIn: 'bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50',
};

const AdCampaignsPage = ({ userRole, darkMode }) => {
  const enableDarkMode = rolesWithDarkMode.includes(userRole);
  const isDark = enableDarkMode && darkMode; // Sun icon → dark page

  return (
    <div className={`space-y-6 px-4 sm:px-6 lg:px-8 pb-8 min-h-screen transition-colors duration-300
      ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      <PageTitle 
      darkMode={darkMode}
      userRole={userRole}
        title="Ad Campaign Performance" 
        subtitle="Monitor the performance of your digital and print ad campaigns." 
      />

      <Card   darkMode={isDark} userRole={userRole} className={`transition-colors duration-300 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <tr>
                <th className={`p-4 text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>Campaign Name</th>
                <th className={`p-4 text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>Platform</th>
                <th className={`p-4 text-sm font-semibold text-right ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>Impressions</th>
                <th className={`p-4 text-sm font-semibold text-right hidden sm:table-cell ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>Clicks</th>
                <th className={`p-4 text-sm font-semibold text-right hidden md:table-cell ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>CTR</th>
                <th className={`p-4 text-sm font-semibold text-right ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>Spend (INR)</th>
              </tr>
            </thead>
            <tbody>
              {mockData.adCampaigns.map(ad => (
                <tr 
                  key={ad.id} 
                  className={`border-b transition-colors duration-200 hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <td className={`${isDark ? 'text-gray-100' : 'text-gray-900'} p-4 font-medium`}>{ad.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${platformColors[ad.platform] || (isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800')}`}>
                      {ad.platform}
                    </span>
                  </td>
                  <td className={`p-4 text-right ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{ad.impressions.toLocaleString('en-IN')}</td>
                  <td className={`p-4 text-right hidden sm:table-cell ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{ad.clicks ? ad.clicks.toLocaleString('en-IN') : 'N/A'}</td>
                  <td className={`p-4 text-right hidden md:table-cell ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{ad.ctr}</td>
                  <td className={`p-4 text-right font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{ad.spend.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdCampaignsPage;
