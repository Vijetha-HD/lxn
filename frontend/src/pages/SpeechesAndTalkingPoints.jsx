import React from "react";
import Card from "../components/Card";
import PageTitle from "../components/PageTitle";
import {
  BookOpen,
  Stethoscope,
  Landmark,
  MessageSquare,
  BarChart2,
} from "lucide-react";
import mockData from "../data/mockData";

const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const iconMap = {
  Economy: BarChart2,
  Healthcare: Stethoscope,
  "Foreign Policy": Landmark,
  Education: BookOpen,
  Default: MessageSquare,
};

const SpeechesAndTalkingPoints = ({ userRole, darkMode }) => {
  const enableDark = rolesWithDarkMode.includes(userRole) && darkMode;
  const { speechesAndTalkingPoints = [] } = mockData;

  const bgColor = enableDark ? "#111827" : "#ffffff"; // dark/light page
  const cardBg = enableDark ? "#1e293b" : "#f9fafb"; // dark/light cards
  const cardTextColor = enableDark ? "#f9fafb" : "#111827";
  const iconBgColor = enableDark ? "#374151" : "#e0f2fe";
  const iconColor = enableDark ? "#facc15" : "#0284c7";

  return (
    <div
      className="p-4 sm:p-6 lg:p-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <PageTitle
        title="Speeches & Talking Points"
        subtitle="Centralized, approved messaging for rallies, debates, and media appearances."
        userRole={userRole}
        darkMode={darkMode}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {speechesAndTalkingPoints.length > 0 ? (
          speechesAndTalkingPoints.map((topic, idx) => {
            const Icon = iconMap[topic.category] || iconMap.Default;
            return (
              <Card
                key={idx}
                userRole={userRole}
                darkMode={darkMode}
                className="flex flex-col p-5 border border-gray-300 hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: cardBg, color: cardTextColor }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-2 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: iconBgColor, color: iconColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold" style={{ color: cardTextColor }}>
                    {topic.category}
                  </h2>
                </div>

                {/* Talking Points */}
                {topic.points?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2" style={{ color: cardTextColor }}>
                      Key Talking Points
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                      {topic.points.map((point, pIdx) => (
                        <li key={pIdx} style={{ color: cardTextColor }}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Statistics */}
                {topic.statistics?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2" style={{ color: cardTextColor }}>
                      Key Statistics
                    </h3>
                    <ul className="space-y-2">
                      {topic.statistics.map((stat, sIdx) => (
                        <li
                          key={sIdx}
                          className="flex items-center gap-2 px-3 py-1 rounded-md"
                          style={{ backgroundColor: enableDark ? "#273449" : "#e0f7fa", color: cardTextColor }}
                        >
                          <BarChart2 className="w-4 h-4 text-green-400" />
                          <span>{stat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Rebuttals */}
                {topic.rebuttals?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2" style={{ color: cardTextColor }}>
                      Common Rebuttals
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                      {topic.rebuttals.map((reb, rIdx) => (
                        <li key={rIdx} style={{ color: cardTextColor }}>
                          {reb}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            );
          })
        ) : (
          <p className="text-center col-span-full" style={{ color: cardTextColor }}>
            No speeches or talking points available.
          </p>
        )}
      </div>
    </div>
  );
};

export default SpeechesAndTalkingPoints;
