import React from 'react';

interface Props {
  methodId: string;
  className?: string;
}

export default function MethodDiagram({ methodId, className = '' }: Props) {
  const Diagram = DIAGRAMS[methodId] ?? GenericDiagram;
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 280 280"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[280px] max-h-[280px]"
        aria-hidden="true"
      >
        <Diagram />
      </svg>
    </div>
  );
}

const S = 'rgba(255,255,255,0.12)';   // structure stroke
const A = '#0071e3';                   // accent / signal

/* ── VT: Visual Testing ────────────────────────────────────── */
function VT() {
  return (
    <>
      <style>{`
        @keyframes vt-blink { 0%,100%{opacity:.2} 50%{opacity:1} }
        @keyframes vt-scan { 0%{transform:rotate(-18deg)} 100%{transform:rotate(18deg)} }
        .vt-blink { animation: vt-blink 2s ease-in-out infinite }
        .vt-scan { transform-origin: 140px 108px; animation: vt-scan 3s ease-in-out infinite alternate }
      `}</style>

      {/* workpiece cross-section */}
      <rect x="60" y="160" width="160" height="50" rx="4" fill="none" stroke={S} strokeWidth="1.5" />
      {/* weld crown */}
      <path d="M118 160 Q140 148 162 160" fill="none" stroke={S} strokeWidth="1.5" />
      {/* surface crack */}
      <path d="M135 160 L132 172 L138 178" fill="none" stroke={A} strokeWidth="1.5" strokeLinecap="round" />

      {/* endoscope body */}
      <rect x="118" y="60" width="44" height="62" rx="8" fill="none" stroke={S} strokeWidth="1.5" />
      {/* lens circle */}
      <circle cx="140" cy="108" r="10" fill="none" stroke={S} strokeWidth="1.2" />
      <circle cx="140" cy="108" r="4" fill={A} opacity="0.6" />

      {/* light cone — animated sweep */}
      <g className="vt-scan">
        <path d="M133 118 L120 152 L160 152 L147 118 Z" fill={A} opacity="0.07" />
        <path d="M133 118 L120 152" stroke={A} strokeWidth="0.8" opacity="0.3" />
        <path d="M147 118 L160 152" stroke={A} strokeWidth="0.8" opacity="0.3" />
      </g>

      {/* defect marker */}
      <circle cx="135" cy="167" r="7" fill="none" stroke={A} strokeWidth="1.2" className="vt-blink" />
      <path d="M140 162 L145 157" stroke={A} strokeWidth="1" />

      {/* label */}
      <text x="140" y="230" textAnchor="middle" fontSize="9" fill={A} opacity="0.6" fontFamily="monospace" letterSpacing="2">VISUAL TESTING</text>
    </>
  );
}

/* ── PT: Penetrant Testing ─────────────────────────────────── */
function PT() {
  return (
    <>
      <style>{`
        @keyframes pt-drop { 0%{transform:translateY(0);opacity:1} 80%{transform:translateY(28px);opacity:.8} 100%{transform:translateY(28px);opacity:0} }
        @keyframes pt-fill { 0%,40%{opacity:0} 60%,100%{opacity:1} }
        .pt-d1 { animation: pt-drop 2.4s ease-in infinite }
        .pt-d2 { animation: pt-drop 2.4s ease-in .8s infinite }
        .pt-fill { animation: pt-fill 2.4s ease infinite }
      `}</style>

      {/* material block */}
      <rect x="55" y="140" width="170" height="60" rx="4" fill="none" stroke={S} strokeWidth="1.5" />
      {/* V-crack */}
      <path d="M130 140 L140 174 L150 140" fill="none" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
      {/* crack fill — penetrant inside */}
      <path d="M133 140 L140 168 L147 140" fill={A} opacity="0.25" className="pt-fill" />

      {/* developer layer */}
      <rect x="55" y="132" width="170" height="8" rx="2" fill={A} opacity="0.07" />

      {/* indicator bleed */}
      <ellipse cx="140" cy="136" rx="14" ry="4" fill={A} opacity="0.35" className="pt-fill" />

      {/* drops */}
      <g className="pt-d1">
        <circle cx="125" cy="95" r="4" fill={A} opacity="0.7" />
        <path d="M125 99 L125 111" stroke={A} strokeWidth="1.2" opacity="0.5" />
      </g>
      <g className="pt-d2">
        <circle cx="155" cy="88" r="4" fill={A} opacity="0.7" />
        <path d="M155 92 L155 104" stroke={A} strokeWidth="1.2" opacity="0.5" />
      </g>

      <text x="140" y="230" textAnchor="middle" fontSize="9" fill={A} opacity="0.6" fontFamily="monospace" letterSpacing="2">PENETRANT TESTING</text>
    </>
  );
}

