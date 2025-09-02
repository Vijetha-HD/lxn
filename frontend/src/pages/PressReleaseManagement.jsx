import React, { useState } from "react";
import Card from "../components/Card";
import PageTitle from "../components/PageTitle";
import mockData from "../data/mockData";
import { Edit, CheckCircle, Send } from "lucide-react";

const statusColors = {
  Draft:
    "bg-gray-500 text-gray-800 dark:bg-white dark:text-gray-100",
  "Awaiting Approval":
    "bg-yellow-300 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100",
  Distributed:
    "bg-green-300 text-green-900 dark:bg-green-600 dark:text-green-100",
};

const allowedRoles = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const PressReleaseManagement = ({ userRole, darkMode }) => {
  const [pressReleases, setPressReleases] = useState(
    mockData.reports.map((report) => ({
      ...report,
      status: report.status || "Draft",
    }))
  );

  const [filter, setFilter] = useState("All");

  const filteredReleases =
    filter === "All"
      ? pressReleases
      : pressReleases.filter((pr) => pr.status === filter);

  const approveRelease = (id) => {
    setPressReleases((prev) =>
      prev.map((pr) =>
        pr.id === id && pr.status === "Draft"
          ? { ...pr, status: "Awaiting Approval" }
          : pr
      )
    );
  };

  const distributeRelease = (id) => {
    setPressReleases((prev) =>
      prev.map((pr) =>
        pr.id === id && pr.status === "Awaiting Approval"
          ? { ...pr, status: "Distributed" }
          : pr
      )
    );
  };

  // ✅ Role-based theme logic fixed
  const canToggleTheme = allowedRoles.includes(userRole);
  const isDarkTheme = canToggleTheme ? darkMode : !darkMode;

  return (
    <div
      className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 
      ${isDarkTheme ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}
    >
      <PageTitle
        title="Press Release Management"
        userRole={userRole}
        darkMode={isDarkTheme}
        subtitle="Streamline drafting, reviewing, approving, and distributing official campaign communications."
      />

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        {["All", "Draft", "Awaiting Approval", "Distributed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition 
              ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : `bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white 
                     dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-500`
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Responsive Table */}
      <Card
        userRole={userRole}
        darkMode={isDarkTheme}
        className={`overflow-x-auto transition-colors duration-300 
        ${isDarkTheme ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}
      >
        <table className="min-w-full border-collapse text-left table-auto text-sm sm:text-base">
          <thead
            className={`${
              isDarkTheme
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <tr>
              <th className="p-3">Headline</th>
              <th className="p-3">Type</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReleases.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No press releases found for "{filter}"
                </td>
              </tr>
            ) : (
              filteredReleases.map((pr) => (
                <tr
                  key={pr.id}
                  className={`border-t ${
                    isDarkTheme ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <td className="p-3 max-w-xs truncate" title={pr.title}>
                    {pr.title}
                  </td>
                  <td className="p-3">{pr.type}</td>
                  <td className="p-3">{pr.date}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${statusColors[pr.status]}`}
                    >
                      {pr.status}
                    </span>
                  </td>
                  <td className="p-3 text-center flex flex-wrap sm:flex-nowrap justify-center gap-2">
                    <button
                      aria-label="Edit"
                      title="Edit Draft"
                      disabled={pr.status !== "Draft"}
                      className="px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 
                                 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 
                                 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Edit size={16} />
                    </button>
                    {pr.status === "Draft" && (
                      <button
                        onClick={() => approveRelease(pr.id)}
                        aria-label="Approve"
                        title="Approve Press Release"
                        className="px-3 py-1 rounded bg-yellow-400 text-yellow-900 hover:bg-yellow-500 
                                   dark:bg-yellow-600 dark:text-yellow-100 dark:hover:bg-yellow-500"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    {pr.status === "Awaiting Approval" && (
                      <button
                        onClick={() => distributeRelease(pr.id)}
                        aria-label="Distribute"
                        title="Distribute Press Release"
                        className="px-3 py-1 rounded bg-green-400 text-green-900 hover:bg-green-500 
                                   dark:bg-green-600 dark:text-green-100 dark:hover:bg-green-500"
                      >
                        <Send size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default PressReleaseManagement;
