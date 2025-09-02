import React from 'react'; 
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import MapIcon from '../icons/MapIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import mockData from '../data/mockData';

// Roles allowed to perform theme change
const themeChangeRoles = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const FieldOrganizerDashboard = ({ darkMode, userRole }) => {
  // Respect role-based theme change
  const isDarkBackground = themeChangeRoles.includes(userRole) ? darkMode : false;


  const routeData = mockData.canvassingRoutes.map(route => ({
    area: route.area,
    completion: route.completion,
    volunteers: route.volunteers,
  }));

  return (
    <div
      className={`px-4 sm:px-6 lg:px-8 py-6 space-y-6 transition-colors duration-300 
        ${isDarkBackground ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      {/* Page Header */}
      <PageTitle
        title="Field Organizer Dashboard"
        subtitle="Tools for Get-Out-The-Vote (GOTV) efforts."
        darkMode={isDarkBackground}
        userRole={userRole}
      />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Optimized Canvassing Routes Chart */}
        <div className="lg:col-span-2">
          <Card userRole={userRole} darkMode={isDarkBackground} className="p-4 sm:p-6 rounded-xl border">
            <div className="flex items-center mb-4 space-x-2">
              <MapIcon className="w-5 h-5 text-primaryAccent" />
              <h3 className={`text-lg font-semibold ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
                Optimized Canvassing Routes
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={routeData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkBackground ? '#4B5563' : '#E5E7EB'} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={tick => `${tick}%`}
                  tick={{ fill: isDarkBackground ? '#F3F4F6' : '#111827' }}
                />
                <YAxis
                  type="category"
                  dataKey="area"
                  width={180}
                  tick={{ fill: isDarkBackground ? '#F3F4F6' : '#111827' }}
                />
                <Tooltip
                  formatter={(value, name) =>
                    name === 'completion' ? `${value}%` : `${value} volunteers`
                  }
                  contentStyle={{
                    backgroundColor: isDarkBackground ? '#1F2937' : '#FFFFFF',
                    color: isDarkBackground ? '#F3F4F6' : '#111827'
                  }}
                />
                <Bar dataKey="completion" fill="#4F46E5" radius={[5, 5, 5, 5]} />
                <Bar dataKey="volunteers" fill="#EC4899" radius={[5, 5, 5, 5]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Route Progress Cards */}
        <div>
          <Card userRole={userRole} darkMode={isDarkBackground} className="p-4 sm:p-6 h-full rounded-xl border">
            <h3 className={`text-lg font-semibold mb-4 ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
              Route Progress
            </h3>
            <div className="space-y-5">
              {mockData.canvassingRoutes.map(route => (
                <div key={route.id}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className={`${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>{route.area}</span>
                    <span className="text-primaryAccent">{route.completion}%</span>
                  </div>
                  <div className={`w-full rounded-full h-2.5 overflow-hidden ${isDarkBackground ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="bg-primaryAccent h-2.5 transition-all duration-500"
                      style={{ width: `${route.completion}%` }}
                    ></div>
                  </div>
                  <p className={`${isDarkBackground ? 'text-gray-300' : 'text-gray-600'} text-xs mt-1`}>
                    {route.volunteers} volunteers assigned
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Volunteer Interaction Form */}
      <Card userRole={userRole} darkMode={isDarkBackground} className="p-4 sm:p-6 rounded-xl border">
        <h3 className={`text-lg font-semibold mb-4 ${isDarkBackground ? 'text-gray-100' : 'text-gray-900'}`}>
          Log Volunteer Interaction
        </h3>
        <form className="grid grid-cols-1 sm:grid-cols-3 gap-4">
   {/* Input */}
<input
  type="text"
  placeholder="Voter ID"
  className={`w-full sm:w-auto px-3 py-2 rounded-md text-sm sm:text-base
    focus:outline-none focus:ring-2 focus:ring-primaryAccent transition-all
    ${isDarkBackground 
      ? '!bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-400 caret-white' 
      : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 caret-black'}`}
/>

{/* Dropdown */}
<select
  className={`w-full sm:w-auto px-3 py-2 rounded-md text-sm sm:text-base
    focus:outline-none focus:ring-2 focus:ring-primaryAccent appearance-none transition-all
    ${isDarkBackground 
      ? '!bg-gray-800 border border-gray-600 text-gray-200 caret-white' 
      : 'bg-white border border-gray-300 text-gray-900 caret-black'}`}
>
  <option className={`${isDarkBackground ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>Contacted</option>
  <option className={`${isDarkBackground ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>Not Home</option>
  <option className={`${isDarkBackground ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>Refused</option>
</select>


          {/* Submit button */}
          <button
            type="submit"
            className="bg-secondaryAccent text-black font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-all duration-200"
          >
            Log Interaction
          </button>
        </form>
      </Card>
    </div>
  );
};

export default FieldOrganizerDashboard;
