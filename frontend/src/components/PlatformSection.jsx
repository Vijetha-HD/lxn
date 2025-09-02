import React from 'react';
import AnimatedSection from './AnimatedSection';

const PlatformSection = () => (
    <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">The LXN Platform</h2>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">A unified intelligence engine designed for campaign managers, strategists, and data teams. LXN brings together advanced analytics, predictive modeling, and real-time reporting in a single, intuitive dashboard.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-blue-600 mb-3">Data Aggregation</h3>
                    <p className="text-gray-600">Integrate polling, social media, field reports, and historical data for a 360-degree view of the political landscape.</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-orange-500 mb-3">Predictive Analytics</h3>
                    <p className="text-gray-600">Leverage machine learning to forecast voter behavior, turnout, and the impact of campaign tactics.</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-green-500 mb-3">Actionable Insights</h3>
                    <p className="text-gray-600">Receive clear, actionable recommendations to optimize strategy, messaging, and resource allocation.</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

export default PlatformSection;
