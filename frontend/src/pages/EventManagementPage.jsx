import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import mockData from '../data/mockData';
import { CalendarDays, MapPin, Users } from 'lucide-react';

// Roles allowed to use dark mode
const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const EventManagementPage = ({ userRole, darkMode }) => {
  const enableDarkMode = rolesWithDarkMode.includes(userRole);
  const isDark = enableDarkMode && darkMode; // Sun icon → dark page

  const getAttendeeBadgeColor = (count) => {
    if (count > 5000) return isDark ? 'bg-green-700 text-green-100' : 'bg-green-100 text-green-800';
    if (count > 1000) return isDark ? 'bg-yellow-700 text-yellow-100' : 'bg-yellow-100 text-yellow-800';
    return isDark ? 'bg-red-700 text-red-100' : 'bg-red-100 text-red-800';
  };

  return (
    <div className={`space-y-8 px-4 sm:px-6 lg:px-8 pb-8 min-h-screen transition-colors duration-300
      ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      <PageTitle
      userRole={userRole}
      darkMode={darkMode}
        title="Event Management"
        subtitle="Schedule and manage campaign events."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.events.map((event) => (
          <Card
            key={event.id}
             darkMode={isDark} userRole={userRole}
            className={`p-6 shadow-md rounded-xl transition-all transition-colors duration-300
              hover:shadow-lg hover:scale-[1.02] flex flex-col justify-between
              ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
          >
            {/* Event Title */}
            <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-primaryAccent-light' : 'text-primaryAccent'}`}>
              {event.name}
            </h3>

            {/* Event Date */}
            <div className={`flex items-center text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-textMuted'}`}>
              <CalendarDays className="w-4 h-4 mr-2 text-primaryAccent" />
              {event.date}
            </div>

            {/* Event Location */}
            <div className={`flex items-center text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-textMuted'}`}>
              <MapPin className="w-4 h-4 mr-2 text-primaryAccent" />
              {event.location}
            </div>

            {/* Attendee Count */}
            <div className={`flex items-center justify-between mt-auto pt-4 border-t
              ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <span className={`flex items-center text-sm ${isDark ? 'text-gray-300' : 'text-textMuted'}`}>
                <Users className="w-4 h-4 mr-2 text-primaryAccent" />
                Expected Attendees
              </span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getAttendeeBadgeColor(event.attendees)}`}>
                {event.attendees.toLocaleString('en-IN')}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventManagementPage;
