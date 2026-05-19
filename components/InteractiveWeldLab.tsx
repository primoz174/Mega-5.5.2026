import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Radio, ShieldAlert, CheckCircle2, RefreshCw, Eye, 
  Settings, Zap, AlertTriangle, Play, HelpCircle
} from 'lucide-react';

interface Props {
  lang: 'sl' | 'en';
}

interface Defect {
  id: string;
  name: { sl: string; en: string };
  type: string;
  start: number;
  end: number;
  center: number;
  depth: number;
  standardMsg: { sl: string; en: string };
}

const DEFECTS: Defect[] = [
  {
    id: 'crack',
    name: { sl: 'Korenska razpoka', en: 'Root Crack' },
    type: 'crack',
    start: 38,
    end: 46,
    center: 42,
    depth: 18.4,
    standardMsg: { 
      sl: 'KRITIČNA NAPAKA: Odstopanje po ASME Sec. VIII. Zvar ne ustreza.', 
      en: 'CRITICAL DEFECT: ASME Sec. VIII Non-compliance. Reject weld.' 
    }
  },
  {
    id: 'porosity',
    name: { sl: 'Strnjene pore (poroznost)', en: 'Porosity Cluster' },
    type: 'porosity',
    start: 69,
    end: 77,
    center: 73,
    depth: 8.2,
    standardMsg: { 
      sl: 'OPOZORILO: Poroznost presega klaso B (EN ISO 5817). Popravilo svetovano.', 
      en: 'WARNING: Porosity exceeds Class B (EN ISO 5817). Repair advised.' 
    }
  }
];

