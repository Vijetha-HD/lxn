import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';

const CampaignStrategyPage = () => (
    <div>
        <PageTitle title="Campaign Strategy & Optimization" subtitle="AI-powered recommendations to maximize campaign impact." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Resource Allocation Recommender</h3>
                <ul className="space-y-3">
                    <li className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">Increase digital ad spend by 15% in **Pune** to target 'Urban Swing Voters'.</li>
                    <li className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">Allocate 5 more volunteers to **Lucknow East** for door-to-door canvassing.</li>
                    <li className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">Focus radio ads on **Agricultural Reforms** in rural Maharashtra constituencies.</li>
                </ul>
            </Card>
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">A/B Testing Framework</h3>
                <div className="space-y-4">
                    <div>
                        <p className="font-semibold">Current Test: Email Subject Lines</p>
                        <p className="text-sm text-textMuted">Segment: Likely Donors</p>
                        <div className="flex space-x-4 mt-2">
                            <div className="flex-1 p-2 border border-blue-400 rounded">A: "A new vision for India"</div>
                            <div className="flex-1 p-2 border border-green-400 rounded">B: "Support our cause today"</div>
                        </div>
                    </div>
                    <button className="w-full bg-primaryAccent text-black hover:text-gray-500 font-bold py-2 px-4 rounded-lg">Launch New Test</button>
                </div>
            </Card>
        </div>
    </div>
);

export default CampaignStrategyPage;