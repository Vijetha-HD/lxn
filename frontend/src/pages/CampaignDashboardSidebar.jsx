import React from 'react';
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
} from 'react-icons/ai';
import { FiDollarSign, FiUsers, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Overview', icon: <AiOutlineHome />, path: '/overview' },
  { name: 'Budget Control', icon: <FiDollarSign />, path: '/budget' },
  { name: 'AI Predictions', icon: <AiOutlineFundProjectionScreen />, path: '/predictions' },
  { name: 'Volunteer Stats', icon: <FiUsers />, path: '/volunteers' },
  { name: 'Constituency Trends', icon: <FiTrendingUp />, path: '/trends' },
  { name: 'Alerts & Insights', icon: <FiAlertCircle />, path: '/alerts' },
];

const CampaignDashboardSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm flex flex-col">
      {/* Logo + Title */}
      <div className="p-6 border-b">
        <div className="text-xl font-bold text-blue-600 mb-1">Lxn</div>
        <p className="text-sm text-gray-500 leading-tight">AI Powered Electric Campaign Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(({ name, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition 
                ${isActive
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
            >
              {icon}
              <span className="text-sm">{name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default CampaignDashboardSidebar;