/* ── MT: Magnetic Testing ──────────────────────────────────── */
function MT() {
  return (
    <>
      <style>{`
        @keyframes mt-particle { 0%{opacity:0;transform:translateY(-6px)} 50%{opacity:1} 100%{opacity:0;transform:translateY(6px)} }
        .mt-p1 { animation: mt-particle 1.8s ease-in-out infinite }
        .mt-p2 { animation: mt-particle 1.8s ease-in-out .6s infinite }
        .mt-p3 { animation: mt-particle 1.8s ease-in-out 1.2s infinite }
      `}</style>

      {/* ferromagnetic piece */}
      <rect x="60" y="150" width="160" height="48" rx="4" fill="none" stroke={S} strokeWidth="1.5" />
      {/* crack */}
      <path d="M132 150 L136 162 L140 155 L143 168 L148 150" fill="none" stroke={S} strokeWidth="1.2" />

      {/* magnet poles */}
      <rect x="70" y="95" width="28" height="55" rx="4" fill="none" stroke={A} strokeWidth="1.2" opacity="0.5" />
      <rect x="182" y="95" width="28" height="55" rx="4" fill="none" stroke={A} strokeWidth="1.2" opacity="0.5" />
      <text x="84" y="118" textAnchor="middle" fontSize="10" fill={A} opacity="0.7" fontWeight="bold">N</text>
      <text x="196" y="118" textAnchor="middle" fontSize="10" fill={A} opacity="0.7" fontWeight="bold">S</text>

      {/* field lines — distorted around crack */}
      {[0, 1, 2, 3].map(i => (
        <path
          key={i}
          d={`M98 ${128 + i * 6} Q118 ${124 + i * 6} 132 ${148 + i * 4} Q142 ${148 + i * 4} 162 ${128 + i * 6} Q175 ${124 + i * 6} 182 ${128 + i * 6}`}
          fill="none" stroke={A} strokeWidth="0.8" opacity="0.3"
        />
      ))}

      {/* particles at crack */}
      <g className="mt-p1"><circle cx="136" cy="149" r="2" fill={A} /></g>
      <g className="mt-p2"><circle cx="140" cy="147" r="2" fill={A} /></g>
      <g className="mt-p3"><circle cx="144" cy="149" r="2" fill={A} /></g>

      <text x="140" y="230" textAnchor="middle" fontSize="9" fill={A} opacity="0.6" fontFamily="monospace" letterSpacing="2">MAGNETIC TESTING</text>
    </>
  );
}

