import React from 'react';
import AnimatedSection from './AnimatedSection';

const ContactSection = () => (
    <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">Want to learn more about LXN or schedule a demo? Reach out and our team will get back to you within 24 hours.</p>
            <form className="max-w-xl mx-auto">
                <div className="mb-6">
                    <input type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="mb-6">
                    <input type="email" placeholder="Your Email" className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="mb-6">
                    <textarea placeholder="Your Message" className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" rows="5"></textarea>
                </div>
                <button type="submit" className="bg-orange-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    Send Message
                </button>
            </form>
        </div>
    </AnimatedSection>
);

export default ContactSection;
