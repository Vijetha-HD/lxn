import React from "react";
import Card from "../components/Card";
import PageTitle from "../components/PageTitle";
import { TrendingUp, Users, Target, Briefcase } from "lucide-react";
import mockData from "../data/mockData";

const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const iconMap = {
  sentimentScore: TrendingUp,
  predictedTurnout: Users,
  fundraisingProgress: Target,
  keyIssueFocus: Briefcase,
};

const DailyBriefing = ({ userRole, darkMode }) => {
  const enableDark = rolesWithDarkMode.includes(userRole) && darkMode;
  const { kpis, positiveMentions, negativeMentions, schedule } = mockData;

  const bgColor = enableDark ? "#111827" : "#f9fafb";
  const sectionTitleColor = enableDark ? "#f3f4f6" : "#111827";
  const cardBg = enableDark ? "#1e293b" : "#ffffff";
  const cardTextColor = enableDark ? "#f9fafb" : "#111827";
  const iconBgColor = enableDark ? "#374151" : "#e0f2fe";
  const iconColor = enableDark ? "#facc15" : "#0284c7";

  return (
    <div
      className="p-4 sm:p-6 lg:p-8 space-y-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <PageTitle
        title="Daily Briefing"
        subtitle="Overview of today's campaign metrics and schedule"
        userRole={userRole}
        darkMode={darkMode}
      />

      {/* KPIs */}
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: sectionTitleColor }}>
          Key Metrics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(kpis).map(([key, data], index) => {
            const value = typeof data === "object" ? data.value : data;
            const trend = typeof data === "object" ? data.trend : null;
            const Icon = iconMap[key] || TrendingUp;

            return (
              <Card
                key={index}
                userRole={userRole}
                darkMode={darkMode}
                className="p-4 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                style={{ backgroundColor: cardBg, color: cardTextColor }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2 rounded-full"
                    style={{ backgroundColor: iconBgColor, color: iconColor }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-medium capitalize" style={{ color: cardTextColor }}>
                    {key.replace(/([A-Z])/g, " $1")}
                  </h3>
                </div>
                <p className="text-2xl font-bold mt-2" style={{ color: cardTextColor }}>
                  {value}
                </p>
                {trend !== null && (
                  <span
                    className={`mt-1 text-sm font-medium ${
                      trend > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {trend > 0 ? `+${trend}` : trend}%
                  </span>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* Positive Mentions */}
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: sectionTitleColor }}>
          Top Positive Mentions
        </h2>
        <div className="space-y-3">
          {positiveMentions.map((mention, idx) => (
            <Card
              key={idx}
              userRole={userRole}
              darkMode={darkMode}
              className={`p-4 transition-colors duration-200 hover:bg-green-600 hover:text-white`}
              style={{
                backgroundColor: enableDark ? "#273449" : "#ecfdf5",
                color: cardTextColor,
              }}
            >
              <p>{mention}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Negative Mentions */}
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: sectionTitleColor }}>
          Top Negative Mentions
        </h2>
        <div className="space-y-3">
          {negativeMentions.map((mention, idx) => (
            <Card
              key={idx}
              userRole={userRole}
              darkMode={darkMode}
              className={`p-4 transition-colors duration-200 hover:bg-red-600 hover:text-white`}
              style={{
                backgroundColor: enableDark ? "#273449" : "#fef2f2",
                color: cardTextColor,
              }}
            >
              <p>{mention}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Schedule */}
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: sectionTitleColor }}>
          Today's Schedule
        </h2>
        <div className="space-y-3">
          {schedule.map((event, idx) => (
            <Card
              key={idx}
              userRole={userRole}
              darkMode={darkMode}
              className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition-shadow duration-300"
              style={{ backgroundColor: cardBg, color: cardTextColor }}
            >
              <div>
                <h3 className="text-lg font-medium">{event.title}</h3>
                <p className="text-sm">{event.details}</p>
              </div>
              <span className="mt-2 sm:mt-0 text-sm">{event.time}</span>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DailyBriefing;
