import React from 'react';

const Footer = ({ setPage }) => {
    const navLinks = {
        Platform: ["Predictive Analytics", "Geospatial Intelligence", "Competitor Tracking", "Ad Performance"],
        Solutions: ["Campaign Manager", "Candidate", "Data Analyst", "Field Organizer"],
        Company: ["About Us", "Contact", "Careers", "Security"],
    };
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
                    <div className="col-span-full lg:col-span-2">
                        <img src="https://lxn.app/lxn.png" alt="LXN Logo" className="h-10 bg-white p-1 rounded-md"/>
                        <p className="text-gray-400 mt-4 max-w-xs">AI-Powered Political Intelligence for Decisive Victories, Worldwide.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-200">Platform</h3>
                        <nav className="flex flex-col space-y-3">
                            {navLinks.Platform.map(link => <button key={link} onClick={() => setPage('Platform')} className="text-left text-gray-400 hover:text-orange-400 transition-colors">{link}</button>)}
                        </nav>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-200">Solutions</h3>
                        <nav className="flex flex-col space-y-3">
                            {navLinks.Solutions.map(link => <button key={link} onClick={() => setPage('Solutions')} className="text-left text-gray-400 hover:text-orange-400 transition-colors">{link}</button>)}
                        </nav>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-200">Company</h3>
                        <nav className="flex flex-col space-y-3">
                            {navLinks.Company.map(link => <button key={link} onClick={() => setPage('About')} className="text-left text-gray-400 hover:text-orange-400 transition-colors">{link}</button>)}
                        </nav>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} LXN Technologies. All Rights Reserved. For demonstration purposes only.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
