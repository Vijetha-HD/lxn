import React, { useState } from 'react';
import PageHeader from './PageHeader';
import AnimatedSection from './AnimatedSection';
import CtaSection from './CtaSection';

const roles = [
    { name: "Campaign Manager", title: "The Strategic Command Center", details: "Gain a holistic, at-a-glance overview of the campaign's health. Monitor top-level KPIs, track budget vs. spend, analyze competitor movements, and manage the entire events calendar from a single, integrated dashboard.", image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2647&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Candidate/Politician", title: "The Actionable Briefing", details: "Receive a distilled, high-level daily briefing on the most critical metrics: public sentiment, media highlights, and key talking points. Access a library of approved speeches and messaging to ensure consistency and confidence.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Data Analyst", title: "The Deep-Dive Laboratory", details: "Access a powerful workspace for advanced analytics. Monitor data pipelines, validate data integrity, track machine learning model performance, and run ad-hoc queries to uncover deep insights that drive strategy.", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Field Organizer", title: "The Ground-Game Command", details: "Manage on-the-ground operations with ruthless efficiency. Utilize an interactive map to coordinate volunteers, optimize canvassing routes, and monitor Get-Out-The-Vote (GOTV) efforts in real-time on election day.", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Communications Director", title: "The Narrative Control Room", details: "Control the campaign's public narrative. Leverage a real-time media monitoring feed, manage press releases from draft to distribution, and plan a cohesive social media strategy with a visual content calendar.", image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const SolutionsPage = () => {
    const [activeRole, setActiveRole] = useState(roles[0]);
    return (
        <>
            <PageHeader title="Solutions by Role" subtitle="Tailored intelligence for every member of your campaign team, ensuring seamless collaboration and unified strategic execution." breadcrumbs={["Home", "Solutions"]} />
            <AnimatedSection className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/3">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Select a Role</h3>
                            <div className="space-y-3">
                                {roles.map(role => (
                                    <button key={role.name} onClick={() => setActiveRole(role)} className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${activeRole.name === role.name ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white hover:bg-gray-100 hover:shadow-md'}`}>
                                        <span className="font-bold">{role.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-2/3">
                            <div className="bg-white p-8 rounded-xl shadow-2xl">
                                <img src={activeRole.image} alt={activeRole.name} className="rounded-lg shadow-md mb-6 w-full h-80 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/500x350/cccccc/ffffff?text=Image+Not+Available'; }} />
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">{activeRole.title}</h2>
                                <p className="text-lg text-gray-600">{activeRole.details}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
            <CtaSection />
        </>
    );
};

export default SolutionsPage;
