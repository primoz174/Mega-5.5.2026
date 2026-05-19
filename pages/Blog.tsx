import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Tag as TagIcon, 
  ArrowRight, 
  Search, 
  X, 
  Share2, 
  Printer, 
  Activity, 
  Layers, 
  Globe, 
  CheckCircle,
  FileText,
  AlertCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { articles, Article, Tag } from '../data/blogArticles';

// ==========================================
// INTERACTIVE NDT SCANNER SIMULATOR (CANVAS)
// ==========================================
const NdtScanner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [probePos, setProbePos] = useState({ x: 175, isHovered: false });
  const [scanStats, setScanStats] = useState({ amp: 0, depth: 0, status: 'STANDBY' });

  // Track cursor position to control ultrasonic probe
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // Constrain probe movement to plate bounds
    const constrainedX = Math.max(60, Math.min(240, x));
    setProbePos({ x: constrainedX, isHovered: true });
  };

  const handleMouseLeave = () => {
    setProbePos(prev => ({ ...prev, isHovered: false }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const render = () => {
      time += 1;
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Background Grid System
      ctx.strokeStyle = 'rgba(0, 113, 227, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Probe X position logic (Auto-slide when not hovered)
      let currentX = probePos.x;
      if (!probePos.isHovered) {
        // Auto oscillate probe position back and forth
        currentX = 150 + Math.sin(time * 0.015) * 80;
      }

      // 3. Define Physical Features
      const weldCenterX = 180;
      const defectX = 195;
      const defectY = 120;
      const defectRadius = 3;

      // Calculate distance from probe to defect sweep zone
      // Optimal detection point is when probe directs beam at defect (around probeX = 140 for a 45-degree shear wave)
      const optimalScanX = defectX - 55; 
      const distanceToOptimal = Math.abs(currentX - optimalScanX);
      const isDetecting = distanceToOptimal < 25;
      
      // Calculate amplitude signal
      const signalAmplitude = isDetecting 
        ? Math.max(5, Math.round(95 - (distanceToOptimal * 3.5) + Math.sin(time * 0.2) * 4)) 
        : Math.round(10 + Math.sin(time * 0.1) * 3);

      const calculatedDepth = isDetecting 
        ? (48.2 + Math.sin(time * 0.05) * 0.1).toFixed(1) 
        : '0.0';

      // Update state for numeric displays (throttled to avoid rendering thrashing)
      if (time % 5 === 0) {
        setScanStats({
          amp: signalAmplitude,
          depth: isDetecting ? parseFloat(calculatedDepth) : 0,
          status: isDetecting ? 'DEFECT DETECTED' : 'SCANNING'
        });
      }

      // 4. Draw Steel Plates (Cross Section)
      // Left Plate
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      ctx.rect(10, 80, 145, 70);
      ctx.fill();
      ctx.stroke();

      // Right Plate
      ctx.beginPath();
      ctx.rect(205, 80, 105, 70);
      ctx.fill();
      ctx.stroke();

      // Weld Joint (V-Groove geometry)
      ctx.fillStyle = 'rgba(0, 113, 227, 0.05)';
      ctx.beginPath();
      ctx.moveTo(155, 80);
      ctx.lineTo(205, 80);
      ctx.lineTo(190, 150);
      ctx.lineTo(170, 150);
      ctx.closePath();
      ctx.fill();
      
      // Weld cap and root boundaries (dashed lines)
      ctx.strokeStyle = 'rgba(0, 113, 227, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Weld Bead Reinforcement (top and bottom curves)
      ctx.fillStyle = 'rgba(0, 113, 227, 0.1)';
      ctx.beginPath();
      ctx.arc(180, 80, 27, Math.PI, 0, false);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(180, 150, 12, 0, Math.PI, false);
      ctx.fill();

      // 5. Draw Simulated Internal Defect (Slag / Crack)
      ctx.fillStyle = isDetecting ? '#ef4444' : '#555555';
      ctx.shadowBlur = isDetecting ? 15 : 0;
      ctx.shadowColor = '#ef4444';
      ctx.beginPath();
      ctx.arc(defectX, defectY, defectRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // Reset glow

      // 6. Draw Transducer Probe
      const probeWidth = 36;
      const probeHeight = 18;
      const probeY = 80 - probeHeight;
      
      // Probe body
      ctx.fillStyle = '#121212';
      ctx.strokeStyle = '#0071e3';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(currentX - probeWidth / 2, probeY, probeWidth, probeHeight, 3);
      ctx.fill();
      ctx.stroke();

      // Connector pin
      ctx.fillStyle = '#86868b';
      ctx.fillRect(currentX - 3, probeY - 4, 6, 4);

      // Acoustic coupling liquid layer (thin cyan line under probe)
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(currentX - probeWidth / 2, 80);
      ctx.lineTo(currentX + probeWidth / 2, 80);
      ctx.stroke();

      // 7. Draw Phased Array Sound Beams (Sectorial Sweep)
      const numBeams = 11;
      const startAngle = 40 * Math.PI / 180; // 40 degrees
      const endAngle = 72 * Math.PI / 180;   // 72 degrees
      
      for (let i = 0; i < numBeams; i++) {
        const ratio = i / (numBeams - 1);
        const angle = startAngle + ratio * (endAngle - startAngle);
        
        // Beam projection vectors
        const beamStartX = currentX + 6; // slightly forward element index
        const beamStartY = 80;
        
        // Calculate penetration length to backwall (y=150)
        const targetY = 150;
        const length = (targetY - beamStartY) / Math.cos(angle - Math.PI/4);
        
        const beamEndX = beamStartX + length * Math.sin(angle);
        const beamEndY = targetY;

        // Check if this specific beam ray intersects the defect
        // Simple line-point distance check
        const dx = beamEndX - beamStartX;
        const dy = beamEndY - beamStartY;
        const t_proj = Math.max(0, Math.min(1, ((defectX - beamStartX) * dx + (defectY - beamStartY) * dy) / (dx*dx + dy*dy)));
        const projX = beamStartX + t_proj * dx;
        const projY = beamStartY + t_proj * dy;
        const distToDefect = Math.hypot(defectX - projX, defectY - projY);
        
        const rayHitsDefect = distToDefect < 8;

        ctx.lineWidth = rayHitsDefect ? 2 : 0.8;
        ctx.strokeStyle = rayHitsDefect 
          ? `rgba(239, 68, 68, ${0.4 + Math.sin(time * 0.2) * 0.2})` 
          : 'rgba(0, 113, 227, 0.15)';
        
        ctx.beginPath();
        ctx.moveTo(beamStartX, beamStartY);
        
        if (rayHitsDefect) {
          // Draw reflection back to probe
          ctx.lineTo(defectX, defectY);
          ctx.stroke();
          
          ctx.strokeStyle = `rgba(239, 68, 68, ${0.6 + Math.sin(time * 0.2) * 0.2})`;
          ctx.beginPath();
          ctx.moveTo(defectX, defectY);
          ctx.lineTo(currentX - 6, 80); // reflection returns to receiver element
          ctx.stroke();
        } else {
          ctx.lineTo(beamEndX, beamEndY);
          ctx.stroke();
        }
      }

      // 8. Draw A-SCAN Oscilloscope (Right side: x=330 to 480)
      const oscX = 340;
      const oscY = 30;
      const oscW = 140;
      const oscH = 130;

      // Draw Scope Screen
      ctx.fillStyle = '#020202';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(oscX, oscY, oscW, oscH, 6);
      ctx.fill();
      ctx.stroke();

      // Screen Grid Lines
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.08)';
      ctx.setLineDash([2, 3]);
      // Vertical grid
      for (let gx = oscX + 20; gx < oscX + oscW; gx += 20) {
        ctx.beginPath();
        ctx.moveTo(gx, oscY);
        ctx.lineTo(gx, oscY + oscH);
        ctx.stroke();
      }
      // Horizontal grid
      for (let gy = oscY + 20; gy < oscY + oscH; gy += 20) {
        ctx.beginPath();
        ctx.moveTo(oscX, gy);
        ctx.lineTo(oscX + oscW, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw Neon Green A-Scan Waveform
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#00ff41';
      ctx.beginPath();
      
      ctx.moveTo(oscX + 2, oscY + oscH - 10);
      
      // Generate synthetic RF signal wave points
      for (let px = 0; px < oscW - 4; px++) {
        const screenX = oscX + 2 + px;
        let amplitude = 0;
        
        // A) Initial Pulse (at beginning)
        if (px < 15) {
          amplitude = Math.sin(px * 0.6) * 55 * Math.exp(-px * 0.15);
        }
        
        // B) Defect Reflection (in middle, height depends on isDetecting)
        const defectPeakPos = 65;
        if (px >= 40 && px <= 90) {
          const distFromPeak = Math.abs(px - defectPeakPos);
          const rawAmp = signalAmplitude * 0.9;
          amplitude = Math.sin((px - 40) * 0.5) * rawAmp * Math.exp(-distFromPeak * 0.12);
        }

        // C) Backwall Echo (near end)
        const backwallPeakPos = 115;
        if (px >= 100 && px <= 135) {
          const distFromPeak = Math.abs(px - backwallPeakPos);
          const rawAmp = 35 + Math.sin(time * 0.05) * 3;
          amplitude = Math.sin((px - 100) * 0.7) * rawAmp * Math.exp(-distFromPeak * 0.15);
        }

        // Noise floor
        amplitude += Math.sin(px * 1.5 + time * 0.8) * 1.5;

        // Constrain and invert amplitude for canvas y-coordinates (y goes down)
        const drawY = Math.max(oscY + 5, Math.min(oscY + oscH - 5, oscY + oscH - 10 - amplitude));
        ctx.lineTo(screenX, drawY);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset glow

      // Label inside Oscilloscope Screen
      ctx.fillStyle = 'rgba(0, 255, 65, 0.6)';
      ctx.font = '7px JetBrains Mono, monospace';
      ctx.fillText('A-SCAN RF', oscX + 8, oscY + 12);
      ctx.fillText(`F1: 5.0 MHz`, oscX + 8, oscY + 22);
      ctx.fillText(`GATE A: ${signalAmplitude}%`, oscX + 80, oscY + 12);

      // 9. Status Bar overlay at bottom of canvas
      ctx.fillStyle = '#0b0b0c';
      ctx.fillRect(10, 175, width - 20, 22);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 175, width - 20, 22);

      // Text statuses
      ctx.font = '8px JetBrains Mono, monospace';
      ctx.fillStyle = '#86868b';
      ctx.fillText('SYS: OK', 20, 189);
      ctx.fillText('MODE: SHEAR WAVE', 80, 189);
      ctx.fillText(`RANGE: 120.0mm`, 180, 189);
      
      // Neon green or red blinking light
      ctx.fillStyle = isDetecting ? '#ef4444' : '#00ff41';
      ctx.beginPath();
      ctx.arc(285, 186, 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = isDetecting ? '#ef4444' : '#e1e1e1';
      ctx.fillText(isDetecting ? 'ALARM / PEAK' : 'STABLE', 293, 189);

      // Loop frame
      animationId = requestAnimationFrame(render);
    };

    // Initialize high DPI canvas setting
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 500 * dpr;
    canvas.height = 210 * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '210px';
    ctx.scale(dpr, dpr);

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [probePos]);

  return (
    <div ref={containerRef} className="w-full bg-black/45 border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,113,227,0.06)] relative overflow-hidden backdrop-blur-md">
      {/* Decorative scan overlay bar */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-apple-blue/50 to-transparent animate-scan" />
      
      {/* Technical Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-apple-blue animate-pulse" />
          <span className="font-mono text-xs text-white font-bold tracking-wider">NDT COGNITIVE DIAGNOSTIC CONSOLE</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-apple-blue/10 border border-apple-blue/20">
          <span className="w-1.5 h-1.5 rounded-full bg-apple-blue animate-ping" />
          <span className="font-mono text-[9px] text-apple-blue font-bold uppercase">LIVE FEED</span>
        </div>
      </div>

      {/* Canvas Element */}
      <canvas 
        ref={canvasRef} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
        className="rounded-lg cursor-crosshair border border-white/5 bg-[#050505] transition-all duration-300 hover:border-apple-blue/20 w-full"
      />

      {/* Grid Stats Bar below Canvas */}
      <div className="grid grid-cols-4 gap-2 mt-4 pt-1 border-t border-white/5 text-center font-mono">
        <div className="bg-white/[0.01] border border-white/5 rounded p-2 flex flex-col justify-center">
          <span className="text-[9px] text-gray-500 uppercase tracking-wider block">PROBE COORD</span>
          <span className="text-xs text-white font-semibold mt-0.5">X: {Math.round(probePos.x)} mm</span>
        </div>
        <div className="bg-white/[0.01] border border-white/5 rounded p-2 flex flex-col justify-center">
          <span className="text-[9px] text-gray-500 uppercase tracking-wider block">SIGNAL GAIN</span>
          <span className="text-xs text-white font-semibold mt-0.5">48.0 dB</span>
        </div>
        <div className="bg-white/[0.01] border border-white/5 rounded p-2 flex flex-col justify-center">
          <span className="text-[9px] text-gray-500 uppercase tracking-wider block">ECHO AMPLITUDE</span>
          <span className={`text-xs font-semibold mt-0.5 transition-colors duration-200 ${scanStats.amp > 60 ? 'text-red-400' : 'text-green-400'}`}>
            {scanStats.amp}%
          </span>
        </div>
        <div className="bg-white/[0.01] border border-white/5 rounded p-2 flex flex-col justify-center">
          <span className="text-[9px] text-gray-500 uppercase tracking-wider block">INDICATOR DEPTH</span>
          <span className={`text-xs font-semibold mt-0.5 ${scanStats.depth > 0 ? 'text-red-400' : 'text-gray-400'}`}>
            {scanStats.depth > 0 ? `${scanStats.depth} mm` : 'N/A'}
          </span>
        </div>
      </div>
      
      {/* Dynamic Console Prompt Instruction */}
      <p className="text-[10px] text-gray-500 font-mono text-center mt-3 flex items-center justify-center gap-1">
        <Cpu className="w-3 h-3 text-apple-blue" />
        <span>{probePos.isHovered ? 'PROBE IN MANUAL CONTROL MODE' : 'MOVE CURSOR OVER GRAPH TO CALIBRATE ULTRASONIC SIGNAL'}</span>
      </p>
    </div>
  );
};

// ==========================================
// KNOWLEDGE METRICS DISPLAY WIDGET
// ==========================================
const KnowledgeMetrics: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="grid grid-cols-2 gap-3 font-mono">
      <div className="bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors rounded-xl p-4 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-apple-blue shrink-0 mt-0.5" />
        <div>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider block">STANDARDS APPLIED</span>
          <span className="text-lg text-white font-bold block mt-0.5">ISO / ASME</span>
          <span className="text-[10px] text-gray-400 block mt-1">
            {language === 'sl' ? '100% Skladnost' : '100% Compliant'}
          </span>
        </div>
      </div>
      <div className="bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors rounded-xl p-4 flex items-start gap-3">
        <Layers className="w-5 h-5 text-apple-blue shrink-0 mt-0.5" />
        <div>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider block">CERTIFICATIONS</span>
          <span className="text-lg text-white font-bold block mt-0.5">EN ISO 9712</span>
          <span className="text-[10px] text-gray-400 block mt-1">
            {language === 'sl' ? 'Nivo I, II, III osebje' : 'Level 1, 2, 3 Staff'}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN BLOG PAGE COMPONENT
// ==========================================
const Blog: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTag, setActiveTag] = useState<Tag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track modal scrolling for reading progress indicator
  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight === 0) return;
    const progress = (target.scrollTop / totalHeight) * 100;
    setScrollProgress(progress);
  };

  const tagColors: Record<Tag, string> = {
    ndt: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    welding: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    standards: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    safety: 'bg-green-500/10 text-green-400 border-green-500/20',
  };

  const tagLabels: Record<Tag, string> = {
    ndt: t.blogPage.tag_ndt,
    welding: t.blogPage.tag_welding,
    standards: t.blogPage.tag_standards,
    safety: t.blogPage.tag_safety,
  };

  const tags: (Tag | 'all')[] = ['all', 'ndt', 'welding', 'standards', 'safety'];

  // 1. First filter by tag
  const tagFiltered = activeTag === 'all' 
    ? articles 
    : articles.filter(a => a.tag === activeTag);

  // 2. Then filter by search query (bilingual search match)
  const filtered = tagFiltered.filter(a => {
    const titleMatch = a.title[language].toLowerCase().includes(searchQuery.toLowerCase());
    const excerptMatch = a.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase());
    const labelMatch = a.metaLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const contentMatch = a.content[language].toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || excerptMatch || labelMatch || contentMatch;
  });

  const featured = articles.find(a => a.featured);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(language === 'sl' ? 'sl-SI' : 'en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

  const handlePrint = () => {
    window.print();
  };

  const handleShare = (article: Article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title[language],
        text: article.excerpt[language],
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Copy to clipboard fallback
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'sl' ? 'Povezava kopirana v odložišče!' : 'Link copied to clipboard!');
    }
  };

  return (
    <main className="w-full bg-[#030303] text-industrial-text relative overflow-hidden">
      {/* Technical Background Aesthetics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] opacity-70" />
        
        {/* Radial dark glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.02)_0%,transparent_75%)]" />
      </div>

      {/* ======= HERO ======= */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 z-10">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-apple-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-apple-blue/5 rounded-full blur-[90px] pointer-events-none animate-pulse" />
        
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-apple-blue/10 border border-apple-blue/20 text-apple-blue text-[10px] font-bold uppercase tracking-wider mb-6 font-mono">
                  <BookOpen className="w-3.5 h-3.5" />
                  {t.blogPage.hero_badge}
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-white mb-6 tracking-tight leading-none">
                  {language === 'sl' ? 'Baza Znanja' : 'Knowledge Base'}
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mb-8">
                  {t.blogPage.hero_subtitle}
                </p>
                <KnowledgeMetrics />
              </motion.div>
            </div>

            {/* Right Column: Interactive Simulator */}
            <div className="lg:col-span-6 w-full max-w-[540px] mx-auto lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <NdtScanner />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ======= SEARCH & FILTER row ======= */}
      <section className="py-6 border-y border-white/5 bg-[#070708]/80 backdrop-blur-md sticky top-[64px] z-20">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Tag filters with counts */}
          <div className="flex items-center gap-2 flex-wrap order-2 md:order-1">
            {tags.map(tag => {
              // Count items for each tag
              const count = tag === 'all' 
                ? articles.length 
                : articles.filter(a => a.tag === tag).length;

              const isSelected = activeTag === tag;
              
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider transition-all duration-300 border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-apple-blue border-apple-blue text-white shadow-[0_0_15px_rgba(0,113,227,0.3)]'
                      : 'text-gray-400 border-white/5 bg-white/[0.01] hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{tag === 'all' ? t.referencePage.filter_all : tagLabels[tag as Tag]}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Search Bar */}
          <div className="relative w-full md:w-[280px] order-1 md:order-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'sl' ? 'Išči prispevek...' : 'Search article...'}
              className="w-full bg-[#121213] border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-apple-blue focus:shadow-[0_0_12px_rgba(0,113,227,0.2)] transition-all duration-300"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ======= FEATURED ARTICLE ======= */}
      {featured && activeTag === 'all' && !searchQuery && (
        <section className="pt-16 pb-8 relative z-10">
          <div className="max-w-[1240px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setActiveArticle(featured)}
              className="group relative bg-gradient-to-b from-white/[0.03] to-transparent rounded-[32px] overflow-hidden p-8 md:p-12 border border-white/10 hover:border-apple-blue/30 transition-all duration-500 cursor-pointer shadow-[0_30px_70px_rgba(0,0,0,0.4)]"
            >
              {/* Subtle background highlight grid */}
              <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" />
              
              {/* Background glowing orb */}
              <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-apple-blue/5 rounded-full blur-[100px] pointer-events-none" />
              
              {/* Sweep-line hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-apple-blue to-transparent animate-scan" />
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="font-mono text-[10px] text-gray-500 tracking-wider bg-white/5 px-2.5 py-0.5 rounded border border-white/5">{featured.metaLabel}</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-mono border ${tagColors[featured.tag]}`}>
                      <TagIcon className="w-3 h-3" />
                      {tagLabels[featured.tag]}
                    </span>
                    <div className="flex items-center gap-1 text-[9px] font-mono text-apple-blue font-bold tracking-widest bg-apple-blue/15 border border-apple-blue/20 rounded px-2 py-0.5">
                      <TrendingUp className="w-2.5 h-2.5" />
                      <span>{language === 'sl' ? 'IZPOSTAVLJENO' : 'SPOTLIGHT'}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight group-hover:text-apple-blue transition-colors duration-300">
                    {featured.title[language]}
                  </h2>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mb-8">
                    {featured.excerpt[language]}
                  </p>
                  
                  <div className="flex items-center gap-5 text-xs font-mono text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-apple-blue" />
                      {featured.readTime} {t.blogPage.min_read}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <span>{formatDate(featured.date)}</span>
                  </div>
                </div>

                <div className="shrink-0 flex self-start lg:self-center">
                  <div className="flex items-center gap-2 px-6 py-3.5 bg-white text-black rounded-full font-bold text-xs uppercase font-mono tracking-wider group-hover:bg-apple-blue group-hover:text-white transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,113,227,0.4)]">
                    {t.blogPage.read_more}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ======= ARTICLE GRID ======= */}
      <section className="py-12 pb-24 relative z-10">
        <div className="max-w-[1240px] mx-auto px-6">
          
          {/* Section subtitle */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              {language === 'sl' ? 'ARHIV KNJIŽNICE // ARCHIVE' : 'LIBRARY ARCHIVE // ARCHIVE'}
            </span>
            <span className="font-mono text-[10px] text-apple-blue">
              {filtered.length} {language === 'sl' ? 'DOKUMENTOV' : 'DOCUMENTS'}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-3xl p-8 max-w-md mx-auto">
              <AlertCircle className="w-10 h-10 text-gray-600 mx-auto mb-4" />
              <p className="font-mono text-sm text-gray-400">
                {language === 'sl' ? 'Ni najdenih člankov s temi kriteriji.' : 'No articles match your parameters.'}
              </p>
              <button
                onClick={() => { setActiveTag('all'); setSearchQuery(''); }}
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 rounded-full font-mono text-[10px] uppercase text-white transition-colors"
              >
                {language === 'sl' ? 'Ponastavi filtre' : 'Reset filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered
                  .filter(a => activeTag !== 'all' || searchQuery || !a.featured)
                  .map((article, i) => (
                    <motion.article
                      key={article.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      onClick={() => setActiveArticle(article)}
                      className="group bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-apple-blue/20 rounded-3xl p-7 transition-all duration-400 hover:-translate-y-1.5 cursor-pointer flex flex-col h-full shadow-[0_15px_30px_rgba(0,0,0,0.2)] relative overflow-hidden"
                    >
                      {/* Diagonal glowing card background hover element */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,113,227,0.03)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      {/* Vertical line accent */}
                      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-apple-blue scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-400" />
                      
                      {/* Sweep-line hover pulse */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-apple-blue/30 to-transparent animate-scan" />
                      </div>

                      {/* Technical specifications tag (Meta) */}
                      <div className="font-mono text-[9px] text-gray-500 tracking-wider mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                        <span>{article.metaLabel}</span>
                        <span>[ {article.specs[0]?.value.split(' ')[0] || 'NDT'} ]</span>
                      </div>

                      {/* Tag & Time indicator */}
                      <div className="flex items-center justify-between mb-5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-bold font-mono border ${tagColors[article.tag]}`}>
                          <TagIcon className="w-2.5 h-2.5" />
                          {tagLabels[article.tag]}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-mono text-gray-500">
                          <Clock className="w-3.5 h-3.5 text-apple-blue/60" />
                          {article.readTime} {t.blogPage.min_read}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-apple-blue transition-colors duration-300 flex-1">
                        {article.title[language]}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                        {article.excerpt[language]}
                      </p>

                      {/* Footer specs overview */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[10px] text-gray-500">
                        <span>{formatDate(article.date)}</span>
                        <span className="flex items-center gap-1 text-apple-blue font-bold opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          {t.blogPage.read_more} <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </motion.article>
                  ))}
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      {/* ======= CTA SECTION ======= */}
      <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-apple-blue/5 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="max-w-[980px] mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              {t.blogPage.cta_title}
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              {language === 'sl'
                ? 'Naši inženirji z najvišjimi certifikati so vam na voljo za pripravo postopkov, kontrole na terenu in tehnično svetovanje.'
                : 'Our highly certified engineers are ready to support your welding procedures, on-site inspections, and engineering consulting.'}
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-apple-blue text-white rounded-full font-bold text-sm font-mono tracking-wider uppercase hover:scale-105 hover:shadow-[0_0_30px_rgba(0,113,227,0.4)] active:scale-98 transition-all duration-300"
            >
              {t.blogPage.cta_btn}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          FULL-SCREEN TECHNICAL ARTICLE MODAL
          ========================================== */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex justify-end backdrop-blur-md"
          >
            {/* Click backdrop to close */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setActiveArticle(null)} />

            {/* Reading progress bar at extreme top */}
            <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/10 z-[60]">
              <div 
                className="h-full bg-apple-blue shadow-[0_0_10px_#0071e3] transition-all duration-75"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Modal Body Container (Slide-over panel) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onScroll={handleModalScroll}
              className="w-full max-w-[940px] bg-[#09090b] border-l border-white/10 h-full relative z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col"
            >
              {/* Sticky Top Nav within Reader */}
              <div className="sticky top-0 bg-[#09090b]/90 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between z-30">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] text-gray-500 tracking-widest">{activeArticle.metaLabel}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold font-mono border ${tagColors[activeArticle.tag]}`}>
                    <TagIcon className="w-2.5 h-2.5" />
                    {tagLabels[activeArticle.tag]}
                  </span>
                </div>
                
                {/* Utility buttons */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleShare(activeArticle)}
                    className="p-2 border border-white/5 hover:border-white/20 rounded-full text-gray-400 hover:text-white transition-colors"
                    title={language === 'sl' ? 'Deli članek' : 'Share Article'}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="p-2 border border-white/5 hover:border-white/20 rounded-full text-gray-400 hover:text-white transition-colors"
                    title={language === 'sl' ? 'Natisni poročilo' : 'Print Report'}
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <span className="w-[1px] h-6 bg-white/10 mx-1" />
                  <button 
                    onClick={() => setActiveArticle(null)}
                    className="p-2 border border-white/10 hover:border-white/30 rounded-full bg-white/5 text-gray-300 hover:text-white transition-colors flex items-center gap-1 font-mono text-[10px] uppercase font-bold"
                  >
                    <X className="w-4 h-4" />
                    <span>{language === 'sl' ? 'Zapri' : 'Close'}</span>
                  </button>
                </div>
              </div>

              {/* Reader Inner Content Area */}
              <div className="flex-1 py-12 px-6 md:px-16 max-w-[760px] mx-auto w-full">
                
                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-apple-blue" />
                    {activeArticle.readTime} {t.blogPage.min_read}
                  </span>
                  <span>/</span>
                  <span>{formatDate(activeArticle.date)}</span>
                  <span>/</span>
                  <span className="text-gray-400 uppercase tracking-widest">{activeArticle.tag} SEC-NDT</span>
                </div>

                {/* Main Article Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
                  {activeArticle.title[language]}
                </h1>

                {/* Subtitle / Excerpt in large block */}
                <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed border-l-2 border-apple-blue pl-5 mb-10 italic">
                  {activeArticle.excerpt[language]}
                </p>

                {/* TECHNICAL SPECIFICATIONS DASHBOARD WIDGET */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 mb-10 font-mono">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2.5 mb-3">
                    <FileText className="w-3.5 h-3.5 text-apple-blue" />
                    <span className="text-[10px] text-white font-bold tracking-wider uppercase">TECHNICAL SPECIFICATION MATRIX</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeArticle.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between border-b border-white/[0.03] pb-1.5">
                        <span className="text-[10px] text-gray-500">{spec.label[language]}</span>
                        <span className="text-[10px] text-white font-semibold text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structured Body Prose (Rich text parsing) */}
                <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-6">
                  {activeArticle.content[language].split('\n\n').map((paragraph, pIdx) => {
                    // Simple Markdown Parsing for Headings
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={pIdx} className="text-lg md:text-xl font-bold text-white pt-6 pb-2 border-b border-white/5 flex items-center gap-2">
                          <span className="w-1.5 h-3 bg-apple-blue rounded-full" />
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('#### ')) {
                      return (
                        <h4 key={pIdx} className="text-base font-bold text-white pt-4 font-mono uppercase tracking-wider text-apple-blue flex items-center gap-1.5">
                          {paragraph.replace('#### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('---')) {
                      return <hr key={pIdx} className="border-white/5 my-8" />;
                    }
                    
                    // Simple Bullet Points Parsing
                    if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                      return (
                        <ul key={pIdx} className="list-none space-y-2.5 my-4 font-light text-gray-400 pl-4 border-l border-white/10">
                          {paragraph.split('\n').map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span className="text-apple-blue font-bold shrink-0 mt-0.5">•</span>
                              <span>{bullet.replace(/^[*-\s]+/, '')}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    // Numbered List Parsing
                    if (/^\d+\.\s/.test(paragraph)) {
                      return (
                        <ol key={pIdx} className="space-y-3.5 my-5 pl-1">
                          {paragraph.split('\n').map((item, iIdx) => {
                            const match = item.match(/^(\d+)\.\s(.*)/);
                            if (match) {
                              return (
                                <li key={iIdx} className="flex items-start gap-3 bg-white/[0.01] border border-white/5 rounded-xl p-4">
                                  <span className="w-6 h-6 rounded-full bg-apple-blue/10 border border-apple-blue/20 text-apple-blue text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                                    {match[1]}
                                  </span>
                                  <div className="flex-1 text-sm">
                                    {match[2].includes(' — ') ? (
                                      <>
                                        <strong className="text-white block mb-0.5">{match[2].split(' — ')[0]}</strong>
                                        <span className="text-gray-400">{match[2].split(' — ')[1]}</span>
                                      </>
                                    ) : (
                                      <span className="text-gray-300">{match[2]}</span>
                                    )}
                                  </div>
                                </li>
                              );
                            }
                            return <p key={iIdx}>{item}</p>;
                          })}
                        </ol>
                      );
                    }

                    // Standard Paragraph (with bold tag parsing)
                    return (
                      <p 
                        key={pIdx} 
                        className="font-light leading-relaxed text-gray-300"
                        dangerouslySetInnerHTML={{
                          __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                        }}
                      />
                    );
                  })}
                </div>

                {/* Footer seal within reader */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-gray-500">
                  <div className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-apple-blue" />
                    <span>MEGAMA D.O.O. // TECHNICAL ASSURANCE DIVISION</span>
                  </div>
                  <span>SYSTEM CERTIFIED: ISO 9001 // EN ISO 9712</span>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Blog;
