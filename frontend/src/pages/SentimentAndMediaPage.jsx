import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import mockData from '../data/mockData';

const SentimentAndMediaPage = () => (
  <div className="px-4 sm:px-6 lg:px-8 py-6">
    {/* Page Title */}
    <PageTitle
      title="Sentiment & Media Monitoring"
      subtitle="Real-time tracking of the public conversation."
    />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Live Media Feed */}
      <div className="lg:col-span-2">
        <Card className="p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Live Media Feed
          </h3>
          <ul className="space-y-4 max-h-[26rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
            {mockData.sentimentAnalysis.mediaFeed.map((item, index) => (
              <li
                key={index}
                className={`border-l-4 pl-4 transition-colors hover:bg-gray-50 rounded-sm ${
                  item.sentiment === 'positive'
                    ? 'border-green-400'
                    : item.sentiment === 'negative'
                    ? 'border-red-400'
                    : 'border-gray-400'
                }`}
              >
                <p className="font-bold text-gray-900">{item.source}</p>
                <p className="text-sm text-gray-600">{item.text}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Keywords Section */}
      <div className="flex flex-col gap-6">
        <Card className="p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Positive Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {mockData.sentimentAnalysis.keywords.positive.map((kw) => (
              <span
                key={kw}
                className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm hover:scale-105 transition-transform"
              >
                {kw}
              </span>
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Negative Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {mockData.sentimentAnalysis.keywords.negative.map((kw) => (
              <span
                key={kw}
                className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm hover:scale-105 transition-transform"
              >
                {kw}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);

export default SentimentAndMediaPage;