/* ── UT: Ultrasonic Testing ────────────────────────────────── */
function UT() {
  return (
    <>
      <style>{`
        @keyframes ut-pulse { 0%,100%{opacity:0;transform:scaleX(.6) scaleY(.6)} 40%{opacity:.7} 70%{opacity:.2} }
        .ut-w1 { animation: ut-pulse 2s ease-out infinite }
        .ut-w2 { animation: ut-pulse 2s ease-out .55s infinite }
        .ut-w3 { animation: ut-pulse 2s ease-out 1.1s infinite }
      `}</style>

      {/* transducer */}
      <rect x="110" y="58" width="60" height="30" rx="5" fill="none" stroke={S} strokeWidth="1.5" />
      <rect x="118" y="66" width="44" height="14" rx="3" fill={A} opacity="0.15" />
      <text x="140" y="77" textAnchor="middle" fontSize="7" fill={A} opacity="0.7" fontFamily="monospace">PROBE</text>

      {/* weld / material block */}
      <rect x="60" y="155" width="160" height="55" rx="4" fill="none" stroke={S} strokeWidth="1.5" />
      {/* weld cap */}
      <path d="M116 155 Q140 143 164 155" fill="none" stroke={S} strokeWidth="1.2" />

      {/* internal defect */}
      <ellipse cx="152" cy="185" rx="14" ry="6" fill="none" stroke={A} strokeWidth="1.2" opacity="0.6" />

      {/* propagating wave arcs */}
      {[1, 2, 3].map(i => (
        <path
          key={i}
          className={`ut-w${i}`}
          style={{ transformOrigin: '140px 88px' }}
          d={`M${140 - i * 16} ${88 + i * 18} Q140 ${82 + i * 18} ${140 + i * 16} ${88 + i * 18}`}
          fill="none" stroke={A} strokeWidth="1"
        />
      ))}

      {/* echo lines from defect */}
      <path d="M152 179 Q146 138 140 95" stroke={A} strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />

      {/* mini A-scan */}
      <rect x="62" y="62" width="40" height="26" rx="3" fill="none" stroke={S} strokeWidth="1" />
      <path d="M66 80 L71 80 L73 70 L75 80 L80 80 L82 72 L84 80 L98 80" fill="none" stroke={A} strokeWidth="1" opacity="0.7" />

      <text x="140" y="236" textAnchor="middle" fontSize="9" fill={A} opacity="0.6" fontFamily="monospace" letterSpacing="2">ULTRASONIC TESTING</text>
    </>
  );
}

/* ── UTT: Thickness Measurement ────────────────────────────── */
function UTT() {
  return (
    <>
      <style>{`
        @keyframes utt-scan { 0%,100%{opacity:.3} 50%{opacity:1} }
        .utt-scan { animation: utt-scan 2s ease-in-out infinite }
      `}</style>

      {/* pipe wall cross-section */}
      <path d="M60 120 Q60 90 90 90 L190 90 Q220 90 220 120 L220 200 Q220 230 190 230 L90 230 Q60 230 60 200 Z" fill="none" stroke={S} strokeWidth="1.2" opacity="0.3" />
      {/* inner wall — thinner on right (corrosion) */}
      <path d="M75 125 Q75 103 95 103 L175 103 Q195 115 210 130 L210 195 Q210 217 190 217 L95 217 Q75 217 75 195 Z" fill="none" stroke={S} strokeWidth="1.5" />

      {/* corrosion thinning patch */}
      <path d="M165 103 Q185 110 205 125" fill="none" stroke={A} strokeWidth="2" opacity="0.6" strokeDasharray="4 3" />

      {/* transducer probe */}
      <rect x="118" y="55" width="44" height="22" rx="4" fill="none" stroke={S} strokeWidth="1.5" />
      <path d="M128 77 L128 90 M152 77 L152 90" stroke={A} strokeWidth="1" opacity="0.5" />

      {/* echo travel arrows */}
      <path d="M132 90 L132 103" stroke={A} strokeWidth="1" markerEnd={`url(#arr)`} opacity="0.7" className="utt-scan" />
      <path d="M148 103 L148 90" stroke={A} strokeWidth="1" opacity="0.5" className="utt-scan" />

      {/* thickness callout */}
      <path d="M88 103 L88 90 M88 96 L100 96" stroke={A} strokeWidth="0.8" opacity="0.5" />
      <text x="102" y="99" fontSize="8" fill={A} opacity="0.7" fontFamily="monospace">12.4 mm</text>
      <path d="M88 217 L88 230 M88 224 L100 224" stroke={A} strokeWidth="0.8" opacity="0.5" />
      <text x="102" y="227" fontSize="8" fill={A} opacity="0.7" fontFamily="monospace">9.1 mm</text>

      <text x="140" y="252" textAnchor="middle" fontSize="9" fill={A} opacity="0.6" fontFamily="monospace" letterSpacing="2">THICKNESS MEAS.</text>
    </>
  );
}

