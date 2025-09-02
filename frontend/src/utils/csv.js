// src/utils/csv.js
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export function exportToCSV(items, filename = 'export.csv') {
  // basic fields: title, category, amount, date, description
  const csv = Papa.unparse(items.map(i => ({
    title: i.title,
    category: i.category,
    amount: i.amount,
    date: i.date,
    description: i.description || ''
  })));
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
}

export function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err)
    });
  });
}
