import React from 'react';
import PageHeader from './PageHeader';
import AnimatedSection from './AnimatedSection';
import CheckCircleIcon from './CheckCircleIcon';
import CtaSection from './CtaSection';

const features = [
    { title: "Predictive Analytics Engine", description: "Forecast outcomes with proprietary machine learning models. Move beyond reactive polling to proactive, predictive strategy by forecasting voter turnout, election results, and sentiment shifts with unparalleled accuracy.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Geospatial Intelligence Hub", description: "Visualize your path to victory, district by district. Our interactive mapping tools transform complex demographic and electoral data into clear, actionable visualizations. Identify strongholds, pinpoint swing areas, and optimize resource allocation.", image: "https://images.unsplash.com/photo-1579169182497-9DC9d364a551?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Competitor Intelligence Matrix", description: "Anticipate and neutralize opponent strategies. Gain a 360-degree view of your competitors by monitoring their media mentions, ad campaigns, and public statements in real-time, allowing you to counter their narrative and exploit weaknesses.", image: "https://images.unsplash.com/photo-1611926653458-092a4234cfb2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Financial & Ad Performance Console", description: "Achieve maximum ROI on every campaign dollar. Track budget allocation vs. spend in real-time and analyze ad performance across digital and traditional media. Understand which messages and channels are delivering results.", image: "https://images.unsplash.com/photo-1642792969935-63713559527f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const PlatformPage = () => (
    <>
        <PageHeader title="The LXN Intelligence Platform" subtitle="An integrated ecosystem of tools designed to provide complete strategic command and control over your campaign." breadcrumbs={["Home", "Platform"]} />
        {features.map((feature, index) => (
            <AnimatedSection key={feature.title} className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="container mx-auto px-6">
                    <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                        <div className={index % 2 !== 0 ? 'lg:col-start-2' : ''}>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{feature.title}</h2>
                            <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-700 font-medium"><CheckCircleIcon /> Real-time Global Data Ingestion</li>
                                <li className="flex items-center text-gray-700 font-medium"><CheckCircleIcon /> Customizable Dashboards</li>
                                <li className="flex items-center text-gray-700 font-medium"><CheckCircleIcon /> Cross-Module Integration</li>
                            </ul>
                        </div>
                        <div className={index % 2 !== 0 ? 'lg:col-start-1' : ''}>
                            <img src={feature.image} alt={feature.title} className="rounded-xl shadow-2xl object-cover w-full h-full" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x450/cccccc/ffffff?text=Image+Not+Available'; }}/>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        ))}
        <CtaSection />
    </>
);

export default PlatformPage;