/* ── LT: Leak Testing ──────────────────────────────────────── */
function LT() {
  return (
    <>
      <style>{`
        @keyframes lt-bubble { 0%{transform:translateY(0);opacity:.8} 100%{transform:translateY(-40px);opacity:0} }
        .lt-b1 { animation: lt-bubble 2s ease-out infinite }
        .lt-b2 { animation: lt-bubble 2s ease-out .7s infinite }
        .lt-b3 { animation: lt-bubble 2s ease-out 1.4s infinite }
      `}</style>

      {/* vessel body */}
      <rect x="72" y="100" width="136" height="120" rx="8" fill="none" stroke={S} strokeWidth="1.5" />
      {/* end caps */}
      <ellipse cx="140" cy="100" rx="68" ry="10" fill="none" stroke={S} strokeWidth="1.2" />
      <ellipse cx="140" cy="220" rx="68" ry="10" fill="none" stroke={S} strokeWidth="1.2" />

      {/* pressure gauge */}
      <circle cx="90" cy="80" r="16" fill="none" stroke={S} strokeWidth="1.2" />
      <path d="M90 80 L97 73" stroke={A} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M78 80 Q90 60 102 80" fill="none" stroke={S} strokeWidth="0.8" />
      <text x="90" y="82" textAnchor="middle" fontSize="6" fill={A} opacity="0.6" fontFamily="monospace">bar</text>

      {/* micro crack */}
      <path d="M138 175 L142 188 L137 196" fill="none" stroke={A} strokeWidth="1.5" strokeLinecap="round" />

      {/* bubbles */}
      <g className="lt-b1"><circle cx="140" cy="170" r="3" fill="none" stroke={A} strokeWidth="1" opacity="0.7" /></g>
      <g className="lt-b2"><circle cx="136" cy="165" r="2.5" fill="none" stroke={A} strokeWidth="1" opacity="0.7" /></g>
      <g className="lt-b3"><circle cx="143" cy="168" r="2" fill="none" stroke={A} strokeWidth="1" opacity="0.7" /></g>

      <text x="140" y="252" textAnchor="middle" fontSize="9" fill={A} opacity="0.6" fontFamily="monospace" letterSpacing="2">LEAK TESTING</text>
    </>
  );
}

/* ── RT: Radiographic Testing ──────────────────────────────── */
function RT() {
  return (
    <>
      <style>{`
        @keyframes rt-ray { 0%{opacity:.15} 60%{opacity:.5} 100%{opacity:.15} }
        .rt-ray { animation: rt-ray 2.5s ease-in-out infinite }
      `}</style>

      {/* radiation source */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <line
          key={i}
          x1="140" y1="62"
          x2={140 + Math.cos((deg * Math.PI) / 180) * 14}
          y2={62 + Math.sin((deg * Math.PI) / 180) * 14}
          stroke={A} strokeWidth="1.2" opacity="0.5"
        />
      ))}
      <circle cx="140" cy="62" r="7" fill={A} opacity="0.2" />
      <circle cx="140" cy="62" r="3.5" fill={A} opacity="0.5" />

      {/* diverging beams */}
      <path d="M133 69 L100 148 M147 69 L180 148" stroke={A} strokeWidth="0.8" strokeDasharray="5 4" opacity="0.3" className="rt-ray" />
      <path d="M136 69 L115 148 M144 69 L165 148" stroke={A} strokeWidth="0.8" strokeDasharray="5 4" opacity="0.25" className="rt-ray" />
      <path d="M140 69 L140 148" stroke={A} strokeWidth="0.8" strokeDasharray="5 4" opacity="0.25" className="rt-ray" />

      {/* material with inclusions */}
      <rect x="88" y="148" width="104" height="44" rx="4" fill="none" stroke={S} strokeWidth="1.5" />
      <ellipse cx="120" cy="170" rx="5" ry="3" fill={S} opacity="0.5" />
      <ellipse cx="155" cy="165" rx="3" ry="5" fill={S} opacity="0.5" />
      <ellipse cx="140" cy="175" rx="7" ry="2" fill={S} opacity="0.4" />

      {/* film strip */}
      <rect x="86" y="205" width="108" height="22" rx="3" fill="none" stroke={S} strokeWidth="1.2" />
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={90 + i * 21} y="208" width="16" height="16" rx="1" fill={A} opacity="0.08" stroke={S} strokeWidth="0.6" />
      ))}

      <text x="140" y="246" textAnchor="middle" fontSize="9" fill={A} opacity="0.6" fontFamily="monospace" letterSpacing="2">RADIOGRAPHY</text>
    </>
  );
}

