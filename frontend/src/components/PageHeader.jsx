import React from 'react';
import AnimatedSection from './AnimatedSection';

const PageHeader = ({ title, subtitle, breadcrumbs }) => (
    <AnimatedSection className="bg-gray-900 text-white py-20 md:py-28 bg-cover bg-center" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')"}}>
        <div className="container mx-auto px-6 text-center">
            <div className="text-gray-400 mb-4">
                {breadcrumbs.map((crumb, i) => (
                    <span key={i}>
                        {i > 0 && <span className="mx-2">/</span>}
                        <span className={i === breadcrumbs.length - 1 ? "text-white font-semibold" : ""}>{crumb}</span>
                    </span>
                ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </AnimatedSection>
);

export default PageHeader;
