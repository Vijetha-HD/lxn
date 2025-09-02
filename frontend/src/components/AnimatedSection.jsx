import React, { useRef, useState, useEffect } from 'react';

const AnimatedSection = ({ children, className = '' }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(ref.current);
            }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => { if(ref.current) observer.unobserve(ref.current); };
    }, []);
    return (
        <section ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}>
            {children}
        </section>
    );
};

export default AnimatedSection;
