import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import api from '../api';

// Roles allowed dark mode
const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const COLORS = ['#4ade80', '#60a5fa', '#fca5a5', '#f59e0b', '#a78bfa', '#f472b6', '#34d399'];

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-2 rounded shadow border text-sm ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
        <p className="font-semibold">{label}</p>
        <p className={`${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
          💰 {payload[0].value.toLocaleString(undefined, { style: 'currency', currency: 'INR' })}
        </p>
      </div>
    );
  }
  return null;
};

export function CategoryPie({ start, end, darkMode, userRole }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const enableDarkMode = rolesWithDarkMode.includes(userRole);
  const isDark = enableDarkMode && darkMode;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const params = { start, end, groupBy: 'category' };
        const res = await api.get('/api/budgets/summary', { params });
        const formatted = res.data.map(d => ({
          name: d._id || 'Uncategorized',
          value: d.totalSpent || d.totalAmount || 0
        }));
        setData(formatted);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [start, end]);

  if (loading) return <div className="text-center py-8">Loading chart...</div>;
  if (!data.length) return <div className="text-center py-8 text-gray-500">No data available for this range.</div>;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="70%"
          label={({ name, value }) => `${name} (${Math.round(value)})`}
          animationDuration={800}
        >
          {data.map((entry, idx) => (
            <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip isDark={isDark} />} />
        <Legend
          wrapperStyle={{ color: isDark ? '#f9fafb' : '#111827' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function TimeSeries({ start, end, darkMode, userRole }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const enableDarkMode = rolesWithDarkMode.includes(userRole);
  const isDark = enableDarkMode && darkMode;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const params = { start, end, groupBy: 'month' };
        const res = await api.get('/api/budgets/summary', { params });
        const formatted = res.data.map(d => ({
          month: d._id,
          value: d.totalSpent
        }));
        setData(formatted);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [start, end]);

  if (loading) return <div className="text-center py-8">Loading chart...</div>;
  if (!data.length) return <div className="text-center py-8 text-gray-500">No trend data available.</div>;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: isDark ? '#f9fafb' : '#111827' }} />
        <YAxis tick={{ fontSize: 12, fill: isDark ? '#f9fafb' : '#111827' }} />
        <Tooltip content={<CustomTooltip isDark={isDark} />} />
        <Legend wrapperStyle={{ color: isDark ? '#f9fafb' : '#111827' }} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={isDark ? '#6366f1' : '#4f46e5'}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          animationDuration={700}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
