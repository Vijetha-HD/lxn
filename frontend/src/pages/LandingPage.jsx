





import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./css/LandingPage.css";
import "./css/Footer.css"
import geospacialImg  from "../assets/goespacial.png";
import financeImg from "../assets/financial&AdPerformanceConsole.png";
import competitorImg from "../assets/competitorIntelligenceMatrix.png";
import intelligenceImg from "../assets/intelligenceDashboard.png";
import "./css/loginbtn.css";
import "./css/headerLink.css";


// --- PREMIUM SVG ICONS ---
const ArrowRightIcon = ({ className = "h-5 w-5 ml-2" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} group-hover:translate-x-1 transition-transform`}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckCircleIcon = ({ className = "h-6 w-6 text-orange-500 mr-3" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

// --- ANIMATION COMPONENTS ---
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// --- UI COMPONENTS ---
const PageHeader = ({ title, subtitle, breadcrumbs }) => (
  <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-blue-950 text-white py-28 md:py-36">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')] opacity-10"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/30 to-blue-950/90"></div>
    
    <div className="container mx-auto px-6 text-center relative z-10">
      <div className="flex justify-center items-center mb-6">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="mx-3 text-blue-300">/</span>}
            <span className={`text-sm uppercase tracking-wider ${i === breadcrumbs.length - 1 ? "text-white font-semibold" : "text-blue-300"}`}>
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>
      
      <motion.h1 
        className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {title}
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {subtitle}
      </motion.p>
    </div>
    
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent opacity-5"></div>
  </div>
);

const RoleCard = ({ role, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full text-left 
      p-3 sm:p-4 md:p-5 lg:p-6 
      rounded-xl transition-all duration-300
      ${isActive
        ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl"
        : "bg-white/5 hover:bg-white/10 text-blue-100"
      }`}
  >
    <h4 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
      {role.name}
    </h4>
    <p className="text-xs sm:text-sm md:text-base opacity-80">
      {role.title}
    </p>
  </motion.button>
);


const CtaSection = ({ setPage }) => (
  <div className="relative bg-gradient-to-r from-blue-900 to-blue-950 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')] opacity-10"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/50 to-blue-900/80"></div>
    
    <div className="container mx-auto px-6 py-24 text-center relative z-10">
      <AnimatePresence>
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Access Your Intelligence Hub
        </motion.h2>
        
        <motion.p 
          className="text-xl text-blue-200 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Existing clients can log in to access their dashboards, analyze real-time data, and continue to shape their winning strategy.
        </motion.p>
        
        <motion.button
          onClick={() => setPage("login")}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-12 py-5 rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-2xl shadow-blue-500/20 flex items-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative z-10">Client Login</span>
          <ArrowRightIcon className="h-5 w-5 ml-3 relative z-10 group-hover:translate-x-1 transition-transform" />
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.button>
      </AnimatePresence>
    </div>
    
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent opacity-5"></div>
  </div>
);