/* ── RT-EVAL: Film Evaluation ──────────────────────────────── */
function RTEval() {
  return (
    <>
      <style>{`
        @keyframes rte-glass { 0%,100%{transform:translateX(-18px)} 50%{transform:translateX(18px)} }
        @keyframes rte-pass { 0%,70%{opacity:0} 80%,100%{opacity:1} }
        .rte-glass { animation: rte-glass 3.5s ease-in-out infinite }
        .rte-pass { animation: rte-pass 3.5s ease-in-out infinite }
      `}</style>

      {/* film strip */}
      <rect x="60" y="110" width="160" height="70" rx="4" fill="none" stroke={S} strokeWidth="1.5" />
      {/* sprocket holes */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <rect key={i} x={64 + i * 20} y="113" width="8" height="6" rx="1" fill={S} opacity="0.5" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <rect key={i} x={64 + i * 20} y="171" width="8" height="6" rx="1" fill={S} opacity="0.5" />
      ))}
      {/* frames */}
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={68 + i * 38} y="122" width="30" height="46" rx="2" fill={A} opacity="0.06" stroke={S} strokeWidth="0.8" />
      ))}
      {/* defect indication in frame 2 */}
      <ellipse cx="164" cy="146" rx="7" ry="3" fill={A} opacity="0.25" />

      {/* magnifying glass animated over frames */}
      <g className="rte-glass" style={{ transformOrigin: '140px 145px' }}>
        <circle cx="140" cy="145" r="20" fill="none" stroke={A} strokeWidth="1.5" opacity="0.7" />
        <line x1="154" y1="159" x2="164" y2="169" stroke={A} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <circle cx="140" cy="145" r="20" fill={A} opacity="0.04" />
      </g>

      {/* pass/fail badge */}
      <g className="rte-pass">
        <rect x="104" y="196" width="72" height="22" rx="11" fill={A} opacity="0.15" stroke={A} strokeWidth="1" strokeOpacity="0.4" />
        <text x="140" y="211" textAnchor="middle" fontSize="9" fill={A} fontFamily="monospace" fontWeight="bold">ACCEPTED</text>
      </g>

      <text x="140" y="240" textAnchor="middle" fontSize="9" fill={A} opacity="0.6" fontFamily="monospace" letterSpacing="2">FILM EVALUATION</text>
    </>
  );
}

/* ── UCI: Vickers Hardness ─────────────────────────────────── */
function UCI() {
  return (
    <>
      <style>{`
        @keyframes uci-press { 0%,100%{transform:translateY(0)} 40%,60%{transform:translateY(12px)} }
        @keyframes uci-display { 0%,30%{opacity:0} 50%,100%{opacity:1} }
        .uci-press { animation: uci-press 3s ease-in-out infinite; transform-origin: 140px 70px }
        .uci-display { animation: uci-display 3s ease-in-out infinite }
      `}</style>

      {/* probe body */}
      <g className="uci-press">
        <rect x="120" y="52" width="40" height="55" rx="5" fill="none" stroke={S} strokeWidth="1.5" />
        <rect x="130" y="66" width="20" height="30" rx="2" fill={A} opacity="0.1" />
        <path d="M140 107 L134 122 L140 130 L146 122 Z" fill="none" stroke={A} strokeWidth="1.2" opacity="0.8" />
      </g>

      {/* material surface */}
      <rect x="60" y="155" width="160" height="55" rx="4" fill="none" stroke={S} strokeWidth="1.5" />

      {/* Vickers impression diamond */}
      <path d="M140 155 L128 165 L140 175 L152 165 Z" fill="none" stroke={A} strokeWidth="1.2" opacity="0.7" />
      {/* diagonals */}
      <path d="M128 165 L152 165" stroke={A} strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      <path d="M140 155 L140 175" stroke={A} strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      {/* d1 d2 labels */}
      <text x="143" y="161" fontSize="7" fill={A} opacity="0.6" fontFamily="monospace">d1</text>
      <text x="154" y="168" fontSize="7" fill={A} opacity="0.6" fontFamily="monospace">d2</text>

      {/* HV readout */}
      <g className="uci-display">
        <rect x="65" y="60" width="46" height="26" rx="4" fill="none" stroke={S} strokeWidth="1" />
        <text x="88" y="75" textAnchor="middle" fontSize="11" fill={A} fontFamily="monospace" fontWeight="bold">248 HV</text>
      </g>

      <text x="140" y="236" textAnchor="middle" fontSize="9" fill={A} opacity="0.6" fontFamily="monospace" letterSpacing="2">UCI HARDNESS</text>
    </>
  );
}

