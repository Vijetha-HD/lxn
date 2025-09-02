// src/components/BudgetList.jsx
import React, { useEffect, useState } from 'react';
import { Trash2, Edit3, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BudgetList({ onEdit }) {
  const [budgets, setBudgets] = useState([]);
  const [search, setSearch] = useState('');

  // Load budgets from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('budgets')) || [];
    setBudgets(saved);
  }, []);

  // Delete a budget
  const handleDelete = (index) => {
    const updated = budgets.filter((_, i) => i !== index);
    setBudgets(updated);
    localStorage.setItem('budgets', JSON.stringify(updated));
  };

  // Export CSV
  const handleExport = () => {
    const csvRows = [
      ['Title', 'Category', 'Amount', 'Date', 'Description'],
      ...budgets.map((b) => [
        b.title,
        b.category,
        b.amount,
        b.date,
        b.description || ''
      ])
    ];
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      csvRows.map((row) => row.join(',')).join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = 'budget_list.csv';
    link.click();
  };

  // Filtered budgets
  const filtered = budgets.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
        <input
          type="text"
          placeholder="Search budgets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-full sm:w-64 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white dark:bg-gray-900">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((b, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4">{b.title}</td>
                  <td className="py-3 px-4">{b.category}</td>
                  <td className="py-3 px-4">₹{b.amount}</td>
                  <td className="py-3 px-4">{b.date}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => onEdit(b, index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        <AnimatePresence>
          {filtered.map((b, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{b.title}</h3>
                <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {b.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {b.description || 'No description'}
              </p>
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>₹{b.amount}</span>
                <span>{b.date}</span>
              </div>
              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => onEdit(b, index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
