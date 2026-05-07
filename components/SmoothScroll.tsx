import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Expose Lenis instance globally so overlays can stop/start scrolling
declare global {
    interface Window {
        __lenis?: Lenis;
    }
}

interface SmoothScrollProps {
    children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    useEffect(() => {
        // Safari/iOS already has good native momentum scroll — Lenis fights it and causes lag.
        // Also skip when the user prefers reduced motion.
        const ua = navigator.userAgent;
        const isWebKit = /^((?!chrome|android).)*safari/i.test(ua) || /iPad|iPhone|iPod/.test(ua);
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isWebKit || reduced) return;

        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        // Make Lenis accessible to other components
        window.__lenis = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            window.__lenis = undefined;
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