/* ── LEEB: Rebound Hardness ────────────────────────────────── */
function Leeb() {
  return (
    <>
      <style>{`
        @keyframes leeb-drop { 0%{transform:translateY(-35px);opacity:1} 45%{transform:translateY(0);opacity:1} 55%{transform:translateY(0)} 100%{transform:translateY(-35px);opacity:1} }
        @keyframes leeb-arc { 0%,45%{opacity:0} 50%{opacity:1} 100%{opacity:0} }
        .leeb-ball { animation: leeb-drop 2.5s ease-in-out infinite; transform-origin: 140px 160px }
        .leeb-arc { animation: leeb-arc 2.5s ease-in-out infinite }
      `}</style>

      {/* impact device body */}
      <rect x="122" y="58" width="36" height="90" rx="6" fill="none" stroke={S} strokeWidth="1.5" />
      {/* guide bore */}
      <line x1="140" y1="58" x2="140" y2="148" stroke={S} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
      {/* coil indicator */}
      {[0, 1, 2].map(i => (
        <line key={i} x1="126" y1={80 + i * 10} x2="154" y2={80 + i * 10} stroke={A} strokeWidth="0.7" opacity="0.3" />
      ))}

      {/* material surface */}
      <rect x="60" y="158" width="160" height="55" rx="4" fill="none" stroke={S} strokeWidth="1.5" />

      {/* falling ball */}
      <g className="leeb-ball">
        <circle cx="140" cy="148" r="7" fill="none" stroke={A} strokeWidth="1.5" opacity="0.8" />
        <circle cx="140" cy="148" r="3" fill={A} opacity="0.3" />
      </g>

      {/* rebound arc */}
      <path
        className="leeb-arc"
        d="M140 158 Q162 138 168 115"
        fill="none" stroke={A} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.7"
      />
      <path
        className="leeb-arc"
        d="M168 115 L165 125 M168 115 L177 118"
        fill="none" stroke={A} strokeWidth="1" opacity="0.7"
      />

      {/* HL readout */}
      <rect x="65" y="62" width="48" height="26" rx="4" fill="none" stroke={S} strokeWidth="1" />
      <text x="89" y="77" textAnchor="middle" fontSize="10" fill={A} fontFamily="monospace" fontWeight="bold">782 HL</text>

      <text x="140" y="236" textAnchor="middle" fontSize="9" fill={A} opacity="0.6" fontFamily="monospace" letterSpacing="2">LEEB HARDNESS</text>
    </>
  );
}

/* ── Generic fallback ──────────────────────────────────────── */
function GenericDiagram() {
  return (
    <>
      <style>{`
        @keyframes gen-pulse { 0%,100%{r:22} 50%{r:28} }
        .gen-ring { animation: gen-pulse 2.5s ease-in-out infinite }
      `}</style>
      <circle cx="140" cy="140" r="52" fill="none" stroke={S} strokeWidth="1.2" />
      <circle className="gen-ring" cx="140" cy="140" fill="none" stroke={A} strokeWidth="1" opacity="0.4" />
      <circle cx="140" cy="140" r="12" fill={A} opacity="0.2" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <line
          key={i}
          x1={140 + Math.cos((deg * Math.PI) / 180) * 18}
          y1={140 + Math.sin((deg * Math.PI) / 180) * 18}
          x2={140 + Math.cos((deg * Math.PI) / 180) * 52}
          y2={140 + Math.sin((deg * Math.PI) / 180) * 52}
          stroke={S} strokeWidth="0.8"
        />
      ))}
    </>
  );
}

const DIAGRAMS: Record<string, () => React.ReactElement> = {
  vt: VT,
  pt: PT,
  mt: MT,
  ut: UT,
  utt: UTT,
  lt: LT,
  rt: RT,
  'rt-eval': RTEval,
  uci: UCI,
  leeb: Leeb,
};
