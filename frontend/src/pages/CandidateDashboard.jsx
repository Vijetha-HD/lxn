import React from 'react';
import PageTitle from '../components/PageTitle';
import KPI from '../components/KPI';
import Card from '../components/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import TrendingUpIcon from '../icons/TrendingUpIcon';
import mockData from '../data/mockData';

// Roles allowed to perform theme change
const themeChangeRoles = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const CandidateDashboard = ({ darkMode, userRole }) => {
  // Determine if theme should be inverted
  const isDarkBackground = themeChangeRoles.includes(userRole) ? darkMode : darkMode;

  // Simulate sentiment trend over 30 days
  const sentimentTrend = Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    sentiment: +(6 + Math.sin(i / 5) + Math.random()).toFixed(2)
  }));

  const sentimentDistribution = [
    { name: 'Positive', value: mockData.sentimentAnalysis.positive },
    { name: 'Negative', value: mockData.sentimentAnalysis.negative },
    { name: 'Neutral', value: mockData.sentimentAnalysis.neutral }
  ];

  const COLORS = ['#82ca9d', '#ff6b6b', '#ffc107'];

  return (
    <div className={`space-y-6 transition-colors duration-300 px-4 sm:px-6 lg:px-8 py-6 ${isDarkBackground ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      
      {/* Page Heading */}
      <PageTitle 
        userRole={userRole}
        darkMode={isDarkBackground}
        title="Candidate Dashboard" 
        subtitle="High-level overview of campaign KPIs and media presence." 
      />

      {/* KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <KPI 
          userRole={userRole}
          darkMode={isDarkBackground}
          title="Overall Sentiment Score" 
          value={mockData.kpis.sentimentScore.value} 
          trend={mockData.kpis.sentimentScore.trend} 
        />
        <KPI 
          userRole={userRole}
          darkMode={isDarkBackground}
          title="Win Probability" 
          value={`${mockData.electionForecast.slice(-1)[0].winProbability}%`} 
          trend={2.1} 
        />
      </div>

      {/* Sentiment Trend Line Chart */}
      <Card userRole={userRole} darkMode={isDarkBackground} className="p-4 md:p-6 border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUpIcon className="w-5 h-5 text-primaryAccent" />
          <h3 className={`text-lg sm:text-xl font-semibold ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
            Sentiment Trend (Last 30 Days)
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sentimentTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkBackground ? '#4B5563' : '#E5E7EB'} />
            <XAxis dataKey="day" hide />
            <YAxis domain={[0, 10]} tick={{ fill: isDarkBackground ? '#F3F4F6' : '#111827' }} />
            <Tooltip />
            <Line type="monotone" dataKey="sentiment" stroke="#82ca9d" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Highlights & Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Key Media Highlights */}
        <Card userRole={userRole} darkMode={isDarkBackground} className="p-4 md:p-6 border">
          <h3 className={`text-lg font-semibold mb-4 ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
            Key Media Highlights
          </h3>
          <ul className="space-y-4">
            {mockData.sentimentAnalysis.mediaFeed.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <span
                  className={`w-3 h-3 rounded-full mt-1 shrink-0 ${
                    item.sentiment === 'positive'
                      ? 'bg-green-400'
                      : item.sentiment === 'negative'
                      ? 'bg-red-400'
                      : 'bg-gray-400'
                  }`}
                ></span>
                <p className={`${isDarkBackground ? 'text-gray-100' : 'text-gray-900'} text-sm md:text-base`}>
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Top Discussion Topics */}
        <Card userRole={userRole} darkMode={isDarkBackground} className="p-4 md:p-6 border">
          <h3 className={`text-lg font-semibold mb-4 ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
            Top Discussion Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {mockData.sentimentAnalysis.topics.map(topic => (
              <span 
                key={topic} 
                className="bg-primaryAccent bg-opacity-20 text-primaryAccent text-xs sm:text-sm font-medium px-3 py-1 rounded-full hover:bg-opacity-30 transition"
              >
                {topic}
              </span>
            ))}
          </div>
        </Card>

        {/* Sentiment Distribution Pie */}
        <Card userRole={userRole} darkMode={isDarkBackground} className="p-4 md:p-6 border">
          <h3 className={`text-lg font-semibold mb-4 ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
            Sentiment Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sentimentDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {sentimentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: isDarkBackground ? '#F3F4F6' : '#111827' }} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

      </div>
    </div>
  );
};

export default CandidateDashboard;
