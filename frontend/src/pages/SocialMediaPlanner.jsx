import React, { useMemo } from "react";
import mockData from "../data/mockData";
import Card from "../components/Card";

// Platform Icons
const platformIcons = {
  Facebook: (
    <svg
      width="24"
      height="24"
      fill="#1877F2"
      viewBox="0 0 24 24"
      aria-label="Facebook"
      className="inline-block mr-2"
    >
      <path d="M22 12.1C22 6.6 17.5 2 12 2S2 6.6 2 12.1c0 4.9 3.5 8.9 8 9.7v-6.8H8v-2.9h2V9.4c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.5h2.3l-.4 2.9h-1.9v6.8c4.5-.8 8-4.8 8-9.7z" />
    </svg>
  ),
  X: (
    <svg
      width="24"
      height="24"
      fill="#1DA1F2"
      viewBox="0 0 24 24"
      aria-label="X"
      className="inline-block mr-2"
    >
      <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 10.85 10.85 0 01-3.44 1.3 4.52 4.52 0 00-7.7 4.12 12.83 12.83 0 01-9.3-4.7 4.52 4.52 0 001.4 6.05 4.48 4.48 0 01-2.05-.56v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.13A9.05 9.05 0 012 19.54a12.8 12.8 0 006.92 2" />
    </svg>
  ),
  Instagram: (
    <svg
      width="24"
      height="24"
      fill="#C13584"
      viewBox="0 0 24 24"
      aria-label="Instagram"
      className="inline-block mr-2"
    >
      <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zM12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 7.5a3 3 0 100-6 3 3 0 000 6zm4.5-7.8a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
    </svg>
  ),
};

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const groupPostsByDate = (posts) => {
  return posts.reduce((acc, post) => {
    acc[post.date] = acc[post.date] ? [...acc[post.date], post] : [post];
    return acc;
  }, {});
};

const allowedRoles = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const SocialMediaPlanner = ({ userRole, darkMode }) => {
  const postsByDate = useMemo(
    () => groupPostsByDate(mockData.socialPosts),
    [mockData.socialPosts]
  );

  const today = new Date("2024-08-10");
  const upcomingDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const formatDateKey = (date) => date.toISOString().split("T")[0];

  // Role-based theme logic
  const canToggleTheme = allowedRoles.includes(userRole);
  const isDarkTheme = canToggleTheme ? darkMode : !darkMode;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkTheme ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          Social Media Planner
        </h1>

        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-6 sm:gap-8
              w-full
            "
          >
            {upcomingDays.map((day) => {
              const dayKey = formatDateKey(day);
              const posts = postsByDate[dayKey] || [];
              return (
                <div
                  key={dayKey}
                  className={`flex flex-col rounded-lg p-5 shadow-sm hover:shadow-lg transition-all duration-300 min-w-0 ${
                    isDarkTheme
                      ? "bg-gray-800 border border-gray-700 hover:bg-gray-700"
                      : "bg-white border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`text-center font-semibold mb-5 border-b pb-3 ${
                      isDarkTheme ? "border-gray-600" : "border-gray-300"
                    }`}
                  >
                    <div className="text-lg">{dayNames[day.getDay()]}</div>
                    <div
                      className={`text-sm ${
                        isDarkTheme ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {day.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {posts.length === 0 ? (
                    <p
                      className={`text-center mt-12 ${
                        isDarkTheme ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      No posts
                    </p>
                  ) : (
                    posts.map((post) => (
                      <Card
                        key={post.id}
                        className={`mb-6 p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col ${
                          isDarkTheme
                            ? "bg-gray-700 border border-gray-600 hover:bg-gray-600"
                            : "bg-gray-50 border border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center mb-3">
                          <div>{platformIcons[post.platform]}</div>
                          <span className="font-semibold text-sm">
                            {post.platform}
                          </span>
                        </div>
                        <p className="text-sm mb-4 flex-grow">{post.content}</p>
                        <p
                          className={`text-xs mb-4 ${
                            isDarkTheme ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Audience: {post.audience}
                        </p>

                        {post.visuals && (
                          <img
                            src={post.visuals}
                            alt={post.content}
                            className={`w-full rounded-lg object-contain max-h-56 border ${
                              isDarkTheme
                                ? "border-gray-600"
                                : "border-gray-300"
                            }`}
                            style={{ marginTop: "auto" }}
                          />
                        )}
                      </Card>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPlanner;
