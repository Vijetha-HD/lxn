import React from 'react';
import AnimatedSection from './AnimatedSection';
import ArrowRightIcon from './ArrowRightIcon';

const CtaSection = () => (
    <AnimatedSection className="bg-gray-800">
        <div className="container mx-auto px-6 py-24 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Access Your Intelligence Hub</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10">
                Existing clients can log in to access their dashboards, analyze real-time data, and continue to shape their winning strategy.
            </p>
            <button className="group bg-orange-500 text-white font-bold px-10 py-5 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center mx-auto">
                Client Login <ArrowRightIcon />
            </button>
        </div>
    </AnimatedSection>
);

export default CtaSection;
