

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import LineChartIcon from '../icons/LineChartIcon';
import PieChartIcon from '../icons/PieChartIcon';
import mockData from '../data/mockData';

const COLORS = ['#00C49F', '#FF8042', '#8884d8'];

const CommunicationsDirectorDashboard = ({ userRole, darkMode }) => {
  // Allowed roles for theme switching
  const allowedRoles = [
    "Campaign Manager",
    "Candidate",
    "Data Analyst",
    "Field Organizer",
    "Communications Director"
  ];

  // Enforce role-based theme switching
  const isAuthorized = allowedRoles.includes(userRole);
  const effectiveDarkMode = isAuthorized ? darkMode : false;

  // Chart Data
  const sentimentOverTimeData = mockData.socialPosts.map((post) => ({
    date: post.date,
    sentiment: Math.floor(Math.random() * 41) + 60, // 60-100 demo
  }));

  const sentimentBreakdownData = [
    { name: 'Positive', value: mockData.sentimentAnalysis.positive },
    { name: 'Negative', value: mockData.sentimentAnalysis.negative },
    { name: 'Neutral', value: mockData.sentimentAnalysis.neutral },
  ];

  return (
    <div
      className={`px-3 sm:px-4 lg:px-6 xl:px-8 py-6 min-h-screen transition-colors duration-300 
      ${effectiveDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}
    >
      {/* Page Header */}
      <PageTitle
        userRole={userRole}
        darkMode={effectiveDarkMode}
        title="Communications Dashboard"
        subtitle="Monitor media, track sentiment, and manage messaging."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
        {/* Sentiment Over Time */}
        <div className="lg:col-span-3">
          <Card
            userRole={userRole}
            darkMode={effectiveDarkMode}
            className={`p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 
              ${effectiveDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}
          >
            <div className="flex items-center mb-4">
              <LineChartIcon className="w-6 h-6 mr-2 text-primaryAccent" />
              <h3 className="text-lg font-semibold">Sentiment Over Time</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sentimentOverTimeData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={effectiveDarkMode ? '#444' : '#ccc'}
                />
                <XAxis dataKey="date" stroke={effectiveDarkMode ? '#ccc' : '#333'} />
                <YAxis domain={[0, 100]} stroke={effectiveDarkMode ? '#ccc' : '#333'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: effectiveDarkMode ? '#1f2937' : '#fff',
                    color: effectiveDarkMode ? '#f3f4f6' : '#111',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sentiment"
                  stroke="#00C49F"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Sentiment Breakdown */}
        <div className="lg:col-span-2">
          <Card
            userRole={userRole}
            darkMode={effectiveDarkMode}
            className={`p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 
              ${effectiveDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}
          >
            <div className="flex items-center mb-4">
              <PieChartIcon className="w-6 h-6 mr-2 text-secondaryAccent" />
              <h3 className="text-lg font-semibold">Sentiment Breakdown</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentBreakdownData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {sentimentBreakdownData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{ color: effectiveDarkMode ? '#e5e7eb' : '#111' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: effectiveDarkMode ? '#1f2937' : '#fff',
                    color: effectiveDarkMode ? '#f3f4f6' : '#111',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Media Monitoring Feed */}
        <div className="lg:col-span-3">
          <Card
            userRole={userRole}
            darkMode={effectiveDarkMode}
            className={`p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 
              ${effectiveDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}
          >
            <h3 className="text-lg font-semibold mb-4">
              Media Monitoring Feed
            </h3>
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {mockData.sentimentAnalysis.mediaFeed.map((item, idx) => (
                <li
                  key={idx}
                  className={`border-l-4 ${
                    item.sentiment === 'positive'
                      ? 'border-green-400'
                      : item.sentiment === 'negative'
                      ? 'border-red-400'
                      : 'border-gray-400'
                  } pl-4 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors`}
                >
                  <p className="dark:text-gray-500 font-bold">{item.source}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Key Influencers & A/B Testing */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card
            userRole={userRole}
            darkMode={effectiveDarkMode}
            className={`p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 
              ${effectiveDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}
          >
            <h3 className="text-lg font-semibold mb-4">Key Influencers</h3>
            <ul className="space-y-3">
              {mockData.sentimentAnalysis.influencers.map((inf) => (
                <li
                  key={inf}
                  className="flex items-center space-x-3 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-md transition-colors"
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=${inf}`}
                    alt={inf}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-600 dark:text-gray-500 font-medium">
                    {inf}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            userRole={userRole}
            darkMode={effectiveDarkMode}
            className={`p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 
              ${effectiveDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}
          >
            <h3 className="text-lg font-semibold mb-4">A/B Testing Framework</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Test Message A vs. Message B on 'First-time Voters' segment.
            </p>
            <button className="w-full bg-primaryAccent text-black font-semibold py-3 px-4 rounded-lg hover:bg-primaryAccent/80 transition-colors">
              🚀 Launch New Test
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunicationsDirectorDashboard;
