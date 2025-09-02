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

const CompetitorAnalysisPage = ({ userRole, darkMode }) => {
  const enableDarkMode = rolesWithDarkMode.includes(userRole);
  const isDark = enableDarkMode && darkMode; // Sun icon → dark page

  const getSentimentColor = (score) => {
    if (score > 0) return isDark ? 'text-green-400' : 'text-green-500';
    if (score < 0) return isDark ? 'text-red-400' : 'text-red-500';
    return isDark ? 'text-yellow-300' : 'text-yellow-500';
  };

  return (
    <div className={`space-y-8 px-4 sm:px-6 lg:px-8 pb-8 min-h-screen transition-colors duration-300
      ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      <PageTitle
      userRole={userRole}
      darkMode={darkMode}
        title="Competitor Analysis"
        subtitle="Track opponent performance and strategy."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.competitors.map((comp) => (
          <Card
            key={comp.name}
            darkMode={isDark} userRole={userRole}
            className={`p-6 shadow-md transition-all rounded-xl
              hover:shadow-lg hover:scale-[1.02] flex flex-col justify-between
              ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
          >
            {/* Competitor Name */}
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-primaryAccent-light' : 'text-primaryAccent'}`}>
              {comp.name}
            </h3>

            {/* Sentiment */}
            <div className={`flex justify-between items-center border-b pb-2 mb-3
              ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-textMuted'}`}>Sentiment Score</span>
              <span className={`font-semibold ${getSentimentColor(comp.sentiment)}`}>
                {comp.sentiment > 0 ? `+${comp.sentiment}` : comp.sentiment}
              </span>
            </div>

            {/* Key Issue */}
            <div className={`flex justify-between items-center border-b pb-2 mb-3
              ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-textMuted'}`}>Key Issue</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full
                ${isDark ? 'bg-blue-700 text-blue-100' : 'bg-blue-100 text-blue-800'}`}
              >
                {comp.key_issue}
              </span>
            </div>

            {/* Media Mentions */}
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-textMuted'}`}>
                Media Mentions (24h)
              </span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full
                ${isDark ? 'bg-purple-700 text-purple-100' : 'bg-purple-100 text-purple-800'}`}
              >
                {comp.media_mentions}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompetitorAnalysisPage;
