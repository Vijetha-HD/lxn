import React from "react";
import PageTitle from "../components/PageTitle";
import KPI from "../components/KPI";
import Card from "../components/Card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import MapIcon from "../icons/MapIcon";
import TrendingUpIcon from "../icons/TrendingUpIcon";
import PieChartIcon from "../icons/PieChartIcon";
import mockData from "../data/mockData";

const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const COLORS = ["#82ca9d", "#8884d8", "#ffc658"];

const CampaignManagerDashboard = ({ userRole, darkMode }) => {
  // Enable dark if role allowed AND sun icon active
  const enableDark = rolesWithDarkMode.includes(userRole) && darkMode;

  const geospatialData = mockData.geospatial.map((state) => ({
    state: state.name,
    sentiment: state.sentiment,
    support: state.support,
    competitor: state.competitor,
  }));

  const sentimentData = [
    { name: "Positive", value: mockData.sentimentAnalysis.positive },
    { name: "Negative", value: mockData.sentimentAnalysis.negative },
    { name: "Neutral", value: mockData.sentimentAnalysis.neutral },
  ];

  // Chart styling
  const chartTextColor = enableDark ? "#f9fafb" : "#111827";
  const gridColor = enableDark ? "#374151" : "#e5e7eb";
  const tooltipBg = enableDark ? "#1f2937" : "#ffffff";
  const tooltipText = enableDark ? "#f9fafb" : "#111827";

  return (
    <div className={`space-y-8 p-4 md:p-6 transition-colors duration-300`}>
      {/* Page Header */}
      <PageTitle
        userRole={userRole}
        darkMode={darkMode}
        title="Main Dashboard"
        subtitle="A complete overview of your campaign's performance."
      />

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          {
            title: "Voter Sentiment",
            value: mockData.kpis.sentimentScore.value,
            trend: mockData.kpis.sentimentScore.trend,
          },
          {
            title: "Predicted Turnout",
            value: mockData.kpis.predictedTurnout.value,
            trend: mockData.kpis.predictedTurnout.trend,
          },
          {
            title: "Fundraising",
            value: mockData.kpis.fundraisingProgress.value.split(" ")[0],
            trend: mockData.kpis.fundraisingProgress.trend,
          },
          {
            title: "Key Issue Focus",
            value: mockData.kpis.keyIssueFocus || "Youth Employment",
            trend: 0,
          },
        ].map((kpi, idx) => (
          <div key={idx} className="transition-transform transform hover:scale-[1.02]">
            <KPI  darkMode={enableDark}  // pass this to Card
      userRole={userRole} {...kpi} />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geospatial Sentiment */}
        <Card darkMode={darkMode} userRole={userRole}>
          <div className="flex items-center gap-2 mb-4">
            <MapIcon className="w-5 h-5 text-primaryAccent" />
            <h3 className="text-lg font-semibold">Geospatial Sentiment (Indian States)</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={geospatialData} style={{ background: enableDark ? "#1f2937" : "#ffffff", borderRadius: "12px" }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="state" tick={{ fontSize: 12, fill: chartTextColor }} />
              <YAxis tick={{ fill: chartTextColor }} />
              <Tooltip contentStyle={{ backgroundColor: tooltipBg, color: tooltipText }} />
              <Bar dataKey="sentiment" fill="#82ca9d" name="Sentiment Score" />
              <Bar dataKey="support" fill="#8884d8" name="Support %" />
              <Bar dataKey="competitor" fill="#ffc658" name="Competitor %" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Election Win Probability */}
        <Card darkMode={darkMode} userRole={userRole}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUpIcon className="w-5 h-5 text-primaryAccent" />
            <h3 className="text-lg font-semibold">Election Win Probability</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.electionForecast} style={{ background: enableDark ? "#1f2937" : "#ffffff", borderRadius: "12px" }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="state" tick={{ fontSize: 12, fill: chartTextColor }} />
              <YAxis domain={[0, 100]} tick={{ fill: chartTextColor }} />
              <Tooltip contentStyle={{ backgroundColor: tooltipBg, color: tooltipText }} />
              <Line type="monotone" dataKey="winProbability" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Voter Segments */}
      <div className="w-full">
        <Card darkMode={darkMode} userRole={userRole}>
          <h3 className="text-lg font-semibold mb-4">Voter Segments</h3>
          <div className="space-y-4">
            {mockData.voterSegments.map((segment) => (
              <div key={segment.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">
                    {segment.name} ({segment.count.toLocaleString("en-IN")})
                  </span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${segment.priority === "High" ? "bg-pinkAccent text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100"}`}>
                    {segment.priority} Priority
                  </span>
                </div>
                <div className="w-full rounded-full h-2.5 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <div className="bg-primaryAccent h-2.5 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${(segment.count / 2000000) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Public Sentiment */}
      <div className="w-full">
        <Card darkMode={darkMode} userRole={userRole}>
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="w-5 h-5 text-primaryAccent" />
            <h3 className="text-lg font-semibold">Public Sentiment</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart style={{ background: enableDark ? "#1f2937" : "#ffffff", borderRadius: "12px" }}>
              <Pie data={sentimentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" label={{ fill: chartTextColor }}>
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} className="transition-all duration-300 hover:opacity-80" />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} contentStyle={{ backgroundColor: tooltipBg, color: tooltipText, borderRadius: "8px", border: "1px solid #ddd" }} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: chartTextColor }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default CampaignManagerDashboard;
