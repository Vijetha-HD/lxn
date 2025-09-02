import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import DownloadIcon from '../icons/DownloadIcon';
import mockData from '../data/mockData';
const ReportsPage = () => (
    <div>
        <PageTitle title="Reports" subtitle="Download generated reports and data exports." />
        <Card>
            <ul className="divide-y divide-borderLight dark:divide-borderDark">
                {mockData.reports.map(report => (
                    <li key={report.id} className="p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{report.title}</p>
                            <p className="text-sm text-textMuted">Generated on: {report.date}</p>
                        </div>
                        <button className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                            <DownloadIcon className="w-4 h-4" />
                            <span>{report.type}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </Card>
    </div>
);

export default ReportsPage;