const Footer = ({ setPage }) => {
  const navLinks = {
    Platform: ["Predictive Analytics", "Geospatial Intelligence", "Competitor Tracking", "Ad Performance"],
    Solutions: ["Campaign Manager", "Candidate", "Data Analyst", "Field Organizer","Communication Director"],
    Company: ["About Us", "Contact", "Careers", "Security"],
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-6 py-6 sm:py-8 md:py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* Logo & description */}
          <div className="col-span-full lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-white p-2 rounded-lg mr-3">
                <img src="https://lxn.app/lxn.png" alt="LXN Logo" className="h-8" />
              </div>
            </div>
            <p className="text-gray-400 max-w-xs">
              AI-Powered Political Intelligence for Decisive Victories, Worldwide.
            </p>

             <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

           {/* Dynamic Links */}
          {Object.keys(navLinks).map((section) => (
            <div key={section}>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">{section}</h3>
              <nav className="flex flex-col space-y-3">
                {navLinks[section].map((link) => (
                  <a
                    key={link}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(section);
                      
                    }}
                    className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Footer bottom */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} LXN. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};


// --- PAGE COMPONENTS ---
const HomePage = ({ setPage }) => {
  const stats = [
    { value: "87%", label: "Win Rate" },
    { value: "64", label: "Countries" },
    { value: "1200+", label: "Campaigns" },
    { value: "99.9%", label: "Uptime" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-blue-950 overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/30 to-blue-950/80"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Intelligence Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Modern Victories</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-blue-200 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            LXN is the definitive AI-powered intelligence engine for political campaigns worldwide. We decode complexity, predict outcomes, and deliver the actionable insights you need to win.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              onClick={() => setPage("Platform")}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-10 py-4 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-xl flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10">Explore The Platform</span>
              <ArrowRightIcon className="h-5 w-5 ml-3 relative z-10 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-sm text-blue-200 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Dashboard preview */}
        <motion.div 
          className="relative max-w-6xl mx-auto px-6 mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src={intelligenceImg}
              alt="LXN Platform Dashboard showing global data"
              className="w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/1200x675/1E293B/FFFFFF?text=Intelligence+Dashboard";
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">Trusted by leading organizations worldwide</p>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-md mx-auto"></div>
          </motion.div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-60">
            {["Global Strategies", "Apex Campaigns", "Political Edge", "Veritas Analytics", "The War Room"].map((logo, index) => (
              <motion.div
                key={logo}
                className="text-2xl font-bold text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Core Pillars Section */}
      <AnimatedSection className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              The Three Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Victory</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our platform is built on a foundation of three core principles that deliver a decisive strategic advantage in any political arena.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Informed Decision-Making",
                description: "Replace guesswork and intuition with a constant stream of empirical data. Understand real-time voter sentiment, identify the issues that truly matter, and track campaign performance with granular KPIs. Every strategic choice is backed by evidence.",
                color: "from-blue-600 to-blue-400"
              },
              {
                title: "Total Campaign Optimization",
                description: "Maximize the impact of every campaign dollar, every hour, and every message. Our platform analyzes the ROI of your ad spend, optimizes canvassing routes for field teams, and ensures your messaging resonates with target demographics for maximum efficiency.",
                color: "from-orange-600 to-orange-400"
              },
              {
                title: "Hyper-Personalized Connection",
                description: "Move beyond generic messaging. LXN enables you to understand and segment your electorate at a micro-level, allowing for personalized communication that builds genuine support, mobilizes volunteers, and drives turnout on election day.",
                color: "from-green-600 to-green-400"
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${pillar.color} mb-6`}></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="relative py-28 bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-950/50 to-blue-950/90"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Trusted by the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">People Who Win</span>
              </motion.h2>
              <motion.p 
                className="text-xl text-blue-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Don't just take our word for it. Hear from the strategists and managers who leverage LXN to secure victory on the world stage.
              </motion.p>
            </div>
            
            <div className="space-y-8">
              <motion.div
                className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-4xl text-blue-300 mb-4">"</div>
                <p className="text-lg text-blue-100 italic mb-6">
                  LXN didn't just give us data; it gave us clarity. For the first time, we could anticipate moves and allocate our budget with surgical precision. It was the single biggest factor in our victory.
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Alex Chen"
                    className="h-16 w-16 rounded-full border-2 border-orange-400 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/100x100/cccccc/ffffff?text=Avatar";
                    }}
                  />
                  <div className="ml-4">
                    <p className="font-bold text-white">Alex Chen</p>
                    <p className="text-blue-300">Chief Strategist, International Campaign</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      <CtaSection setPage={setPage} />
    </>
  );
};

const PlatformPage = ({ setPage }) => {
  const features = [
    {
      title: "Predictive Analytics Engine",
      description: "Forecast outcomes with proprietary machine learning models. Move beyond reactive polling to proactive, predictive strategy by forecasting voter turnout, election results, and sentiment shifts with unparalleled accuracy.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <GlobeIcon />
    },
    {
      title: "Geospatial Intelligence Hub",
      description: "Visualize your path to victory, district by district. Our interactive mapping tools transform complex demographic and electoral data into clear, actionable visualizations. Identify strongholds, pinpoint swing areas, and optimize resource allocation.",
      image: geospacialImg,
      icon: <ShieldIcon />
    },
    {
      title: "Competitor Intelligence Matrix",
      description: "Anticipate and neutralize opponent strategies. Gain a 360-degree view of your competitors by monitoring their media mentions, ad campaigns, and public statements in real-time, allowing you to counter their narrative and exploit weaknesses.",
      image: competitorImg,
      icon: <GlobeIcon />
    },
    {
      title: "Financial & Ad Performance Console",
      description: "Achieve maximum ROI on every campaign dollar. Track budget allocation vs. spend in real-time and analyze ad performance across digital and traditional media. Understand which messages and channels are delivering results.",
      image: financeImg,
      icon: <ShieldIcon />
    },
  ];

  return (
    <>
      <PageHeader
        title="The LXN Intelligence Platform"
        subtitle="An integrated ecosystem of tools designed to provide complete strategic command and control over your campaign."
        breadcrumbs={["Home", "Platform"]}
      />

      {features.map((feature, index) => (
        <AnimatedSection 
          key={feature.title} 
          className={`py-24 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
          delay={index * 0.1}
        >
          <div className="container mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? "lg:grid-flow-col-dense" : ""}`}>
              <div className={index % 2 !== 0 ? "lg:col-start-2" : ""}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{feature.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{feature.description}</p>
                <ul className="space-y-4">
                  {["Real-time Global Data Ingestion", "Customizable Dashboards", "Cross-Module Integration"].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <CheckCircleIcon className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 !== 0 ? "lg:col-start-1" : ""}>
                <motion.div 
                  className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x450/cccccc/ffffff?text=Image+Not+Available";
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      ))}
      
      <CtaSection setPage={setPage} />
    </>
  );
};

const SolutionsPage = ({ setPage }) => {
  const roles = [
    {
      name: "Campaign Manager",
       id: "campaign-manager",  
      title: "The Strategic Command Center",
      details: "Gain a holistic, at-a-glance overview of the campaign's health. Monitor top-level KPIs, track budget vs. spend, analyze competitor movements, and manage the entire events calendar from a single, integrated dashboard.",
      image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2647&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Candidate/Politician",
      id: "candidate",
      title: "The Actionable Briefing",
      details: "Receive a distilled, high-level daily briefing on the most critical metrics: public sentiment, media highlights, and key talking points. Access a library of approved speeches and messaging to ensure consistency and confidence.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Data Analyst",
       id: "data-analyst",
      title: "The Deep-Dive Laboratory",
      details: "Access a powerful workspace for advanced analytics. Monitor data pipelines, validate data integrity, track machine learning model performance, and run ad-hoc queries to uncover deep insights that drive strategy.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Field Organizer",
      id: "field-organizer",
      title: "The Ground-Game Command",
      details: "Manage on-the-ground operations with ruthless efficiency. Utilize an interactive map to coordinate volunteers, optimize canvassing routes, and monitor Get-Out-The-Vote (GOTV) efforts in real-time on election day.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
            { name: "Communications Director",
               id: "communications-director",
              title: "The Narrative Control Room", details: "Control the campaign's public narrative. Leverage a real-time media monitoring feed, manage press releases from draft to distribution, and plan a cohesive social media strategy with a visual content calendar.", image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];
  const [activeRole, setActiveRole] = useState(roles[0]);

  return (
    <>
      <PageHeader
        title="Solutions by Role"
        subtitle="Tailored intelligence for every member of your campaign team, ensuring seamless collaboration and unified strategic execution."
        breadcrumbs={["Home", "Solutions"]}
      />

      <AnimatedSection className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Select a Role</h3>
              <div className="space-y-4">
                {roles.map((role) => (
                  <RoleCard
                    key={role.name}
                    role={role}
                    isActive={activeRole.name === role.name}
                    onClick={() => setActiveRole(role)}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <motion.div 
                id={activeRole.id} // 👈 anchor for scrolling
                key={activeRole.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
              >
                <div className="rounded-xl overflow-hidden shadow-md mb-8">
                  <img
                    src={activeRole.image}
                    alt={activeRole.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/800x450/cccccc/ffffff?text=Image+Not+Available";
                    }}
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeRole.title}</h2>
                <p className="text-lg text-gray-600 mb-6">{activeRole.details}</p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {["Real-time Analytics", "Custom Reporting", "Role-based Access", "Mobile Ready"].map((feature, i) => (
                    <div key={i} className="flex items-center bg-gray-50 rounded-lg p-4">
                      <CheckCircleIcon className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      <CtaSection setPage={setPage} />
    </>
  );
};

const IntelligencePage = ({ setPage }) => {
  const sections = [
    {
      title: "AI & Machine Learning Core",
      content: "Our platform is powered by a suite of proprietary machine learning models trained on vast datasets of global electoral and demographic information. These models are constantly refined to predict outcomes, understand sentiment with cultural nuance, and identify hidden patterns that are invisible to human analysts.",
      icon: "🧠",
    },
    {
      title: "Global Data Pipeline & Validation",
      content: "We ingest and process terabytes of data from thousands of sources, including electoral rolls, census data, social media APIs, and media outlets worldwide. Our automated data validation pipeline ensures the highest level of accuracy and integrity, flagging anomalies and cleaning data before it enters our system.",
      icon: "⚙️",
    },
    {
      title: "Enterprise-Grade Security",
      content: "We understand that campaign data is your most valuable asset. Our platform is built on a secure-by-design private cloud infrastructure, featuring end-to-end encryption, multi-factor authentication, granular role-based access control (RBAC), and regular third-party security audits.",
      icon: "🛡️",
    },
    {
      title: "Seamless Integration",
      content: "LXN is designed to be the central hub of your tech stack. With a robust API and dedicated support, we integrate seamlessly with your existing tools and data sources, creating a single, unified source of truth for the entire campaign.",
      icon: "🔗",
    },
  ];

  return (
    <>
      <PageHeader
        title="The Intelligence Engine"
        subtitle="A look under the hood at the technology and security that powers the LXN platform."
        breadcrumbs={["Home", "Intelligence"]}
      />

      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-5xl mb-6">{section.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h3>
                <p className="text-gray-600">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Tech Stack Section */}
      <AnimatedSection className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with the most advanced and reliable technologies to ensure performance, scalability, and security.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: "TensorFlow", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" },
              { name: "Kubernetes", logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg" },
              { name: "PostgreSQL", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
              { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
              { name: "Node.js", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
              { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <img 
                  src={tech.logo} 
                  alt={tech.name} 
                  className="h-12 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/100x100/cccccc/ffffff?text=Tech+Logo";
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      <CtaSection setPage={setPage} />
    </>
  );
};

const AboutPage = ({ setPage }) => {
  const faqs = [
    {
      q: "How secure is our campaign data with LXN?",
      a: "Data security is our highest priority. We employ end-to-end encryption, multi-factor authentication, and operate on a secure, private cloud infrastructure compliant with the highest international standards. All data is siloed and access is strictly controlled via RBAC.",
    },
    {
      q: "What is the onboarding process like?",
      a: "We provide a white-glove onboarding experience. A dedicated account manager and data scientist will be assigned to your campaign to oversee data integration, team training, and initial strategic setup to ensure you are operational within days.",
    },
    {
      q: "Is the platform customizable?",
      a: "Yes. We work with high-level campaigns to develop custom models, dashboards, and integrations to meet specific strategic objectives.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      title: "Chief Data Scientist",
      bio: "Former head of AI research at Stanford, specializing in political behavior modeling.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "James Rodriguez",
      title: "Head of Security",
      bio: "Ex-NSA cybersecurity expert with 15 years experience protecting sensitive data.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Priya Patel",
      title: "VP of Strategy",
      bio: "Former campaign manager for multiple national-level elections across three continents.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Michael Okafor",
      title: "Lead Engineer",
      bio: "Built scalable systems for Fortune 500 companies before joining LXN.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <>
      <PageHeader
        title="About LXN Technologies"
        subtitle="Pioneering the future of political strategy worldwide through data and artificial intelligence."
        breadcrumbs={["Home", "About"]}
      />

      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our mission is to empower political parties and leaders across the globe with the tools and intelligence they need to run more effective, efficient, and data-driven campaigns. We believe that by replacing guesswork with evidence, we can foster a more responsive and sophisticated political landscape worldwide.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <GlobeIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Global Reach</h4>
                    <p className="text-gray-600">Supporting campaigns in 64 countries across 6 continents</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <ShieldIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Proven Security</h4>
                    <p className="text-gray-600">ISO 27001 certified with zero security breaches since founding</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="A diverse team collaborating in a modern office"
                className="w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Available";
                }}
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The brilliant minds behind LXN's cutting-edge technology and strategy.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x400/cccccc/ffffff?text=Team+Member";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.title}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about the LXN platform.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      <CtaSection setPage={setPage} />
    </>
  );
};

// --- MAIN APP COMPONENT (ROUTER) ---
export default function LandingPage({ page, setPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = ["Home", "Platform", "Solutions", "Intelligence", "About"];

  const renderPage = () => {
    switch (page) {
      case "Platform":
        return <PlatformPage setPage={setPage} />;
      case "Solutions":
        return <SolutionsPage setPage={setPage} />;
      case "Intelligence":
        return <IntelligencePage setPage={setPage} />;
      case "About":
        return <AboutPage setPage={setPage} />;
      case "Home":
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="bg-white font-sans antialiased">
      {/* Floating gradient background elements */}
      <div className="fixed -z-10 inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center cursor-pointer"
              onClick={() => setPage("Home")}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white p-2 rounded-lg mr-3">
                <img src="https://lxn.app/lxn.png" alt="LXN Logo" className="h-8" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block"></span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(link);
                    setIsMobileMenuOpen(false);
                  }}
                 className={`link font-medium text-base transition-colors duration-300 ease-in-out relative  
  ${page === link ? "text-black" : "text-gray-700 hover:text-black"}
`}

                  style={{ textDecoration: "none" }}
                  whileHover={{ y: -2 }}
                >
                  {link}
                  {(page === link || false) && (
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                      layoutId="navUnderline"
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Login Button (Desktop) */}
            <div className="hidden lg:block">
  <motion.button
    onClick={() => setPage("login")}
    className="login bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2.5  transition-all duration-300  hover:shadow-lg"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ background: "linear-gradient(to right, #2563eb, #1d4ed8)" }} // fixes gradient persist
  >
    Login
  </motion.button>
</div>


            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 focus:outline-none"
              >
                {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden overflow-hidden"
    >
      <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
        <nav className="flex flex-col space-y-3">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(link);
                setIsMobileMenuOpen(false);
              }}
              className={`link block text-center py-3 rounded-md transition-colors duration-300 ease-in-out relative ${
                page === link
                  ? "text-black font-bold"
                  : "text-gray-700 hover:text-black"
              }`}
              style={{ textDecoration: "none" }}
            >
              {link}
              {(page === link) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-blue-400" />
              )}
            </a>
          ))}
          <button
            onClick={() => setPage("login")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg mt-3"
          >
            Login
          </button>
        </nav>
      </div>
    </motion.div>
  )}
</AnimatePresence>

        </div>
      </header>

      <main>{renderPage()}</main>

      <Footer setPage={setPage} />

      {/* Add these styles to your CSS */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}