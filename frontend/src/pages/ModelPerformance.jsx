import React from "react";
import Card from "../components/Card";
import PageTitle from "../components/PageTitle";
import {
  Target,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

// Roles allowed for moon/sun behavior
const rolesWithCustomDarkMode = [
  "Campaign Manager",
  "Data Analyst",
  "Communications Director",
];

const ModelPerformance = ({ userRole, darkMode }) => {
  const enableDark = rolesWithCustomDarkMode.includes(userRole) ? darkMode : false;

  const modelPerformance = [
    {
      name: "Voter Turnout Predictor",
      precision: "0.89",
      recall: "0.85",
      f1Score: "0.87",
      driftStatus: "Low Drift",
    },
    {
      name: "Election Outcome Forecaster",
      precision: "0.92",
      recall: "0.88",
      f1Score: "0.90",
      driftStatus: "High Drift",
    },
  ];

  return (
    <div
      className={`min-h-screen p-4 sm:p-8 transition-colors duration-300
        ${enableDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}
      `}
    >
      <PageTitle
        title="Model Performance"
        subtitle="Monitor accuracy, recall, and drift for machine learning models powering campaign insights."
        userRole={userRole}
        darkMode={enableDark}
      />

      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {modelPerformance.map((model, idx) => {
          const driftHigh = model.driftStatus === "High Drift";
          const DriftIcon = driftHigh ? AlertTriangle : CheckCircle;
          const driftColor = driftHigh ? "text-red-600" : "text-green-600";
          const driftBg = driftHigh ? "bg-red-100" : "bg-green-100";

          return (
            <Card
              key={idx}
              userRole={userRole}
              darkMode={enableDark}
              className={`p-6 flex flex-col justify-between border rounded-lg transition-shadow
                hover:shadow-lg
                ${enableDark ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-200"}
              `}
            >
              {/* Title + Drift Status */}
              <div className="flex justify-between items-center mb-4">
                <h3 className={`${enableDark ? "text-gray-100" : "text-gray-800"} text-lg font-semibold`}>
                  {model.name}
                </h3>
                <div
                  className={`p-2 rounded-full ${driftBg} flex items-center justify-center`}
                  title={model.driftStatus}
                >
                  <DriftIcon className={`${driftColor} w-5 h-5`} />
                </div>
              </div>

              {/* Metrics */}
              <div className={`${enableDark ? "text-gray-300" : "text-gray-700"} space-y-3 text-sm sm:text-base`}>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span>
                    Precision: <strong>{model.precision}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <span>
                    Recall: <strong>{model.recall}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>
                    F1 Score: <strong>{model.f1Score}</strong>
                  </span>
                </div>
              </div>

              {/* Drift Status Badge */}
              <div
                className={`mt-5 inline-block px-3 py-1 text-xs font-semibold rounded-full
                  ${driftHigh
                    ? enableDark ? "bg-red-600 text-red-100" : "bg-red-200 text-red-700"
                    : enableDark ? "bg-green-600 text-green-100" : "bg-green-200 text-green-700"
                  }`}
              >
                {model.driftStatus}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ModelPerformance;
