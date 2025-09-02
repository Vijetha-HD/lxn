import React from 'react';
import PageHeader from './PageHeader';
import AnimatedSection from './AnimatedSection';
import CtaSection from './CtaSection';

const faqs = [
    { q: "How secure is our campaign data with LXN?", a: "Data security is our highest priority. We employ end-to-end encryption, multi-factor authentication, and operate on a secure, private cloud infrastructure compliant with the highest international standards. All data is siloed and access is strictly controlled via RBAC." },
    { q: "What is the onboarding process like?", a: "We provide a white-glove onboarding experience. A dedicated account manager and data scientist will be assigned to your campaign to oversee data integration, team training, and initial strategic setup to ensure you are operational within days." },
    { q: "Is the platform customizable?", a: "Yes. We work with high-level campaigns to develop custom models, dashboards, and integrations to meet specific strategic objectives." },
];

const AboutPage = () => (
    <>
        <PageHeader title="About LXN Technologies" subtitle="Pioneering the future of political strategy worldwide through data and artificial intelligence." breadcrumbs={["Home", "About"]} />
        <AnimatedSection className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-600">Our mission is to empower political parties and leaders across the globe with the tools and intelligence they need to run more effective, efficient, and data-driven campaigns. We believe that by replacing guesswork with evidence, we can foster a more responsive and sophisticated political landscape worldwide.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A diverse team collaborating in a modern office" className="rounded-xl shadow-xl" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Available'; }}/>
                </div>
            </div>
        </AnimatedSection>
        <AnimatedSection className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.q}</h3>
                            <p className="text-gray-600">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
        <CtaSection />
    </>
);

export default AboutPage;
