import React from "react";
import Card from "../components/Card";
import PageTitle from "../components/PageTitle";
import { Users, AlertCircle, CheckCircle } from "lucide-react";
import mockData from "../data/mockData";

// Roles allowed to perform theme change
const themeChangeRoles = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const GOTVDashboard = ({ userRole, darkMode }) => {
  const isDarkBackground = themeChangeRoles.includes(userRole) ? darkMode : false;

  const realTimeTurnout = [
    { booth: "Booth 101", constituency: "Bangalore South", turnoutPercent: 55 },
    { booth: "Booth 102", constituency: "Bangalore South", turnoutPercent: 72 },
    { booth: "Booth 201", constituency: "Mumbai North", turnoutPercent: 60 },
    { booth: "Booth 202", constituency: "Mumbai North", turnoutPercent: 48 },
    { booth: "Booth 301", constituency: "Lucknow Central", turnoutPercent: 50 },
  ];

  const turnoutPredictionMap = {};
  mockData.geospatial.forEach((geo) => {
    turnoutPredictionMap[geo.name] = mockData.kpis.predictedTurnout.value;
  });

  const parsePercent = (str) => parseFloat(str.replace("%", ""));

  const boothsLagging = realTimeTurnout.filter((booth) => {
    const predicted = parsePercent(turnoutPredictionMap[booth.constituency] || "70%");
    return booth.turnoutPercent < predicted - 10;
  });

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 lg:p-10 transition-colors duration-300 
        ${isDarkBackground ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
    >
      <PageTitle
        title="Get-Out-The-Vote Dashboard"
        subtitle="Live voter turnout monitoring to maximize election day impact."
        userRole={userRole}
        darkMode={isDarkBackground}
      />

      {/* Real-Time Table */}
      <Card
        userRole={userRole}
        darkMode={isDarkBackground}
        className="mb-6 overflow-x-auto rounded-2xl shadow-md"
      >
        <h2 className={`text-xl font-semibold mb-3 ${isDarkBackground ? "text-gray-100" : "text-gray-800"}`}>
          Real-Time Turnout by Booth
        </h2>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead
              className={`${
                isDarkBackground ? "bg-gray-800 text-gray-200 border-b border-gray-700" : "bg-gray-100 text-gray-700"
              }`}
            >
              <tr>
                <th className="p-3">Booth</th>
                <th className="p-3">Constituency</th>
                <th className="p-3">Turnout (%)</th>
                <th className="p-3">Predicted Turnout (%)</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {realTimeTurnout.map((booth) => {
                const predicted = parsePercent(turnoutPredictionMap[booth.constituency] || "70%");
                const isLagging = booth.turnoutPercent < predicted - 10;
                return (
                  <tr
                    key={booth.booth}
                    className={`border-t transition-colors ${
                      isDarkBackground
                        ? isLagging
                          ? "bg-red-900/40 hover:bg-red-900/60 border-gray-700"
                          : "bg-green-900/40 hover:bg-green-900/60 border-gray-700"
                        : isLagging
                        ? "bg-red-50 hover:bg-red-100 border-gray-200"
                        : "bg-green-50/40 hover:bg-green-100 border-gray-200"
                    }`}
                  >
                    <td className="p-3">{booth.booth}</td>
                    <td className="p-3">{booth.constituency}</td>
                    <td className="p-3">{booth.turnoutPercent}%</td>
                    <td className="p-3">{predicted}%</td>
                    <td className="p-3">
                      {isLagging ? (
                        <span className="flex items-center gap-1 text-red-600 font-semibold">
                          <AlertCircle size={18} />
                          Lagging
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          <CheckCircle size={18} />
                          On Track
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Card */}
      {boothsLagging.length > 0 && (
        <Card
          userRole={userRole}
          darkMode={isDarkBackground}
          className={`p-5 rounded-2xl border ${
            isDarkBackground ? "bg-yellow-900/30 border-yellow-700 text-yellow-200" : "bg-yellow-50 border-yellow-200 text-yellow-900"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">Action Needed: Redeploy Volunteers</h3>
          <p className="mb-3">
            The following booths are falling behind turnout expectations. Consider dispatching additional volunteers for calls or door-to-door efforts.
          </p>
          <ul className="list-disc list-inside font-medium">
            {boothsLagging.map((booth) => (
              <li key={booth.booth}>
                {booth.booth} - {booth.constituency} ({booth.turnoutPercent}% turnout)
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Volunteers Count */}
      <Card
        userRole={userRole}
        darkMode={isDarkBackground}
        className={`mt-6 p-4 flex items-center gap-3 rounded-2xl border ${
          isDarkBackground ? "bg-blue-900/40 border-blue-700 text-blue-200" : "bg-blue-50 border-blue-200 text-blue-900"
        }`}
      >
        <Users size={24} className={`${isDarkBackground ? "text-blue-300" : "text-blue-600"}`} />
        <div>
          <p className="font-semibold text-lg">Total Volunteers Active Today</p>
          <p className="text-sm">{mockData.volunteers.filter((v) => v.status === "Active").length}</p>
        </div>
      </Card>
    </div>
  );
};

export default GOTVDashboard;