export default function InteractiveWeldLab({ lang }: Props) {
  const [mode, setMode] = useState<'ut' | 'rt'>('ut');
  
  // UT Mode States
  const [utPosition, setUtPosition] = useState<number>(20);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeDefect, setActiveDefect] = useState<Defect | null>(null);
  
  // RT Mode States
  const [rtProgress, setRtProgress] = useState<number>(0);
  const [isScanningRT, setIsScanningRT] = useState<boolean>(false);
  const [rtCompleted, setRtCompleted] = useState<boolean>(false);
  
  // DRAG AND SWEEP REFS
  const weldTrackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rtIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // ----------------------------------------------------
  // TRANSLATIONS
  // ----------------------------------------------------
  const text = {
    title: { sl: 'NDT Simulator & Weld Inspector', en: 'NDT Simulator & Weld Inspector' },
    subtitle: {
      sl: 'Interaktivni preizkus zvarov z ultrazvočno (UT) in radiografsko (RT) metodo. Pomikajte sondo za odkritje skritih napak v jeklu.',
      en: 'Interactive weld testing using ultrasonic (UT) and radiographic (RT) methods. Move the probe to inspect internal steel defects.'
    },
    modeUt: { sl: 'Ultrazvočni Test (UT)', en: 'Ultrasonic Testing (UT)' },
    modeRt: { sl: 'Radiografski Test (RT)', en: 'Radiographic Testing (RT)' },
    
    // UT Telemetry
    probePos: { sl: 'Položaj sonde', en: 'Probe Position' },
    sigAmp: { sl: 'Amplituda signala', en: 'Signal Amplitude' },
    defectDepth: { sl: 'Globina indikacije', en: 'Indication Depth' },
    assessment: { sl: 'Ocena kakovosti', en: 'Quality Assessment' },
    weldOk: { sl: 'ZVAR BREZ POŠKODB (OK)', en: 'WELD 100% SOUND (OK)' },
    parentSteel: { sl: 'Osnovni material (Jeklo)', en: 'Parent Material (Steel)' },
    weldZone: { sl: 'Področje zvara', en: 'Weld Zone' },
    
    // RT Telemetry
    expVoltage: { sl: 'Napetost vira', en: 'Source Voltage' },
    sfd: { sl: 'Razdalja SFD', en: 'Distance SFD' },
    expProgress: { sl: 'Napredek obsevanja', en: 'Exposure Progress' },
    radSafety: { sl: 'Sevalna varnost', en: 'Radiation Safety' },
    radSafe: { sl: 'VARNO (Zaščiten prostor)', en: 'SAFE (Shielded Room)' },
    startScan: { sl: 'Zaženi Rentgensko Slikanje', en: 'Trigger X-Ray Exposure' },
    resetScan: { sl: 'Ponastavi film', en: 'Reset Film' },
    scanning: { sl: 'Obsevanje v teku...', en: 'Exposing Film...' },
    rtCompletedText: { sl: 'Odkrite 2 indikacije. Analizirajte film spodaj.', en: '2 indications found. Analyze the film below.' },
    rtEmptyText: { sl: 'Film ni eksponiran. Pritisnite gumb zgoraj za rentgen.', en: 'Film unexposed. Trigger exposure to scan.' },
    rtLabelFilm: { sl: 'Eksponiran Radiogram (Film)', en: 'Exposed Radiogram (Film)' },
    
    // Instructions
    dragInstr: {
      sl: '← Povlecite sondo levo in desno čez zvar, da poskenirate zvar →',
      en: '← Drag the probe left and right across the surface to scan the weld →'
    },
    instrUtHeader: { sl: 'A-Scan RF Osciloskop', en: 'A-Scan RF Oscilloscope' },
    instrUtDesc: {
      sl: 'Opazujte zeleni signal. IP predstavlja vstopni val, BE odboj od dna. Pojav vmesnega odboja (DE) pomeni notranjo razpoko ali poroznost.',
      en: 'Observe the green waveform. IP is Initial Pulse, BE is Backwall Echo. Intermediate peaks (DE) signify internal defects.'
    }
  };

  // ----------------------------------------------------
  // UT DETECTOR / DRAG HANDLERS
  // ----------------------------------------------------
  const handleMove = useCallback((clientX: number) => {
    if (!weldTrackRef.current) return;
    const rect = weldTrackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setUtPosition(percentage);
    
    // Check if over a defect
    const found = DEFECTS.find(d => percentage >= d.start && percentage <= d.end);
    setActiveDefect(found || null);
  }, []);

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  // ----------------------------------------------------
  // UT CANVAS OSCILLOSCOPE GENERATOR (60fps)
  // ----------------------------------------------------
  useEffect(() => {
    if (mode !== 'ut' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localTime = 0;
    
    const drawScope = () => {
      localTime += 0.05;
      
      const W = canvas.width;
      const H = canvas.height;
      
      // Clear Screen with deep dark radar green hue
      ctx.fillStyle = '#020905';
      ctx.fillRect(0, 0, W, H);
      
      // Draw Grid Graticule (Glowing Green Lines)
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.07)';
      ctx.lineWidth = 1;
      
      const gridCount = 10;
      for (let i = 1; i < gridCount; i++) {
        const x = (W / gridCount) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
        
        const y = (H / gridCount) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      
      // Baseline center axis line
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.22)';
      ctx.beginPath();
      ctx.moveTo(0, H - 30);
      ctx.lineTo(W, H - 30);
      ctx.stroke();
      
      // Generate A-Scan Peaks dynamically based on position
      const points: { x: number; y: number }[] = [];
      const steps = 300;
      
      // Defect calculation parameters
      let defectHeight = 0;
      let defectPosTime = 0.45; // middle
      let isPorosity = false;
      
      if (activeDefect) {
        const dist = Math.abs(utPosition - activeDefect.center);
        const span = (activeDefect.end - activeDefect.start) / 2;
        const factor = Math.max(0, 1 - dist / span);
        
        if (activeDefect.type === 'crack') {
          defectHeight = factor * 140; // Max amplitude crack peak
          defectPosTime = 0.52; // Crack depth reflection time
        } else {
          defectHeight = factor * 85; // Multiple smaller peaks for porosity
          defectPosTime = 0.38;
          isPorosity = true;
        }
      }

      for (let i = 0; i <= steps; i++) {
        const t = i / steps; // 0 to 1
        const x = t * W;
        let y = H - 30; // base y coordinate
        
        // 1. Initial Pulse Peak (IP) at t = 0.08
        const distIP = Math.abs(t - 0.08);
        const ipPeak = Math.exp(-pow(distIP * 38, 2)) * 130;
        
        // 2. Backwall Echo Peak (BE) at t = 0.88
        const distBE = Math.abs(t - 0.88);
        const bePeak = Math.exp(-pow(distBE * 32, 2)) * 120;
        
        // 3. Defect Echo (DE) at defectPosTime
        let dePeak = 0;
        if (defectHeight > 0) {
          if (isPorosity) {
            // Multiple irregular spikes close to each other
            const distDE1 = Math.abs(t - defectPosTime);
            const distDE2 = Math.abs(t - (defectPosTime + 0.04));
            const distDE3 = Math.abs(t - (defectPosTime - 0.03));
            
            const pk1 = Math.exp(-pow(distDE1 * 50, 2)) * defectHeight * 0.9;
            const pk2 = Math.exp(-pow(distDE2 * 45, 2)) * defectHeight * 0.7 * Math.sin(localTime + 1.2);
            const pk3 = Math.exp(-pow(distDE3 * 55, 2)) * defectHeight * 0.8 * Math.cos(localTime * 1.5);
            
            dePeak = pk1 + pk2 + pk3;
          } else {
            // Single sharp crack peak
            const distDE = Math.abs(t - defectPosTime);
            dePeak = Math.exp(-pow(distDE * 40, 2)) * defectHeight;
          }
        }
        
        // Combine peaks and add active high-frequency noise / telemetry jitter
        const noise = (Math.sin(t * 180 + localTime) * Math.cos(t * 80 - localTime * 1.2)) * 3;
        const totalHeight = ipPeak + bePeak + dePeak + noise;
        
        // Clamp output so it stays on screen
        y -= totalHeight;
        points.push({ x, y: Math.max(10, Math.min(H - 10, y)) });
      }
      
      // Draw Oscilloscope RF Green Neon Waveform Trace
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00ff41';
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      
      // Remove glow shadow for UI details
      ctx.shadowBlur = 0;
      
      // Draw Telemetry Tags directly on the scope grid
      ctx.font = '10px "JetBrains Mono", Courier, monospace';
      ctx.fillStyle = 'rgba(0,255,65,0.7)';
      ctx.fillText('IP (INITIAL)', 16, 25);
      ctx.fillText('BE (BACKWALL)', W - 92, 25);
      
      if (defectHeight > 0) {
        ctx.fillStyle = '#ff3b30';
        ctx.fillText('DE (DEFECT ECHO)', W * defectPosTime - 45, 45);
        ctx.strokeStyle = 'rgba(255, 59, 48, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(W * defectPosTime, 55);
        ctx.lineTo(W * defectPosTime, H - 30);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      animationFrameId.current = requestAnimationFrame(drawScope);
    };
    
    // Helper function for squaring
    function pow(base: number, exp: number) {
      return Math.pow(base, exp);
    }
    
    drawScope();
    
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [mode, activeDefect, utPosition]);

  // ----------------------------------------------------
  // RT MODE EXPOSURE SYSTEM
  // ----------------------------------------------------
  const startRTExposure = () => {
    if (isScanningRT) return;
    setIsScanningRT(true);
    setRtCompleted(false);
    setRtProgress(0);
    
    if (rtIntervalRef.current) clearInterval(rtIntervalRef.current);
    
    rtIntervalRef.current = setInterval(() => {
      setRtProgress(prev => {
        if (prev >= 100) {
          clearInterval(rtIntervalRef.current!);
          setIsScanningRT(false);
          setRtCompleted(true);
          return 100;
        }
        return prev + 1.25; // Smooth progression
      });
    }, 30);
  };

  const resetRTScan = () => {
    setRtProgress(0);
    setIsScanningRT(false);
    setRtCompleted(false);
    if (rtIntervalRef.current) clearInterval(rtIntervalRef.current);
  };

  useEffect(() => {
    return () => {
      if (rtIntervalRef.current) clearInterval(rtIntervalRef.current);
    };
  }, []);

  // ----------------------------------------------------
  // CALCULATIONS FOR DIGITAL READOUTS
  // ----------------------------------------------------
  const utPosMm = Math.round(utPosition * 1.5);
  
  // Calculate amplitude percentage
  let utAmplitude = 12; // base parent noise
  if (activeDefect) {
    const dist = Math.abs(utPosition - activeDefect.center);
    const span = (activeDefect.end - activeDefect.start) / 2;
    const factor = Math.max(0, 1 - dist / span);
    utAmplitude = Math.round(12 + factor * 76);
  }
  
  const utDepthMm = activeDefect ? activeDefect.depth : 0;

  return (
    <section className="relative w-full py-24 bg-black border-y border-white/[0.06] overflow-hidden">
      
      {/* Visual cyber mesh background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0071e3]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0071e3]/30 bg-[#0071e3]/5 text-[#0071e3] text-[9px] font-bold uppercase tracking-[0.25em] mb-4 font-mono">
            <Zap className="w-3 h-3" />
            Interactive Lab
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase leading-[0.98] mb-4">
            {lang === 'sl' ? text.title.sl : text.title.en}
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
            {lang === 'sl' ? text.subtitle.sl : text.subtitle.en}
          </p>
        </div>

        {/* Tab Selector Capsule */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-[#050505] p-1.5 rounded-full border border-white/[0.08] relative z-20">
            <button
              onClick={() => setMode('ut')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold font-mono tracking-widest uppercase transition-all duration-300 ${
                mode === 'ut'
                  ? 'bg-[#0071e3] text-white shadow-[0_0_20px_rgba(0,113,227,0.3)]'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              {lang === 'sl' ? text.modeUt.sl : text.modeUt.en}
            </button>
            <button
              onClick={() => setMode('rt')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold font-mono tracking-widest uppercase transition-all duration-300 ${
                mode === 'rt'
                  ? 'bg-[#0071e3] text-white shadow-[0_0_20px_rgba(0,113,227,0.3)]'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              {lang === 'sl' ? text.modeRt.sl : text.modeRt.en}
            </button>
          </div>
        </div>

        {/* Interactive Lab Canvas Deck */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (8 cols): Visual inspection block */}
          <div className="lg:col-span-8 flex flex-col gap-5 justify-between">
            
            {/* Weld joint schematic cross-section */}
            <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 md:p-10 relative overflow-hidden flex flex-col gap-6 select-none">
              
              {/* Status Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">
                  {lang === 'sl' ? 'Zvar: DVOJNI-V SKLOPI' : 'Weld joint: DOUBLE-V BUTT JOINT'}
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse" />
                  SPECTRO_RENDER: ACTIVE
                </span>
              </div>

              {/* Steel Plate Weld Cross-Section Graphic */}
              <div 
                ref={weldTrackRef}
                className="relative h-32 bg-gradient-to-r from-slate-900/40 via-slate-800/40 to-slate-900/40 rounded-xl border border-white/[0.04] overflow-hidden flex items-center justify-center cursor-pointer group"
                onClick={(e) => {
                  if (mode === 'ut') handleMove(e.clientX);
                }}
              >
                {/* Structural joint lines - left and right plate */}
                <div className="absolute top-0 bottom-0 left-[35%] w-px bg-white/[0.06]" />
                <div className="absolute top-0 bottom-0 right-[35%] w-px bg-white/[0.06]" />
                
                {/* Weld metal structure wedge */}
                <div className="absolute inset-y-0 left-[35%] right-[35%] bg-gradient-to-b from-[#131922] via-[#090b10] to-[#131922] opacity-80 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(255,255,255,0.01)_8px,rgba(255,255,255,0.01)_16px)]" />
                  
                  {/* Weld V shape outlines */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <polygon points="0,0 20,0 0,64 20,128 0,128" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" transform="translate(140)" />
                  </svg>
                  
                  <span className="font-mono text-[9px] text-[#0071e3]/40 tracking-[0.2em] uppercase select-none">
                    {lang === 'sl' ? 'ZVAR' : 'WELD'}
                  </span>
                </div>

                {/* Parent Steel Plate Text Indicator */}
                <div className="absolute left-6 bottom-4 font-mono text-[8px] text-slate-600 uppercase tracking-widest">
                  {lang === 'sl' ? text.parentSteel.sl : text.parentSteel.en} (L)
                </div>
                <div className="absolute right-6 bottom-4 font-mono text-[8px] text-slate-600 uppercase tracking-widest">
                  {lang === 'sl' ? text.parentSteel.sl : text.parentSteel.en} (R)
                </div>

                {/* Simulated Defects (Hidden to eye, visible depending on scan) */}
                
                {/* Defect 1: Root Crack */}
                <div 
                  className={`absolute left-[42%] bottom-1 w-1 h-7 bg-red-600 rounded-full blur-[0.6px] transition-all duration-300 ${
                    (mode === 'ut' && Math.abs(utPosition - 42) < 2) || (mode === 'rt' && rtCompleted)
                      ? 'opacity-85 shadow-[0_0_12px_#ff3b30]' 
                      : 'opacity-0'
                  }`}
                />
                
                {/* Defect 2: Porosity Cluster */}
                <div 
                  className={`absolute left-[73%] top-8 flex flex-wrap gap-0.5 w-4 h-4 transition-all duration-300 ${
                    (mode === 'ut' && Math.abs(utPosition - 73) < 2) || (mode === 'rt' && rtCompleted)
                      ? 'opacity-85' 
                      : 'opacity-0'
                  }`}
                >
                  <span className="w-1 h-1 rounded-full bg-red-600 shadow-[0_0_4px_#ff3b30]" />
                  <span className="w-1 h-1 rounded-full bg-red-500 shadow-[0_0_4px_#ff3b30]" />
                  <span className="w-1 h-1 rounded-full bg-red-600 shadow-[0_0_4px_#ff3b30]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shadow-[0_0_4px_#ff3b30]" />
                </div>

                {/* -------------------- MODE: UT VIRTUAL PROBE -------------------- */}
                {mode === 'ut' && (
                  <motion.div
                    className="absolute top-0 bottom-0 pointer-events-none"
                    style={{ left: `${utPosition}%`, transform: 'translateX(-50%)' }}
                    layout
                  >
                    {/* Soundbeam projection wedge */}
                    <div 
                      className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-28 opacity-25 border-x border-dashed transition-all duration-150"
                      style={{
                        background: activeDefect 
                          ? 'linear-gradient(to bottom, rgba(255,59,48,0.3) 0%, transparent 100%)' 
                          : 'linear-gradient(to bottom, rgba(0,113,227,0.3) 0%, transparent 100%)',
                        borderColor: activeDefect ? 'rgba(255,59,48,0.28)' : 'rgba(0,113,227,0.28)'
                      }}
                    />
                    
                    {/* Draggable Physical UT Probe Model */}
                    <div 
                      className={`absolute top-0 -translate-y-4 -translate-x-1/2 w-8 h-8 rounded-lg border flex flex-col items-center justify-between py-1 shadow-2xl transition-all duration-200 cursor-grab ${
                        isDragging ? 'scale-105 cursor-grabbing' : 'hover:scale-103'
                      }`}
                      style={{
                        background: activeDefect ? 'rgba(255,59,48,0.2)' : 'rgba(0, 113, 227, 0.15)',
                        borderColor: activeDefect ? '#ff3b30' : '#0071e3',
                      }}
                      onMouseDown={handleMouseDown}
                      onTouchStart={handleMouseDown}
                    >
                      <span className="w-4 h-[1px] bg-slate-500 rounded" />
                      <span className={`w-2 h-2 rounded-full ${activeDefect ? 'bg-[#ff3b30] animate-ping' : 'bg-[#0071e3]'}`} />
                    </div>

                    {/* Laser line sweep indicator */}
                    <div className={`absolute top-6 left-0 w-[1px] h-20 ${activeDefect ? 'bg-[#ff3b30]' : 'bg-[#0071e3]'}`} />
                  </motion.div>
                )}

                {/* -------------------- MODE: RT X-RAY PROJECTOR -------------------- */}
                {mode === 'rt' && isScanningRT && (
                  <div 
                    className="absolute top-0 bottom-0 pointer-events-none"
                    style={{ left: `${rtProgress}%`, transform: 'translateX(-50%)' }}
                  >
                    {/* Radiation beam wedge */}
                    <div 
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-32 opacity-25 border-x border-dashed"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(242,201,76,0.35) 0%, transparent 100%)',
                        borderColor: 'rgba(242,201,76,0.4)'
                      }}
                    />
                    
                    {/* X-ray Emitter Head */}
                    <div className="absolute top-0 -translate-y-4 -translate-x-1/2 w-10 h-6 bg-[#1a1505] border border-[#f2c94c] rounded-md flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f2c94c] animate-ping" />
                    </div>
                  </div>
                )}
              </div>

              {/* Helper Drag Instruction Strip */}
              {mode === 'ut' && (
                <div className="text-center font-mono text-[10px] text-slate-500 animate-pulse tracking-wide select-none">
                  {lang === 'sl' ? text.dragInstr.sl : text.dragInstr.en}
                </div>
              )}

              {/* -------------------- RT EXPOSURE CONTROLS -------------------- */}
              {mode === 'rt' && (
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-white/[0.06] pt-5">
                  <div className="flex flex-col gap-1 items-start">
                    <span className="font-mono text-slate-400 text-xs">
                      {isScanningRT 
                        ? (lang === 'sl' ? text.scanning.sl : text.scanning.en)
                        : rtCompleted 
                          ? (lang === 'sl' ? text.rtCompletedText.sl : text.rtCompletedText.en)
                          : (lang === 'sl' ? text.rtEmptyText.sl : text.rtEmptyText.en)
                      }
                    </span>
                    {/* Simple progress bar */}
                    {(isScanningRT || rtCompleted) && (
                      <div className="w-64 h-1 bg-white/[0.06] rounded-full overflow-hidden mt-1">
                        <div 
                          className="h-full bg-[#f2c94c] transition-all duration-75"
                          style={{ width: `${rtProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={startRTExposure}
                      disabled={isScanningRT}
                      className="px-5 py-2.5 rounded-full bg-[#f2c94c] text-black text-xs font-bold font-mono uppercase hover:scale-[1.03] transition-transform flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      {lang === 'sl' ? text.startScan.sl : text.startScan.en}
                    </button>
                    {(rtCompleted || rtProgress > 0) && (
                      <button
                        onClick={resetRTScan}
                        className="px-4 py-2.5 rounded-full border border-white/10 hover:bg-white/[0.03] text-slate-400 text-xs font-bold font-mono uppercase transition-colors flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        {lang === 'sl' ? text.resetScan.sl : text.resetScan.en}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* A-Scan Oscilloscope (UT) / Radiogram Negative Film (RT) */}
            <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 relative overflow-hidden flex flex-col gap-4">
              
              <AnimatePresence mode="wait">
                {mode === 'ut' ? (
                  // UT OSCILLOSCOPE DECK
                  <motion.div
                    key="ut-scope"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                      <h4 className="font-heading font-bold text-white text-sm flex items-center gap-2 tracking-wide uppercase">
                        <Activity className="w-4 h-4 text-[#00ff41]" />
                        {lang === 'sl' ? text.instrUtHeader.sl : text.instrUtHeader.en}
                      </h4>
                      <span className="font-mono text-[9px] text-[#00ff41] bg-[#00ff41]/5 px-2 py-0.5 rounded border border-[#00ff41]/20">
                        FREQ: 4.0 MHz
                      </span>
                    </div>

                    {/* HTML5 Canvas Radar Screen */}
                    <div className="w-full aspect-[21/9] bg-[#010603] rounded-xl overflow-hidden border border-[#00ff41]/20 relative">
                      <canvas 
                        ref={canvasRef} 
                        className="w-full h-full block"
                        width={680}
                        height={260}
                      />
                    </div>
                    
                    <p className="text-[11px] text-slate-500 leading-relaxed font-light font-sans max-w-2xl">
                      {lang === 'sl' ? text.instrUtDesc.sl : text.instrUtDesc.en}
                    </p>
                  </motion.div>
                ) : (
                  // RT EXPOSED FILM DECK
                  <motion.div
                    key="rt-film"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                      <h4 className="font-heading font-bold text-white text-sm flex items-center gap-2 tracking-wide uppercase">
                        <Eye className="w-4 h-4 text-[#f2c94c]" />
                        {lang === 'sl' ? text.rtLabelFilm.sl : text.rtLabelFilm.en}
                      </h4>
                      <span className="font-mono text-[9px] text-[#f2c94c] bg-[#f2c94c]/5 px-2 py-0.5 rounded border border-[#f2c94c]/20">
                        FILM TYPE: EN ISO 11699 CLASS C5
                      </span>
                    </div>

                    {/* Exposing radiogram negative band */}
                    <div className="w-full h-32 bg-[#020202] rounded-xl overflow-hidden border border-white/[0.08] relative flex items-center p-3 select-none">
                      
                      {/* Grid / markers background */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:25px_25px] opacity-40" />

                      {/* Dynamic Exposed Overlay mask */}
                      <div 
                        className="absolute inset-y-0 left-0 bg-[#0f0e0b] border-r border-[#f2c94c]/40 transition-all duration-75 flex items-center"
                        style={{ width: `${rtProgress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f2c94c]/5 pointer-events-none" />
                        
                        {/* Progressive Exposed Film Details (Visible behind exposure front) */}
                        <div className="absolute left-[35%] right-[35%] inset-y-0 bg-[#1f1e1a] opacity-85 border-y border-[#f2c94c]/10 flex flex-col justify-between py-2 px-6">
                          <span className="font-mono text-[8px] text-[#f2c94c]/30 text-center tracking-widest">WELD NEGATIVE</span>
                          
                          {/* Exposure Defects */}
                          
                          {/* Crack indication */}
                          <div className="absolute left-[20%] top-[42%] w-12 h-[2px] bg-black/90 rotate-[12deg] blur-[0.4px] rounded-full flex items-center justify-center">
                            <span className="absolute top-0 -left-1 w-4 h-[1px] bg-black rotate-[25deg]" />
                          </div>
                          
                          {/* Porosity cluster */}
                          <div className="absolute left-[92%] top-[48%] flex flex-wrap gap-1 w-5 h-5 bg-transparent opacity-80 blur-[0.5px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            <span className="w-1 h-1 rounded-full bg-black" />
                            <span className="w-1 h-1.5 rounded-full bg-black" />
                            <span className="w-1.5 h-1 rounded-full bg-black" />
                          </div>
                          
                          <span className="font-mono text-[7px] text-[#f2c94c]/20 text-center">IQI WIRE 10 FE</span>
                        </div>

                        {/* IQI Lead Marker Indicator */}
                        <div className="absolute left-6 top-3 font-mono text-[9px] text-[#f2c94c]/30 font-bold">MEG_4.2</div>
                        <div className="absolute right-6 top-3 font-mono text-[9px] text-[#f2c94c]/30 font-bold">L_42_C</div>
                      </div>

                      {/* Film placeholder text when unexposed */}
                      {!isScanningRT && !rtCompleted && (
                        <div className="w-full text-center font-mono text-[10px] text-slate-600 uppercase tracking-widest z-10 animate-pulse">
                          {lang === 'sl' ? text.rtEmptyText.sl : text.rtEmptyText.en}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-[11px] text-slate-500 leading-relaxed font-light font-sans max-w-2xl">
                      {lang === 'sl' 
                        ? 'Rentgenski film absorbira sevanje različno glede na gostoto materiala. Razpoke in plinski mehurčki povzročijo večjo izpostavljenost filma (temnejše sence).'
                        : 'X-Ray film absorbs radiation based on material density. Internal cracks and gas voids lead to higher local exposure, appearing as darker shadows.'
                      }
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column (4 cols): High-tech digital telemetry readout */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Telemetry frame */}
            <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-5 flex-1 select-none">
              
              {/* Telemetry Header */}
              <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06]">
                <Settings className="w-4 h-4 text-[#0071e3] animate-spin-slow" />
                <span className="font-mono text-[11px] text-white font-bold tracking-widest uppercase">
                  Telemetry Panel
                </span>
              </div>

              {/* -------------------- TELEMETRY: UT MODE -------------------- */}
              {mode === 'ut' && (
                <div className="flex flex-col gap-5 flex-1">
                  
                  {/* Metric 1: Position */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      {lang === 'sl' ? text.probePos.sl : text.probePos.en}
                    </span>
                    <div className="flex items-baseline justify-between font-mono">
                      <span className="text-2xl text-white font-bold">
                        {utPosMm}.0
                      </span>
                      <span className="text-[11px] text-slate-500">mm (X-AXIS)</span>
                    </div>
                    <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0071e3]" style={{ width: `${utPosition}%` }} />
                    </div>
                  </div>

                  {/* Metric 2: Amplitude */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      {lang === 'sl' ? text.sigAmp.sl : text.sigAmp.en}
                    </span>
                    <div className="flex items-baseline justify-between font-mono">
                      <span className={`text-2xl font-bold transition-colors ${activeDefect ? 'text-[#ff3b30]' : 'text-[#00ff41]'}`}>
                        {utAmplitude}%
                      </span>
                      <span className="text-[11px] text-slate-500">FSH (ECHO HEIGHT)</span>
                    </div>
                    <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-colors ${activeDefect ? 'bg-[#ff3b30]' : 'bg-[#00ff41]'}`} 
                        style={{ width: `${utAmplitude}%` }} 
                      />
                    </div>
                  </div>

                  {/* Metric 3: Indication Depth */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      {lang === 'sl' ? text.defectDepth.sl : text.defectDepth.en}
                    </span>
                    <div className="flex items-baseline justify-between font-mono">
                      <span className={`text-2xl font-bold ${activeDefect ? 'text-white' : 'text-slate-600'}`}>
                        {activeDefect ? `${utDepthMm}` : '0.0'}
                      </span>
                      <span className="text-[11px] text-slate-500">mm (Y-AXIS)</span>
                    </div>
                  </div>

                  {/* Assessment Card */}
                  <div className="mt-auto border-t border-white/[0.06] pt-5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-3">
                      {lang === 'sl' ? text.assessment.sl : text.assessment.en}
                    </span>
                    
                    <AnimatePresence mode="wait">
                      {!activeDefect ? (
                        // SAFE / SOUND WELD
                        <motion.div 
                          key="sound-weld"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-4 rounded-xl border border-[#00ff41]/20 bg-[#00ff41]/5 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#00ff41] shrink-0 mt-0.5" />
                          <div className="flex flex-col gap-0.5">
                            <span className="font-mono text-[10px] font-bold text-[#00ff41] uppercase tracking-wide">
                              {lang === 'sl' ? text.weldOk.sl : text.weldOk.en}
                            </span>
                            <span className="text-[9px] text-slate-400 leading-normal">
                              {lang === 'sl' 
                                ? 'Ni odkritih napak ali diskontinuitet. Integriteta materiala ustreza standardom.' 
                                : 'No defects detected inside weld structure. Volumetric integrity verified.'
                              }
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        // DEFECT DETECTED WARNING
                        <motion.div 
                          key={activeDefect.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`p-4 rounded-xl border flex items-start gap-3 ${
                            activeDefect.type === 'crack' 
                              ? 'border-red-600/30 bg-red-600/5' 
                              : 'border-yellow-500/20 bg-yellow-500/5'
                          }`}
                        >
                          <ShieldAlert className={`w-5 h-5 shrink-0 mt-0.5 ${
                            activeDefect.type === 'crack' ? 'text-red-500' : 'text-yellow-500'
                          }`} />
                          <div className="flex flex-col gap-0.5">
                            <span className={`font-mono text-[10px] font-bold uppercase tracking-wide ${
                              activeDefect.type === 'crack' ? 'text-red-500' : 'text-yellow-500'
                            }`}>
                              {lang === 'sl' ? activeDefect.name.sl : activeDefect.name.en}
                            </span>
                            <span className="text-[9px] text-slate-400 leading-normal">
                              {lang === 'sl' ? activeDefect.standardMsg.sl : activeDefect.standardMsg.en}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* -------------------- TELEMETRY: RT MODE -------------------- */}
              {mode === 'rt' && (
                <div className="flex flex-col gap-5 flex-1">
                  
                  {/* Metric 1: X-ray voltage */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      {lang === 'sl' ? text.expVoltage.sl : text.expVoltage.en}
                    </span>
                    <div className="flex items-baseline justify-between font-mono">
                      <span className="text-xl text-white font-bold">180.0</span>
                      <span className="text-[11px] text-slate-500">kV (TUBE ENERGY)</span>
                    </div>
                  </div>

                  {/* Metric 2: Distance SFD */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      {lang === 'sl' ? text.sfd.sl : text.sfd.en}
                    </span>
                    <div className="flex items-baseline justify-between font-mono">
                      <span className="text-xl text-white font-bold">600.0</span>
                      <span className="text-[11px] text-slate-500">mm</span>
                    </div>
                  </div>

                  {/* Metric 3: Exposure progress */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      {lang === 'sl' ? text.expProgress.sl : text.expProgress.en}
                    </span>
                    <div className="flex items-baseline justify-between font-mono">
                      <span className="text-xl text-white font-bold">
                        {Math.round(rtProgress)}%
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {isScanningRT ? 'RUNNING' : rtCompleted ? 'COMPLETED' : 'IDLE'}
                      </span>
                    </div>
                  </div>

                  {/* Radiation Safety */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      {lang === 'sl' ? text.radSafety.sl : text.radSafety.en}
                    </span>
                    <div className="flex items-center gap-2 font-mono mt-0.5">
                      <span className={`w-2 h-2 rounded-full ${isScanningRT ? 'bg-red-500 animate-ping' : 'bg-[#00ff41]'}`} />
                      <span className={`text-[11px] font-bold ${isScanningRT ? 'text-red-500' : 'text-[#00ff41]'}`}>
                        {isScanningRT 
                          ? (lang === 'sl' ? 'VARNOSTNA GUMIJASTA ZAVESA - OBSEVANJE' : 'EXPOSING: DO NOT ENTER') 
                          : (lang === 'sl' ? text.radSafe.sl : text.radSafe.en)
                        }
                      </span>
                    </div>
                  </div>

                  {/* Assessment Card */}
                  <div className="mt-auto border-t border-white/[0.06] pt-5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-3">
                      {lang === 'sl' ? text.assessment.sl : text.assessment.en}
                    </span>

                    <AnimatePresence mode="wait">
                      {!rtCompleted ? (
                        <motion.div 
                          key="rt-no-result"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-start gap-2.5"
                        >
                          <HelpCircle className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                          <span className="text-[9px] text-slate-500 leading-relaxed">
                            {lang === 'sl' 
                              ? 'Eksponirajte rentgenski film s sprožitvijo stikala na levi, da izvedete analizo zvarov.' 
                              : 'Trigger X-Ray film exposure to generate radiogram and view quality assessment.'
                            }
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="rt-completed-warnings"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-4 rounded-xl border border-red-600/20 bg-red-600/5 flex flex-col gap-2.5"
                        >
                          <div className="flex items-start gap-2.5">
                            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5 animate-pulse" />
                            <div className="flex flex-col gap-0.5">
                              <span className="font-mono text-[10px] font-bold text-red-500 uppercase tracking-wide">
                                {lang === 'sl' ? '2 INDIKACIJI ODKRITI' : '2 INDICATIONS IDENTIFIED'}
                              </span>
                              <span className="text-[9px] text-slate-400 leading-normal">
                                {lang === 'sl' 
                                  ? 'Analiza radiograma razkriva eno vzdolžno korensko razpoko (kritično) in manjše plinsko gnezdo (poroznost).' 
                                  : 'Radiogram reveals one longitudinal root crack (critical defect) and a minor gas porosity cluster.'
                                }
                              </span>
                            </div>
                          </div>
                          
                          {/* Indicator specs list */}
                          <div className="border-t border-white/[0.06] pt-2 flex flex-col gap-1 font-mono text-[8px] text-slate-500">
                            <div className="flex justify-between">
                              <span>IND_01 (CRACK):</span>
                              <span className="text-red-500">REJECT (ASME Sec. VIII)</span>
                            </div>
                            <div className="flex justify-between">
                              <span>IND_02 (POROSITY):</span>
                              <span className="text-yellow-500">WARNING (EN ISO 5817 Cl. B)</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
