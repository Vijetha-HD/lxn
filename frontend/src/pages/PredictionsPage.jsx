import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import ChartPlaceholder from '../components/ChartPlaceholder';
import UsersIcon from '../icons/UsersIcon';
import mockData from '../data/mockData';
const PredictionsPage = () => (
    <div>
        <PageTitle title="Predictive Analytics" subtitle="Machine learning models to forecast campaign-critical outcomes." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Election Outcome Forecaster</h3>
                 <table className="w-full text-left">
                    <thead><tr className="border-b"><th className="pb-2">State</th><th className="pb-2">Win Probability</th></tr></thead>
                    <tbody>
                        {mockData.electionForecast.map(item => (
                            <tr key={item.state} className="border-b border-borderLight dark:border-borderDark">
                                <td className="py-2">{item.state}</td>
                                <td className="py-2 font-bold">{item.winProbability}%</td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </Card>
            <ChartPlaceholder title="Voter Turnout Predictor" icon={UsersIcon}>
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-textMuted">
                    [Bar Chart: Turnout by Age Group]
                </div>
            </ChartPlaceholder>
        </div>
    </div>
);

export default PredictionsPage;