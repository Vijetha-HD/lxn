import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter, Legend } from 'recharts';
import BarChartIcon from '../icons/BarChartIcon';
import LineChartIcon from '../icons/LineChartIcon';
import mockData from '../data/mockData';

// Roles allowed to invert theme
const themeChangeRoles = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director"
];

const DataAnalystDashboard = ({ userRole, darkMode }) => {
  // Invert dark mode for allowed roles
  const isThemeInverse = themeChangeRoles.includes(userRole);
 const isDarkBackground = themeChangeRoles.includes(userRole)
  ? darkMode // sun → black (true), moon → white (false)
  : darkMode; // other roles just follow app theme


  const ageGroups = [
    { range: '18-25', min: 18, max: 25 },
    { range: '26-35', min: 26, max: 35 },
    { range: '36-45', min: 36, max: 45 },
    { range: '46-60', min: 46, max: 60 },
    { range: '60+', min: 61, max: 150 },
  ];

  const ageData = ageGroups.map(group => ({
    ageGroup: group.range,
    count: mockData.voterList.filter(v => v.age >= group.min && v.age <= group.max).length
  }));

  const sentimentIncomeData = mockData.geospatial.map(state => ({
    income: Math.floor(Math.random() * (150 - 40) + 40) * 1000,
    sentiment: state.sentiment,
    name: state.name
  }));

  return (
    <div className={`space-y-6 transition-colors duration-300 px-4 sm:px-6 lg:px-8 py-6 ${isDarkBackground ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      
      <PageTitle 
        title="Analyst Dashboard"
        userRole={userRole}
        darkMode={isDarkBackground} 
        subtitle="Advanced tools for deep-dive analysis and model building." 
      />

      {/* Query Builder */}
      <Card userRole={userRole} darkMode={isDarkBackground} className="p-4 md:p-6">
        <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
          Custom Query Builder
        </h3>
        <textarea
          className={`w-full h-32 p-3 rounded-md resize-none font-mono text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primaryAccent
            ${isDarkBackground ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
          placeholder="e.g., SELECT voter_id FROM voter_file WHERE state = 'Karnataka' AND age BETWEEN 18 AND 25;"
        />
        <div className="mt-3 flex flex-wrap gap-3">
          <button className="bg-primaryAccent text-black px-4 py-2 rounded-lg hover:opacity-90 hover:text-gray-700 transition-colors font-medium">
            Run Query
          </button>
          <button className={`px-4 py-2 rounded-lg font-medium transition-colors
            ${isDarkBackground ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}>
            Clear
          </button>
        </div>
      </Card>

      {/* Charts & Data Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Age Distribution */}
        <Card userRole={userRole} darkMode={isDarkBackground} className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChartIcon className="w-5 h-5 text-primaryAccent" />
            <h3 className={`text-lg sm:text-xl font-semibold ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
              Voter Age Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkBackground ? '#4B5563' : '#E5E7EB'} />
              <XAxis dataKey="ageGroup" tick={{ fill: isDarkBackground ? '#F3F4F6' : '#111827' }} />
              <YAxis tick={{ fill: isDarkBackground ? '#F3F4F6' : '#111827' }} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
              <Legend wrapperStyle={{ color: isDarkBackground ? '#F3F4F6' : '#111827' }} />
              <Bar dataKey="count" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Sentiment vs Income */}
        <Card userRole={userRole} darkMode={isDarkBackground} className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <LineChartIcon className="w-5 h-5 text-primaryAccent" />
            <h3 className={`text-lg sm:text-xl font-semibold ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
              Sentiment vs Income
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkBackground ? '#4B5563' : '#E5E7EB'} />
              <XAxis dataKey="income" name="Income (₹)" unit="" tick={{ fill: isDarkBackground ? '#F3F4F6' : '#111827' }} />
              <YAxis dataKey="sentiment" name="Sentiment Score" tick={{ fill: isDarkBackground ? '#F3F4F6' : '#111827' }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend wrapperStyle={{ color: isDarkBackground ? '#F3F4F6' : '#111827' }} />
              <Scatter name="States" data={sentimentIncomeData} fill="#10B981" />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>

        {/* Data Sources */}
        <Card userRole={userRole} darkMode={isDarkBackground} className="p-4 md:p-6">
          <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
            Data Sources
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Electoral Roll Data", status: "Validated", color: "text-green-500" },
              { name: "Census Data (2011)", status: "Validated", color: "text-green-500" },
              { name: "Donor List (Internal)", status: "Validated", color: "text-green-500" },
              { name: "Social Media API", status: "Connected", color: "text-yellow-500" },
            ].map((source, idx) => (
              <li key={idx} className={`flex items-center justify-between border-b pb-2 last:border-0
                ${isDarkBackground ? 'border-gray-700' : 'border-gray-300'}`}>
                <span className={`${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>{source.name}</span>
                <span className={`text-sm font-medium ${source.color}`}>{source.status}</span>
              </li>
            ))}
          </ul>
        </Card>

      </div>
    </div>
  );
};

export default DataAnalystDashboard;
