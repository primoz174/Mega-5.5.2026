import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface TextBlock {
    text: string;
    start: number;
    end: number;
}

interface SequenceHeroProps {
    frameCount: number;
    children?: React.ReactNode;
    textBlocks?: TextBlock[];
}

const SequenceHero: React.FC<SequenceHeroProps> = ({ frameCount, children, textBlocks = [] }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [loaderExiting, setLoaderExiting] = useState(false);

    // Cinematic entrance and parallax state
    const [isRevealed, setIsRevealed] = useState(false);
    const mousePos = useRef({ x: 0, y: 0 });
    const parallaxPos = useRef({ x: 0, y: 0 });
    const indicatorPos = useRef({ x: 0, y: 0 });
    const contentRef = useRef<HTMLDivElement>(null);
    const rafId = useRef<number>(0);
    const isTouchDevice = useRef(false);

    // SVG circle constants
    const CIRCLE_RADIUS = 58;
    const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

    // Helper to format frame number
    const formatFrame = (index: number) => {
        return index.toString().padStart(3, '0');
    };

    // Helper to get image path based on the user's files
    const getImagePath = (index: number) => {
        return `/sequence/frame_${formatFrame(index)}.webp`;
    };

    // Mouse-following and Parallax logic
    useEffect(() => {
        isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (isTouchDevice.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mousePos.current = { x: clientX, y: clientY };
        };

        const animateElements = () => {
            const lerp = 0.08;

            // Indicator position
            indicatorPos.current.x += (mousePos.current.x - indicatorPos.current.x) * lerp;
            indicatorPos.current.y += (mousePos.current.y - indicatorPos.current.y) * lerp;

            // Parallax position (subtle move in opposite direction)
            const parallaxLerp = 0.05;
            const targetX = (mousePos.current.x - window.innerWidth / 2) * -0.03;
            const targetY = (mousePos.current.y - window.innerHeight / 2) * -0.03;

            parallaxPos.current.x += (targetX - parallaxPos.current.x) * parallaxLerp;
            parallaxPos.current.y += (targetY - parallaxPos.current.y) * parallaxLerp;

            if (contentRef.current) {
                contentRef.current.style.transform = `translate3d(${parallaxPos.current.x}px, ${parallaxPos.current.y}px, 0)`;
            }

            rafId.current = requestAnimationFrame(animateElements);
        };

        mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        window.addEventListener('mousemove', handleMouseMove);
        rafId.current = requestAnimationFrame(animateElements);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId.current);
        };
    }, [isLoaded]);

    // Image preloading with progress tracking
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        const preloadImages = async () => {
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = getImagePath(i);
                img.decode()
                    .then(() => {
                        loadedImages[i] = img;
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
                        if (loadedCount === frameCount) {
                            setImages(loadedImages);
                            // Trigger exit animation before revealing
                            setLoaderExiting(true);
                            setTimeout(() => {
                                setIsLoaded(true);
                                window.dispatchEvent(new Event('heroLoaded'));
                                setTimeout(() => setIsRevealed(true), 100);
                            }, 800);
                        }
                    })
                    .catch((err) => {
                        console.error(`Failed to decode image at frame ${i}`, err);
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
                        if (loadedCount === frameCount) {
                            setImages(loadedImages);
                            setLoaderExiting(true);
                            setTimeout(() => {
                                setIsLoaded(true);
                                window.dispatchEvent(new Event('heroLoaded'));
                                setTimeout(() => setIsRevealed(true), 100);
                            }, 800);
                        }
                    });
            }
        };

        preloadImages();
    }, [frameCount]);

    useEffect(() => {
        if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(0);
        };

        const renderFrame = (index: number) => {
            const img = images[index];
            if (!img) return;

            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, x, y;

            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                x = 0;
                y = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                drawHeight = canvas.height;
                x = (canvas.width - drawWidth) / 2;
                y = 0;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, x, y, drawWidth, drawHeight);
        };

        window.addEventListener('resize', setCanvasSize);
        setCanvasSize();

        const sequence = { frame: 0 };

        const tl = gsap.to(sequence, {
            frame: frameCount - 1,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=150%',
                scrub: 0.1,
                pin: true,
                anticipatePin: 1,
            },
            onUpdate: function () {
                renderFrame(Math.round(sequence.frame));
                // @ts-ignore
                const progress = this.progress();

                textBlocks.forEach((block, index) => {
                    const el = textRefs.current[index];
                    if (!el) return;

                    let opacity = 0;
                    const fadeDuration = 0.08;

                    if (progress >= block.start && progress <= block.end) {
                        if (progress < block.start + fadeDuration) {
                            opacity = (progress - block.start) / fadeDuration;
                        } else if (progress > block.end - fadeDuration) {
                            opacity = (block.end - progress) / fadeDuration;
                        } else {
                            opacity = 1;
                        }
                    }

                    el.style.opacity = opacity.toString();
                    el.style.transform = `translateY(${20 * (1 - opacity)}px)`;
                });
            },
        });

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            tl.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [isLoaded, images, frameCount]);

    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Calculate stroke offset for progress ring
    const strokeDashoffset = CIRCLE_CIRCUMFERENCE - (loadProgress / 100) * CIRCLE_CIRCUMFERENCE;

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-white dark:bg-industrial-black overflow-hidden isolate">
            <canvas
                ref={canvasRef}
                className={`absolute inset-0 block w-full h-full object-cover z-0 transition-all duration-1000 ease-out ${isRevealed ? 'blur-0 scale-100' : 'blur-xl scale-110 opacity-0'
                    }`}
            />

            <div
                ref={contentRef}
                className="relative z-10 w-full h-full pointer-events-none flex items-center justify-center will-change-transform"
            >
                {/* Custom Sequential Text Blocks */}
                {isLoaded && textBlocks.map((block, index) => (
                    <div
                        key={index}
                        ref={(el) => { textRefs.current[index] = el }}
                        className="absolute text-center px-6 transition-transform duration-500 ease-out will-change-transform"
                        style={{
                            opacity: 0,
                            transform: 'translateY(20px)',
                            maxWidth: '800px',
                            zIndex: 30
                        }}
                    >
                        <h2
                            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                            style={{
                                textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            {block.text}
                        </h2>
                    </div>
                ))}

                {children}
            </div>

            {/* ===== PRECISION CIRCLE LOADER ===== */}
            {!isLoaded && (
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-white dark:bg-black z-30 transition-all duration-700 ${loaderExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                        }`}
                >
                    <div className={`flex flex-col items-center gap-6 transition-all duration-500 ${loaderExiting ? 'scale-110' : 'scale-100'
                        }`}>
                        {/* Circle + Logo container */}
                        <div className="relative w-[140px] h-[140px] flex items-center justify-center">
                            {/* Background ring */}
                            <svg
                                className="absolute inset-0 w-full h-full -rotate-90"
                                viewBox="0 0 140 140"
                            >
                                <circle
                                    cx="70"
                                    cy="70"
                                    r={CIRCLE_RADIUS}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="text-gray-200 dark:text-white/10"
                                />
                                {/* Progress ring */}
                                <circle
                                    cx="70"
                                    cy="70"
                                    r={CIRCLE_RADIUS}
                                    fill="none"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray={CIRCLE_CIRCUMFERENCE}
                                    strokeDashoffset={strokeDashoffset}
                                    className="transition-all duration-300 ease-out"
                                    style={{
                                        filter: loaderExiting ? 'drop-shadow(0 0 12px rgba(0,113,227,0.8))' : 'drop-shadow(0 0 4px rgba(0,113,227,0.3))',
                                    }}
                                />
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#0071e3" />
                                        <stop offset="100%" stopColor="#34d399" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Logo in center */}
                            <motion.img
                                layoutId="hero-logo-img"
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                src="https://megama.si/wp-content/uploads/2021/01/cropped-cropped-website_logo_transparent_background-1-1.png"
                                alt="MEGAMA"
                                className="w-16 h-auto relative z-10"
                            />
                        </div>

                        {/* Progress percentage */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-2xl font-light text-[#1d1d1f] dark:text-white tabular-nums tracking-tight">
                                {loadProgress}%
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 dark:text-white/30 font-medium">
                                {loaderExiting ? 'Ready' : 'Loading'}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SequenceHero;
