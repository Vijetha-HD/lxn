import React from 'react';
import PageHeader from './PageHeader';
import AnimatedSection from './AnimatedSection';
import CtaSection from './CtaSection';

const sections = [
    { title: "AI & Machine Learning Core", content: "Our platform is powered by a suite of proprietary machine learning models trained on vast datasets of global electoral and demographic information. These models are constantly refined to predict outcomes, understand sentiment with cultural nuance, and identify hidden patterns that are invisible to human analysts.", icon: "🧠" },
    { title: "Global Data Pipeline & Validation", content: "We ingest and process terabytes of data from thousands of sources, including electoral rolls, census data, social media APIs, and media outlets worldwide. Our automated data validation pipeline ensures the highest level of accuracy and integrity, flagging anomalies and cleaning data before it enters our system.", icon: "⚙️" },
    { title: "Enterprise-Grade Security", content: "We understand that campaign data is your most valuable asset. Our platform is built on a secure-by-design private cloud infrastructure, featuring end-to-end encryption, multi-factor authentication, granular role-based access control (RBAC), and regular third-party security audits.", icon: "🛡️" },
    { title: "Seamless Integration", content: "LXN is designed to be the central hub of your tech stack. With a robust API and dedicated support, we integrate seamlessly with your existing tools and data sources, creating a single, unified source of truth for the entire campaign.", icon: "🔗" },
];

const IntelligencePage = () => (
    <>
        <PageHeader title="The Intelligence Engine" subtitle="A look under the hood at the technology and security that powers the LXN platform." breadcrumbs={["Home", "Intelligence"]} />
        <AnimatedSection className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-10">
                    {sections.map(section => (
                        <div key={section.title} className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-5xl mb-4">{section.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{section.title}</h3>
                            <p className="text-gray-600">{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
        <CtaSection />
    </>
);

export default IntelligencePage;
