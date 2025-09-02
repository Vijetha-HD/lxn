import React from 'react';
import ArrowRightIcon from './ArrowRightIcon';
import AnimatedSection from './AnimatedSection';

const HomePage = ({ setPage }) => (
    <>
        {/* Hero Section */}
        <section id="home" className="relative bg-gray-50 pt-24 pb-32 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                 <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-gray-800 leading-tight mb-6" style={{textShadow: '0px 2px 4px rgba(0,0,0,0.05)'}}>
                    The Intelligence Behind Modern Victories
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-10">
                    LXN is the definitive AI-powered intelligence engine for political campaigns worldwide. We decode complexity, predict outcomes, and deliver the actionable insights you need to win.
                </p>
                <div className="flex justify-center items-center space-x-4">
                    <button onClick={() => setPage('Platform')} className="group bg-orange-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center">
                        Explore The Platform <ArrowRightIcon />
                    </button>
                </div>
                <div className="mt-20 relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl blur-xl opacity-20"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1633355444132-695d58763440?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="LXN Platform Dashboard showing global data" 
                        className="relative rounded-2xl shadow-2xl mx-auto border-8 border-white"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x675/1E293B/FFFFFF?text=Intelligence+Dashboard'; }}
                    />
                </div>
            </div>
        </section>

        {/* Social Proof */}
        <AnimatedSection className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <p className="text-center text-gray-500 font-semibold text-lg tracking-widest">POWERING STRATEGIC CAMPAIGNS AROUND THE GLOBE</p>
                <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-16 gap-y-4 mt-8 grayscale opacity-60">
                    <span className="font-bold text-2xl">Global Strategies</span>
                    <span className="font-bold text-2xl">Apex Campaigns</span>
                    <span className="font-bold text-2xl">Political Edge</span>
                    <span className="font-bold text-2xl">Veritas Analytics</span>
                    <span className="font-bold text-2xl">The War Room</span>
                </div>
            </div>
        </AnimatedSection>
        
        {/* Core Pillars Section */}
        <AnimatedSection className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">The Three Pillars of Victory</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">Our platform is built on a foundation of three core principles that deliver a decisive strategic advantage in any political arena.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-2xl font-bold text-blue-600 mb-3">Informed Decision-Making</h3>
                        <p className="text-gray-600">Replace guesswork and intuition with a constant stream of empirical data. Understand real-time voter sentiment, identify the issues that truly matter, and track campaign performance with granular KPIs. Every strategic choice is backed by evidence.</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-2xl font-bold text-orange-500 mb-3">Total Campaign Optimization</h3>
                        <p className="text-gray-600">Maximize the impact of every campaign dollar, every hour, and every message. Our platform analyzes the ROI of your ad spend, optimizes canvassing routes for field teams, and ensures your messaging resonates with target demographics for maximum efficiency.</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-2xl font-bold text-green-500 mb-3">Hyper-Personalized Connection</h3>
                        <p className="text-gray-600">Move beyond generic messaging. LXN enables you to understand and segment your electorate at a micro-level, allowing for personalized communication that builds genuine support, mobilizes volunteers, and drives turnout on election day.</p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    </>
);

export default HomePage;
