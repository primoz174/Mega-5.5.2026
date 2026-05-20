import React, { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

interface Props {
  methodId: string;
  color: string;
}

const serviceVideoMap: Record<string, string> = {
  'vt': '/videos/services/vt.mp4', 'pt': '/videos/services/pt.mp4',
  'mt': '/videos/services/mt.mp4', 'ut': '/videos/services/ut.mp4',
  'utt': '/videos/services/utt.mp4', 'lt': '/videos/services/lt.mp4',
  'rt': '/videos/services/rt.mp4', 'rt-eval': '/videos/services/rt-eval.mp4',
  'uci': '/videos/services/uci.mp4', 'leeb': '/videos/services/leeb.mp4',
  'varilni': '/videos/services/varilni.mp4', 'prevzemi': '/videos/services/prevzemi.mp4',
  'third-party': '/videos/services/third-party.mp4', 'vhodna': '/videos/services/vhodna.mp4',
  'koordinacija': '/videos/services/koordinacija.mp4', 'izvedbena': '/videos/services/izvedbena.mp4',
  'proizvodnja': '/videos/services/proizvodnja.mp4', 'varilna-dok': '/videos/services/varilna-dok.mp4',
  'koncna-dok': '/videos/services/koncna-dok.mp4', 'tehnologija': '/videos/services/tehnologija.mp4',
  'atest': '/videos/services/atest.mp4', 'ndt-svet': '/videos/services/ndt-svet.mp4',
  'navodila': '/videos/services/navodila.mp4', 'uvajanje': '/videos/services/uvajanje.mp4',
};

/* ── Shared palette ─────────────────────────────────────────── */
const C = {
  steel:  '#1e2d3d',
  weld:   '#162230',
  probe:  '#0c1824',
  signal: '#003399',
  defect: '#c41400',
  penet:  '#bb2200',
  mag:    '#004d28',
  xray:   '#886600',
  screen: '#001525',
  bubble: '#003355',
};
const E = {
  signal:  '#0066ff',
  defect:  '#ff2200',
  penet:   '#ff3300',
  mag:     '#00cc55',
  xray:    '#ffaa00',
  screen:  '#0099ee',
  bubble:  '#3399ff',
  orange:  '#ff6600',
  purple:  '#9933ff',
};

/* ── Shared vertex shader ─────────────────────────────────────── */
const VS = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/* ── UT: ultrasonic wave field (cross-section) ─────────────────── */
const UT_FS = /* glsl */`
precision highp float;
uniform float uTime;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  vec3 c = vec3(0.04, 0.08, 0.14);
  float n = fract(sin(dot(floor(uv * 70.0), vec2(127.1, 311.7))) * 43758.5);
  c += (n - 0.5) * 0.012;
  float weld = smoothstep(0.02, 0.0, abs(uv.y - 0.72)) * 0.35;
  c = mix(c, vec3(0.07, 0.12, 0.19), weld);
  float bx = 0.25;
  float beam = smoothstep(0.055, 0.01, abs(uv.x - bx));
  for (int i = 0; i < 4; i++) {
    float t = mod(uTime * 0.75 + float(i) * 0.46, 1.9);
    float wy = 1.0 - t;
    float w = smoothstep(0.013, 0.0, abs(uv.y - wy)) * beam * (1.0 - t / 1.9);
    c += vec3(0.0, 0.38, 1.0) * w * 3.8;
  }
  vec2 dp = vec2(0.63, 0.4);
  float dd = length(uv - dp);
  float pulse = 0.55 + 0.45 * sin(uTime * 6.0);
  c += vec3(1.0, 0.13, 0.0) * exp(-dd * dd * 280.0) * pulse * 5.5;
  float tDown = (1.0 - dp.y) / 0.75;
  for (int i = 0; i < 3; i++) {
    float t = mod(uTime * 0.75 - tDown + float(i) * 0.46, 1.9);
    if (t > 0.0 && t < 1.5) {
      float wy = dp.y + t * 0.75;
      float w = smoothstep(0.013, 0.0, abs(uv.y - wy)) * beam * max(0.0, 1.0 - t / 1.5);
      c += vec3(1.0, 0.2, 0.0) * w * 2.8;
    }
  }
  vec2 e = abs(uv - 0.5) * 2.0;
  c *= 1.0 - dot(e * 0.38, e * 0.38) * 0.42;
  gl_FragColor = vec4(c, 1.0);
}
`;

/* ── PT: dye penetrant seeping into crack (Multi-Phase Simulation) ──────────────── */
const PT_FS = /* glsl */`
precision highp float;
uniform float uPhase;          // 0.0: Spray Red, 1.0: Wipe, 2.0: Spray White, 3.0: Bleed-out
uniform float uPhaseProgress;  // 0.0 to 1.0 within the phase
uniform float uTime;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }

void main() {
  vec2 uv = vUv;
  float grain = hash(floor(uv * 90.0));
  
  // 1. Bare Steel Base
  vec3 steelColor = vec3(0.14, 0.18, 0.25) + (grain - 0.5) * 0.025;
  
  // 2. Crack Geometry (retained for authentic physical shape)
  float cx = 0.5 + sin(uv.y * 14.0) * 0.011 + sin(uv.y * 6.5 + 1.7) * 0.007;
  float crackW = mix(0.003, 0.008, smoothstep(0.5, 1.0, uv.y));
  float onCrack = smoothstep(crackW, 0.0, abs(uv.x - cx));
  
  float bx = cx + sin(uv.y * 22.0 + 0.5) * 0.009;
  float bFade = smoothstep(0.04, 0.0, abs(uv.y - 0.38));
  float onBranch = smoothstep(0.003, 0.0, abs(uv.x - bx)) * bFade;
  float crack = max(onCrack, onBranch * 0.7);
  
  // Deep crack shadow base
  vec3 baseColor = mix(steelColor, vec3(0.02, 0.0, 0.0), crack * 0.7);
  
  vec3 finalColor = baseColor;
  
  if (uPhase < 0.5) {
    // ════ PHASE 0: Red penetrant application ════
    // Spray can moves from right (X=1.3) to left (X=-1.3), so nozzle goes right to left in UV
    float nozzleUvX = 0.9 - uPhaseProgress * 0.8;
    float coatAmount = smoothstep(nozzleUvX - 0.06, nozzleUvX + 0.06, uv.x);
    
    vec3 penetrantColor = vec3(0.85, 0.02, 0.0);
    // Subtle shiny gloss to show wetness under active spray
    float wetness = 0.15 * sin(uv.x * 20.0 + uv.y * 30.0 + uTime * 2.0) * coatAmount;
    
    finalColor = mix(baseColor, penetrantColor + vec3(wetness), coatAmount);
    finalColor += vec3(0.2, 0.05, 0.0) * crack * coatAmount;
    
  } else if (uPhase < 1.5) {
    // ════ PHASE 1: Wiping / cleaning surface ════
    // Clean wipe progresses from left to right (wipeUvX from 0.0 to 1.0)
    float wipeUvX = uPhaseProgress;
    float coatAmount = smoothstep(wipeUvX - 0.06, wipeUvX + 0.06, uv.x);
    
    vec3 penetrantColor = vec3(0.85, 0.02, 0.0);
    finalColor = mix(baseColor, penetrantColor, coatAmount);
    
    // NDT physics: Deep red penetrant remains trapped inside the crack!
    float cleanPart = 1.0 - coatAmount;
    finalColor += vec3(0.9, 0.04, 0.0) * crack * cleanPart * 2.2;
    
  } else if (uPhase < 2.5) {
    // ════ PHASE 2: Developer application ════
    // White spray moves from left to right (nozzleUvX from 0.1 to 0.9)
    float nozzleUvX = 0.1 + uPhaseProgress * 0.8;
    float whiteAmount = 1.0 - smoothstep(nozzleUvX - 0.06, nozzleUvX + 0.06, uv.x);
    
    vec3 developerColor = vec3(0.92, 0.93, 0.95) + (grain - 0.5) * 0.015;
    vec3 uncoatedColor = baseColor + vec3(0.9, 0.04, 0.0) * crack * 2.2;
    
    finalColor = mix(uncoatedColor, developerColor, whiteAmount);
    
  } else {
    // ════ PHASE 3: Capillary bleed-out ════
    // Plate is covered in matte white developer, red dye capillary-bleeds through!
    vec3 developerColor = vec3(0.92, 0.93, 0.95) + (grain - 0.5) * 0.015;
    
    // Indication bleeds wider and glows vibrant red
    float bleedWidth = 0.004 + 0.018 * uPhaseProgress;
    float bleed = exp(-abs(uv.x - cx) / bleedWidth) * (1.0 - crack * 0.5);
    
    float pulse = 0.85 + 0.15 * sin(uTime * 4.5 + uv.y * 8.0);
    vec3 bleedColor = vec3(0.98, 0.01, 0.0) * pulse * 2.6;
    
    finalColor = mix(developerColor, bleedColor, bleed * uPhaseProgress);
    finalColor += vec3(0.8, 0.0, 0.0) * crack * uPhaseProgress * 2.0;
  }
  
  // High-fidelity edge vignette
  vec2 e = abs(uv - 0.5) * 2.0;
  finalColor *= 1.0 - dot(e * 0.35, e * 0.35) * 0.35;
  
  gl_FragColor = vec4(clamp(finalColor, 0.0, 2.0), 1.0);
}
`;

/* ── MT: magnetic field lines + flux leakage ───────────────────── */
const MT_FS = /* glsl */`
precision highp float;
uniform float uTime;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  vec3 c = vec3(0.04, 0.07, 0.11);
  float noise = fract(sin(dot(floor(uv * 55.0), vec2(17.0, 31.7))) * 8375.85);
  c += (noise - 0.5) * 0.014;
  vec2 defPos = vec2(0.5, 0.48);
  float fieldSum = 0.0;
  for (float lx = 0.04; lx < 1.0; lx += 0.09) {
    float distX = uv.x - lx;
    float defInfluence = exp(-pow(uv.y - defPos.y, 2.0) * 12.0);
    float deflect = (defPos.x - lx) * defInfluence * 0.12;
    float lineDist = abs(distX - deflect);
    float flowY = fract(uv.y * 2.5 - uTime * 1.4 + lx * 5.0);
    float dotPat = smoothstep(0.42, 0.5, flowY) - smoothstep(0.5, 0.58, flowY);
    float lineGlow = smoothstep(0.015, 0.002, lineDist);
    fieldSum += lineGlow * (0.5 + dotPat * 0.8);
  }
  c += vec3(0.05, 0.85, 0.38) * fieldSum * 1.7;
  float defDist = length(uv - defPos);
  float leakP = 0.5 + 0.5 * sin(uTime * 4.5);
  c += vec3(0.1, 1.0, 0.45) * exp(-defDist * defDist * 22.0) * leakP * 3.5;
  c += vec3(0.05, 0.8, 0.35) * exp(-defDist * defDist * 180.0) * 2.5;
  for (float i = 0.0; i < 8.0; i++) {
    float angle = i * 0.7854 + uTime * 0.3;
    vec2 pPos = defPos + vec2(cos(angle), sin(angle)) * (0.06 + 0.04 * sin(uTime + i));
    c += vec3(0.1, 1.0, 0.5) * exp(-length(uv - pPos) * length(uv - pPos) * 800.0) * 1.5;
  }
  vec2 e = abs(uv - 0.5) * 2.0;
  c *= 1.0 - dot(e * 0.38, e * 0.38) * 0.4;
  gl_FragColor = vec4(clamp(c, 0.0, 2.0), 1.0);
}
`;

/* ── RT: radiographic beam + film exposure ─────────────────────── */
const RT_FS = /* glsl */`
precision highp float;
uniform float uTime;
varying vec2 vUv;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5); }
void main() {
  vec2 uv = vUv;
  vec3 c = vec3(0.015, 0.012, 0.008);
  vec2 src = vec2(0.5, 1.06);
  vec2 d = uv - src;
  float dist = length(d);
  float angle = atan(abs(d.x), -d.y);
  float inCone = smoothstep(0.48, 0.28, angle);
  float noiseVal = hash(floor(uv * 60.0 + vec2(uTime * 0.4, 0.0)));
  float beam = inCone / (dist * dist * 1.8 + 0.25) * (0.75 + noiseVal * 0.25);
  float inSteel = smoothstep(0.375, 0.405, uv.y) * (1.0 - smoothstep(0.515, 0.545, uv.y));
  vec2 defPos = vec2(0.62, 0.46);
  float inDefect = exp(-length(uv - defPos) / 0.038);
  float steelAtten = inSteel * (0.78 - inDefect * 0.55);
  float beamThrough = beam * (1.0 - steelAtten);
  c += vec3(0.9, 0.75, 0.2) * beamThrough * 0.55;
  c += vec3(0.06, 0.09, 0.14) * inSteel * (1.0 - inDefect * 0.6);
  c += vec3(0.8, 0.6, 0.15) * inDefect * inSteel * (0.4 + 0.3 * sin(uTime * 3.0)) * 2.0;
  float onFilm = smoothstep(0.065, 0.095, uv.y) * (1.0 - smoothstep(0.145, 0.175, uv.y));
  vec3 filmBase = vec3(0.06, 0.05, 0.04) * onFilm;
  float filmExp = beamThrough * onFilm * 3.0;
  float defFilm = beam * inDefect * onFilm * 3.0 * (0.7 + 0.3 * sin(uTime * 1.5));
  c = mix(c, filmBase + vec3(0.6, 0.5, 0.3) * filmExp + vec3(0.9, 0.8, 0.5) * defFilm, onFilm);
  float srcGlow = exp(-dist * dist * 18.0) * (0.6 + 0.4 * sin(uTime * 4.0));
  c += vec3(0.95, 0.72, 0.1) * srcGlow * 4.0;
  vec2 e = abs(uv - 0.5) * 2.0;
  c *= 1.0 - dot(e * 0.4, e * 0.4) * 0.45;
  gl_FragColor = vec4(clamp(c, 0.0, 2.0), 1.0);
}
`;

/* ── ShaderPlane: reusable animated GLSL surface ───────────────── */
const ShaderPlane: React.FC<{ fs: string }> = ({ fs }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh>
      <planeGeometry args={[3.2, 2.1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VS}
        fragmentShader={fs}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/* ════════════════════════════════════════════════════════════════
   VT – Visual Testing
   ════════════════════════════════════════════════════════════════ */
const VTScene = () => {
  const groupRef  = useRef<THREE.Group>(null);
  const scopeRef  = useRef<THREE.Group>(null);
  const coneRef   = useRef<THREE.Mesh>(null);
  const defectRef = useRef<THREE.Mesh>(null);
  const dLightRef = useRef<THREE.PointLight>(null);
  const beads = useMemo(() => [-1.0, -0.7, -0.4, -0.1, 0.2, 0.5, 0.8], []);

  useFrame((s, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.12;
      groupRef.current.rotation.x = -0.35 + Math.sin(s.clock.elapsedTime * 0.2) * 0.05;
    }
    if (scopeRef.current) scopeRef.current.position.x = Math.sin(s.clock.elapsedTime * 0.5) * 0.7;
    if (coneRef.current) {
      (coneRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.2 + Math.sin(s.clock.elapsedTime * 2.5) * 0.5;
    }
    if (defectRef.current && scopeRef.current) {
      const glow = Math.max(0, 1 - Math.abs(scopeRef.current.position.x - 0.4) * 2.2);
      (defectRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5 + glow * 3.5;
      if (dLightRef.current) dLightRef.current.intensity = glow * 5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2.8, 0.3, 1.8]} />
        <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.0, 0]}>
        <boxGeometry args={[2.4, 0.1, 0.18]} />
        <meshStandardMaterial color={C.weld} metalness={0.75} roughness={0.45} />
      </mesh>
      {beads.map((x, i) => (
        <mesh key={i} position={[x, 0.05, 0]}>
          <boxGeometry args={[0.06, 0.045, 0.22]} />
          <meshStandardMaterial color={C.weld} metalness={0.7} roughness={0.5} />
        </mesh>
      ))}
      <mesh ref={defectRef} position={[0.4, 0.07, 0]}>
        <boxGeometry args={[0.12, 0.06, 0.2]} />
        <meshStandardMaterial color={C.defect} emissive={E.defect} emissiveIntensity={1.5} />
      </mesh>
      <pointLight ref={dLightRef} position={[0.4, 0.15, 0]} color={E.defect} intensity={0} distance={2} />
      <group ref={scopeRef}>
        <mesh position={[0.55, 1.1, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.022, 0.022, 1.4, 8]} />
          <meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 0.18, 10]} />
          <meshStandardMaterial color={C.probe} metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.055, 10, 8]} />
          <meshStandardMaterial color="#003355" emissive={E.screen} emissiveIntensity={1.5} />
        </mesh>
        <mesh ref={coneRef} position={[0, 0.24, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.2, 0.42, 12, 1, true]} />
          <meshStandardMaterial color="#886600" emissive="#ffcc44" emissiveIntensity={1.2}
            transparent opacity={0.22} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0, 0.3, 0]} color="#ffcc44" intensity={1.5} distance={1.5} />
      </group>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   PT – Penetrant Testing  (GLSL shader)
   ════════════════════════════════════════════════════════════════ */
const PTScene = () => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);
  const redCanRef = useRef<THREE.Group>(null);
  const whiteCanRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // 12-second looping cycle
  // Phase 0: Red spray can (0s - 3s)
  // Phase 1: Wiping (3s - 6s)
  // Phase 2: White developer spray can (6s - 9s)
  // Phase 3: Bleed out (9s - 12s)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPhase: { value: 0.0 },
    uPhaseProgress: { value: 0.0 },
  }), []);

  // Pre-allocated particles for aerosol mist
  const PARTICLE_COUNT = 60;
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr.push({
        x: 0,
        y: -999,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0,
        colorType: 0, // 0: red, 1: white
      });
    }
    return arr;
  }, []);

  const posArray = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
  const colorArray = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  useFrame((state) => {
    const clock = state.clock;
    const time = clock.getElapsedTime() % 12;
    const phase = Math.floor(time / 3);
    const progress = (time % 3) / 3;
    const dt = Math.min(state.clock.getDelta(), 0.03); // Cap dt to keep physics stable on frame hiccups

    // Update shader uniforms
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime();
      matRef.current.uniforms.uPhase.value = phase;
      matRef.current.uniforms.uPhaseProgress.value = progress;
    }

    // Set can dynamics
    let canX = 0;
    let canY = 0.8;
    const canZ = 0.35;
    let canTiltZ = 0;
    let isSpraying = false;

    if (phase === 0) {
      // Sweep right to left
      canX = 1.3 - progress * 2.6;
      canY = 0.82 + Math.sin(progress * Math.PI) * 0.06;
      canTiltZ = 0.28 * Math.sin(progress * Math.PI);
      isSpraying = true;

      if (redCanRef.current) {
        redCanRef.current.position.set(canX, canY, canZ);
        redCanRef.current.rotation.set(0.12, 0, canTiltZ);
        redCanRef.current.visible = true;
      }
      if (whiteCanRef.current) whiteCanRef.current.visible = false;

      // Project red light onto weld plate surface
      if (lightRef.current) {
        lightRef.current.position.set(canX, canY - 0.25, canZ - 0.04);
        lightRef.current.color.set(E.penet);
        lightRef.current.intensity = (2.2 + Math.sin(clock.getElapsedTime() * 45) * 0.3) * Math.sin(progress * Math.PI);
      }
    } else if (phase === 2) {
      // Sweep left to right
      canX = -1.3 + progress * 2.6;
      canY = 0.82 + Math.sin(progress * Math.PI) * 0.06;
      canTiltZ = -0.28 * Math.sin(progress * Math.PI);
      isSpraying = true;

      if (whiteCanRef.current) {
        whiteCanRef.current.position.set(canX, canY, canZ);
        whiteCanRef.current.rotation.set(0.12, 0, canTiltZ);
        whiteCanRef.current.visible = true;
      }
      if (redCanRef.current) redCanRef.current.visible = false;

      // Project cool blue-white light for developer spray
      if (lightRef.current) {
        lightRef.current.position.set(canX, canY - 0.25, canZ - 0.04);
        lightRef.current.color.set('#0071e3');
        lightRef.current.intensity = (1.8 + Math.sin(clock.getElapsedTime() * 35) * 0.2) * Math.sin(progress * Math.PI);
      }
    } else {
      // Hide cans and active lights during wiping/cleaning (Phase 1) and bleed-out (Phase 3)
      if (redCanRef.current) redCanRef.current.visible = false;
      if (whiteCanRef.current) whiteCanRef.current.visible = false;
      if (lightRef.current) lightRef.current.intensity = 0;
    }

    // Aerosol particle system updates
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      if (isSpraying) {
        p.life -= dt * 1.8; // particle life ~0.55s
        if (p.life <= 0) {
          // Spray out from nozzle location
          p.x = canX;
          p.y = canY - 0.25;
          p.z = canZ - 0.04;
          p.vy = -2.3 - Math.random() * 0.6;
          p.vx = (Math.random() - 0.5) * 1.0 + (phase === 0 ? -0.4 : 0.4);
          p.vz = (Math.random() - 0.5) * 0.5;
          p.life = 1.0;
          p.colorType = phase === 0 ? 0 : 1;
        } else {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.z += p.vz * dt;
        }
      } else {
        p.y = -999;
        p.life = 0;
      }

      posArray[i * 3] = p.x;
      posArray[i * 3 + 1] = p.y;
      posArray[i * 3 + 2] = p.z;

      if (p.colorType === 0) {
        colorArray[i * 3] = 0.98;
        colorArray[i * 3 + 1] = 0.02 * p.life;
        colorArray[i * 3 + 2] = 0.0;
      } else {
        colorArray[i * 3] = 0.95;
        colorArray[i * 3 + 1] = 0.95;
        colorArray[i * 3 + 2] = 0.98;
      }
    }

    if (geomRef.current) {
      geomRef.current.attributes.position.needsUpdate = true;
      geomRef.current.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group rotation={[-0.08, 0.1, 0]}>
      {/* 3D plate with dynamic shader */}
      <mesh>
        <planeGeometry args={[3.2, 2.1]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={VS}
          fragmentShader={PT_FS}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Red Penetrant Spray Can */}
      <group ref={redCanRef} visible={false}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.44, 16]} />
          <meshStandardMaterial color="#ee2200" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.091, 0.091, 0.16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.15} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.06, 0.09, 0.06, 16]} />
          <meshStandardMaterial color="#b31a00" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.03, 0.04, 0.03]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.7} />
        </mesh>
      </group>

      {/* White Developer Spray Can */}
      <group ref={whiteCanRef} visible={false}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.44, 16]} />
          <meshStandardMaterial color="#f0f0f0" metalness={0.75} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.091, 0.091, 0.16, 16]} />
          <meshStandardMaterial color="#0071e3" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.06, 0.09, 0.06, 16]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.03, 0.04, 0.03]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.7} />
        </mesh>
      </group>

      {/* 3D Aerosol Particle Mist */}
      <points>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[posArray, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colorArray, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors={true}
          transparent={true}
          opacity={0.65}
          depthWrite={false}
          sizeAttenuation={true}
        />
      </points>

      {/* Dynamic spray nozzle glow projecting light onto plate */}
      <pointLight ref={lightRef} intensity={0} distance={1.8} />

      {/* Bottom Plate steel thickness edge for physical realism */}
      <mesh position={[0, -1.08, 0.05]}>
        <boxGeometry args={[3.2, 0.06, 0.1]} />
        <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   MT – Magnetic Testing  (GLSL shader)
   ════════════════════════════════════════════════════════════════ */
const MTScene = () => (
  <group rotation={[-0.08, -0.1, 0]}>
    <ShaderPlane fs={MT_FS} />
    {/* Electromagnet yoke — left pole */}
    <mesh position={[-1.2, 0.62, 0.22]}>
      <boxGeometry args={[0.22, 0.72, 0.26]} />
      <meshStandardMaterial color={C.probe} metalness={0.9} roughness={0.2} />
    </mesh>
    {/* Yoke crossbar */}
    <mesh position={[0, 1.0, 0.22]}>
      <boxGeometry args={[2.64, 0.18, 0.26]} />
      <meshStandardMaterial color={C.probe} metalness={0.9} roughness={0.2} />
    </mesh>
    {/* Right pole */}
    <mesh position={[1.2, 0.62, 0.22]}>
      <boxGeometry args={[0.22, 0.72, 0.26]} />
      <meshStandardMaterial color={C.probe} metalness={0.9} roughness={0.2} />
    </mesh>
    {/* Part surface edge */}
    <mesh position={[0, -0.95, 0]}>
      <boxGeometry args={[3.2, 0.06, 0.18]} />
      <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} />
    </mesh>
    <pointLight position={[0, 0.5, 0.4]} color={E.mag} intensity={1.8} distance={2.5} />
  </group>
);

/* ════════════════════════════════════════════════════════════════
   UT – Ultrasonic Testing  (GLSL shader)
   ════════════════════════════════════════════════════════════════ */
const UTScene = () => {
  const probeRef = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (probeRef.current) {
      probeRef.current.position.x = -0.52 + Math.sin(s.clock.elapsedTime * 0.28) * 0.04;
    }
  });
  return (
    <group rotation={[-0.08, 0.12, 0]}>
      <ShaderPlane fs={UT_FS} />
      {/* UT probe block */}
      <group ref={probeRef} position={[-0.52, 0.88, 0.2]}>
        <mesh>
          <boxGeometry args={[0.3, 0.18, 0.25]} />
          <meshStandardMaterial color={C.probe} metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Couplant gel pad */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.26, 0.02, 0.22]} />
          <meshStandardMaterial color="#003355" emissive={E.signal} emissiveIntensity={0.5} transparent opacity={0.7} />
        </mesh>
        {/* Cable */}
        <mesh position={[0.06, 0.22, 0]} rotation={[0, 0, 0.35]}>
          <cylinderGeometry args={[0.018, 0.018, 0.46, 8]} />
          <meshStandardMaterial color={C.probe} metalness={0.85} roughness={0.25} />
        </mesh>
      </group>
      {/* A-scan display */}
      <group position={[1.1, 0.45, 0.28]} rotation={[0, -0.28, 0]}>
        <mesh>
          <boxGeometry args={[0.6, 0.42, 0.065]} />
          <meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.034]}>
          <planeGeometry args={[0.5, 0.32]} />
          <meshStandardMaterial color={C.screen} emissive={E.screen} emissiveIntensity={0.22} transparent opacity={0.95} />
        </mesh>
      </group>
      <pointLight position={[-0.5, 0.5, 0.5]} color={E.signal} intensity={1.2} distance={2} />
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   UTT – Thickness
   ════════════════════════════════════════════════════════════════ */
const UTTScene = () => {
  const groupRef   = useRef<THREE.Group>(null);
  const pulseRef   = useRef<THREE.Mesh>(null);
  const echoRef    = useRef<THREE.Mesh>(null);
  const sigLightRef = useRef<THREE.PointLight>(null);
  const digits     = useRef<THREE.Mesh[]>([]);

  useFrame((s, dt) => {
    if (groupRef.current) { groupRef.current.rotation.y += dt * 0.12; groupRef.current.rotation.x = -0.3; }
    if (pulseRef.current) {
      const t = (s.clock.elapsedTime * 1.4) % 2;
      pulseRef.current.position.y = 0.05 - t * 0.5;
      const mat = pulseRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = Math.max(0, 0.7 - t * 0.35);
      mat.emissiveIntensity = Math.max(0, (0.7 - t * 0.35) * 3.5);
      if (sigLightRef.current) sigLightRef.current.intensity = Math.max(0, (0.7 - t * 0.35) * 6);
    }
    if (echoRef.current) {
      const t = ((s.clock.elapsedTime * 1.4) + 0.7) % 2;
      echoRef.current.position.y = -0.4 + t * 0.4;
      const mat = echoRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = Math.max(0, 0.65 - t * 0.3);
      mat.emissiveIntensity = Math.max(0, (0.65 - t * 0.3) * 3);
    }
    digits.current.forEach((m, i) => {
      if (!m) return;
      (m.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + Math.sin(s.clock.elapsedTime * 3 + i) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-0.5, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.45, 0.45, 1.4, 24, 4, true]} />
        <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.5, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.32, 0.32, 1.4, 24, 4, true]} />
        <meshStandardMaterial color="#132030" metalness={0.8} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.5, 0.3, 0]}>
        <boxGeometry args={[0.22, 0.18, 0.22]} />
        <meshStandardMaterial color={C.probe} metalness={0.9} roughness={0.18} />
      </mesh>
      <pointLight ref={sigLightRef} position={[-0.5, 0.05, 0]} color={E.signal} intensity={4} distance={2} />
      <mesh ref={pulseRef} position={[-0.5, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.012, 8, 20]} />
        <meshStandardMaterial color={C.signal} emissive={E.signal} emissiveIntensity={2.5} transparent opacity={0.7} />
      </mesh>
      <mesh ref={echoRef} position={[-0.5, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.01, 8, 18]} />
        <meshStandardMaterial color="#886600" emissive={E.xray} emissiveIntensity={2} transparent opacity={0.6} />
      </mesh>
      <group position={[0.85, 0.05, 0]} rotation={[0, -0.3, 0]}>
        <mesh><boxGeometry args={[0.75, 0.55, 0.12]} /><meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.2} /></mesh>
        <mesh position={[0, 0.08, 0.065]}><planeGeometry args={[0.6, 0.25]} /><meshStandardMaterial color={C.screen} emissive={E.screen} emissiveIntensity={0.3} transparent opacity={0.95} /></mesh>
        {[-0.18, -0.04, 0.1, 0.22].map((x, i) => (
          <mesh key={i} ref={(el) => { if (el) digits.current[i] = el; }} position={[x, 0.08, 0.075]}>
            <boxGeometry args={[0.07, 0.16, 0.001]} />
            <meshStandardMaterial color={C.signal} emissive={E.screen} emissiveIntensity={1} transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   LT – Leak Testing
   ════════════════════════════════════════════════════════════════ */
const LTScene = () => {
  const groupRef  = useRef<THREE.Group>(null);
  const bubbles   = useRef<THREE.Mesh[]>([]);
  const leakRef   = useRef<THREE.Mesh>(null);
  const lLightRef = useRef<THREE.PointLight>(null);

  const bubbleConfig = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      phase: i * 0.5, maxSize: 0.04 + (i % 3) * 0.025, drift: Math.sin(i * 1.7) * 0.12,
    })), []);

  useFrame((s, dt) => {
    if (groupRef.current) { groupRef.current.rotation.y += dt * 0.12; groupRef.current.rotation.x = -0.15; }
    if (leakRef.current) {
      (leakRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        2.5 + Math.sin(s.clock.elapsedTime * 2.5) * 1.2;
      if (lLightRef.current) lLightRef.current.intensity = 2 + Math.sin(s.clock.elapsedTime * 2.5) * 1.5;
    }
    bubbles.current.forEach((b, i) => {
      if (!b) return;
      const cfg = bubbleConfig[i];
      const t = ((s.clock.elapsedTime * 0.55) + cfg.phase) % 2.5;
      const prog = t / 2.5;
      b.position.set(0.6 + cfg.drift * prog, 0.55 + prog * 1.1, Math.sin(t * 1.5 + i) * 0.08);
      const sz = prog < 0.85 ? cfg.maxSize * (0.3 + prog * 0.9) : cfg.maxSize * (1.2 - (prog - 0.85) * 8);
      b.scale.setScalar(Math.max(0.01, sz / cfg.maxSize));
      const mat = b.material as THREE.MeshStandardMaterial;
      const op = prog < 0.85 ? 0.35 + prog * 0.35 : Math.max(0, 0.7 - (prog - 0.85) * 5);
      mat.opacity = op;
      mat.emissiveIntensity = op * 2.5;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.55, 0.55, 2.5, 32, 8, true]} />
        <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      {([-1.25, 1.25] as number[]).map((px, i) => (
        <mesh key={i} position={[px, 0, 0]} rotation={[0, 0, i === 0 ? Math.PI / 2 : -Math.PI / 2]}>
          <sphereGeometry args={[0.55, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[-0.4, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.06, 14]} />
        <meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.2} />
      </mesh>
      <mesh position={[-0.4, 0.48, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.18, 8]} />
        <meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh ref={leakRef} position={[0.6, 0.55, 0]}>
        <sphereGeometry args={[0.055, 10, 8]} />
        <meshStandardMaterial color={C.defect} emissive={E.defect} emissiveIntensity={2.5} />
      </mesh>
      <pointLight ref={lLightRef} position={[0.6, 0.55, 0]} color={E.defect} intensity={2} distance={2} />
      {bubbleConfig.map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) bubbles.current[i] = el; }}>
          <sphereGeometry args={[0.06, 10, 8]} />
          <meshStandardMaterial color={C.bubble} emissive={E.bubble} emissiveIntensity={1.5} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   RT – Radiographic Testing  (GLSL shader)
   ════════════════════════════════════════════════════════════════ */
const RTScene = () => {
  const srcRef = useRef<THREE.Mesh>(null);
  const sLightRef = useRef<THREE.PointLight>(null);
  useFrame((s) => {
    if (srcRef.current) {
      (srcRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        3 + Math.sin(s.clock.elapsedTime * 3.5) * 1.5;
      if (sLightRef.current)
        sLightRef.current.intensity = 4 + Math.sin(s.clock.elapsedTime * 3.5) * 2;
    }
  });
  return (
    <group rotation={[-0.08, -0.08, 0]}>
      <ShaderPlane fs={RT_FS} />
      {/* Radiation source housing */}
      <mesh position={[0, 1.22, 0.22]}>
        <boxGeometry args={[0.38, 0.28, 0.28]} />
        <meshStandardMaterial color="#2a2200" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Source sphere */}
      <mesh ref={srcRef} position={[0, 1.07, 0.22]}>
        <sphereGeometry args={[0.065, 12, 10]} />
        <meshStandardMaterial color={C.xray} emissive={E.xray} emissiveIntensity={3} />
      </mesh>
      <pointLight ref={sLightRef} position={[0, 1.07, 0.25]} color={E.xray} intensity={4} distance={4} />
      {/* Film cassette at bottom */}
      <mesh position={[0, -0.88, 0.22]}>
        <boxGeometry args={[2.0, 0.055, 0.14]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.4} roughness={0.7} />
      </mesh>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   RT-eval – Film Evaluation
   ════════════════════════════════════════════════════════════════ */
const RTEvalScene = () => {
  const groupRef  = useRef<THREE.Group>(null);
  const loupeRef  = useRef<THREE.Group>(null);
  const lLightRef = useRef<THREE.PointLight>(null);
  const filmDef   = useRef<THREE.Mesh[]>([]);

  const spots = useMemo(() => [
    { x: -0.55, y: -0.05, s: 0.025 }, { x: -0.3, y:  0.02, s: 0.018 },
    { x: -0.05, y: -0.08, s: 0.03  }, { x:  0.22, y:  0.04, s: 0.022 },
    { x:  0.5,  y: -0.06, s: 0.026 }, { x:  0.7,  y:  0.05, s: 0.015 },
  ], []);

  useFrame((s, dt) => {
    if (groupRef.current) { groupRef.current.rotation.y += dt * 0.1; groupRef.current.rotation.x = -0.3; }
    if (loupeRef.current) {
      loupeRef.current.position.x = Math.sin(s.clock.elapsedTime * 0.8) * 0.5;
      loupeRef.current.position.z = Math.cos(s.clock.elapsedTime * 0.5) * 0.15 + 0.4;
    }
    if (lLightRef.current) {
      lLightRef.current.position.x = Math.sin(s.clock.elapsedTime * 0.8) * 0.5;
      lLightRef.current.intensity = 2 + Math.sin(s.clock.elapsedTime * 1.5) * 0.5;
    }
    filmDef.current.forEach((m, i) => {
      if (!m) return;
      (m.material as THREE.MeshStandardMaterial).opacity =
        0.85 + Math.sin(s.clock.elapsedTime * 1.2 + i) * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 8, 0, 0]}>
        <boxGeometry args={[2.5, 1.5, 0.4]} />
        <meshStandardMaterial color={C.probe} metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.2, 0.21]} rotation={[-Math.PI / 8, 0, 0]}>
        <planeGeometry args={[2.2, 1.2]} />
        <meshStandardMaterial color="#221800" emissive={E.xray} emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -0.15, 0.25]} rotation={[-Math.PI / 8, 0, 0]}>
        <planeGeometry args={[1.8, 0.4]} />
        <meshStandardMaterial color="#111111" metalness={0.3} roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.15, 0.255]} rotation={[-Math.PI / 8, 0, 0]}>
        <planeGeometry args={[1.7, 0.18]} />
        <meshStandardMaterial color="#221800" emissive={E.xray} emissiveIntensity={0.18} transparent opacity={0.7} />
      </mesh>
      {spots.map((d, i) => (
        <mesh key={i} ref={(el) => { if (el) filmDef.current[i] = el; }}
          position={[d.x, -0.15 + d.y * Math.cos(Math.PI / 8), 0.26 + d.y * Math.sin(Math.PI / 8)]}
          rotation={[-Math.PI / 8, 0, 0]}>
          <circleGeometry args={[d.s, 12]} />
          <meshStandardMaterial color="#030508" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh position={[0.05, -0.15, 0.262]} rotation={[-Math.PI / 8, 0, 0.12]}>
        <planeGeometry args={[0.45, 0.012]} />
        <meshStandardMaterial color="#030508" transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>
      <group ref={loupeRef} position={[0, 0.2, 0.4]} rotation={[-Math.PI / 8, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.3, 18, 2, true]} />
          <meshStandardMaterial color="#001830" emissive={E.signal} emissiveIntensity={0.8} transparent opacity={0.9} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.18, 22]} />
          <meshStandardMaterial color="#003355" emissive={E.signal} emissiveIntensity={0.2} transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.018, 0.018, 0.32, 8]} />
          <meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.2} />
        </mesh>
      </group>
      <pointLight ref={lLightRef} position={[0, 0.2, 0.4]} color={E.signal} intensity={2} distance={1.5} />
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   UCI – Vickers Hardness
   ════════════════════════════════════════════════════════════════ */
const UCIScene = () => {
  const groupRef  = useRef<THREE.Group>(null);
  const indRef    = useRef<THREE.Group>(null);
  const impRef    = useRef<THREE.Mesh>(null);
  const iLightRef = useRef<THREE.PointLight>(null);
  const digits    = useRef<THREE.Mesh[]>([]);

  useFrame((s, dt) => {
    if (groupRef.current) { groupRef.current.rotation.y += dt * 0.12; groupRef.current.rotation.x = -0.3; }
    if (indRef.current) {
      const c = (s.clock.elapsedTime * 0.5) % 3;
      indRef.current.position.y = c < 1 ? 0.6 - c * 0.45 : c < 2 ? 0.15 : 0.15 + (c - 2) * 0.45;
    }
    if (impRef.current) {
      const c = (s.clock.elapsedTime * 0.5) % 3;
      const pressed = c >= 0.9 && c <= 2.1 ? 1 : 0;
      (impRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pressed * 3.5;
      (impRef.current.material as THREE.MeshStandardMaterial).opacity = 0.05 + pressed * 0.88;
      if (iLightRef.current) iLightRef.current.intensity = pressed * 5;
    }
    digits.current.forEach((m, i) => {
      if (!m) return;
      (m.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1 + Math.sin(s.clock.elapsedTime * 2.5 + i * 0.8) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-0.4, -0.3, 0]}>
        <boxGeometry args={[1.6, 0.5, 1.4]} />
        <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh ref={impRef} position={[-0.4, -0.04, 0]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <planeGeometry args={[0.08, 0.08]} />
        <meshStandardMaterial color={C.signal} emissive={E.signal} emissiveIntensity={0} transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
      <pointLight ref={iLightRef} position={[-0.4, -0.04, 0]} color={E.signal} intensity={0} distance={1.5} />
      <group ref={indRef} position={[-0.4, 0.6, 0]}>
        <mesh rotation={[Math.PI, 0, Math.PI / 4]}>
          <coneGeometry args={[0.09, 0.18, 4]} />
          <meshStandardMaterial color="#0033aa" emissive={E.signal} emissiveIntensity={0.8} metalness={0.3} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 10]} />
          <meshStandardMaterial color={C.probe} metalness={0.9} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.3, 12]} />
          <meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.2} />
        </mesh>
      </group>
      <group position={[0.85, 0.1, 0]} rotation={[0, -0.3, 0]}>
        <mesh><boxGeometry args={[0.75, 0.55, 0.12]} /><meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.2} /></mesh>
        <mesh position={[0, 0.08, 0.065]}><planeGeometry args={[0.6, 0.25]} /><meshStandardMaterial color={C.screen} emissive={E.screen} emissiveIntensity={0.3} transparent opacity={0.95} /></mesh>
        {[-0.18, -0.04, 0.1].map((x, i) => (
          <mesh key={i} ref={(el) => { if (el) digits.current[i] = el; }} position={[x, 0.08, 0.075]}>
            <boxGeometry args={[0.075, 0.16, 0.001]} />
            <meshStandardMaterial color={C.signal} emissive={E.screen} emissiveIntensity={1} transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   Leeb – Rebound Hardness
   ════════════════════════════════════════════════════════════════ */
const LeebScene = () => {
  const groupRef  = useRef<THREE.Group>(null);
  const ballRef   = useRef<THREE.Mesh>(null);
  const impRef    = useRef<THREE.Mesh>(null);
  const iLightRef = useRef<THREE.PointLight>(null);
  const digits    = useRef<THREE.Mesh[]>([]);

  useFrame((s, dt) => {
    if (groupRef.current) { groupRef.current.rotation.y += dt * 0.12; groupRef.current.rotation.x = -0.2; }
    if (ballRef.current) {
      const t = (s.clock.elapsedTime * 1.2) % 2.4;
      ballRef.current.position.y = t < 0.4 ? 0.9 - (t / 0.4) * 0.9
        : t < 0.55 ? 0 : Math.sin(((t - 0.55) / 1.85) * Math.PI) * 0.65;
      (ballRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        ballRef.current.position.y < 0.05 ? 3.5 : 0.5;
    }
    if (impRef.current) {
      const t = (s.clock.elapsedTime * 1.2) % 2.4;
      const flash = t >= 0.35 && t <= 0.65 ? 1 : 0;
      (impRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = flash * 4;
      (impRef.current.material as THREE.MeshStandardMaterial).opacity = 0.05 + flash * 0.85;
      if (iLightRef.current) iLightRef.current.intensity = flash * 9;
    }
    digits.current.forEach((m, i) => {
      if (!m) return;
      (m.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1 + Math.sin(s.clock.elapsedTime * 3 + i) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-0.4, -0.6, 0]}>
        <boxGeometry args={[1.7, 0.4, 1.4]} />
        <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh ref={impRef} position={[-0.4, -0.39, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.05, 14]} />
        <meshStandardMaterial color="#886600" emissive={E.xray} emissiveIntensity={0} transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
      <pointLight ref={iLightRef} position={[-0.4, -0.39, 0]} color={E.xray} intensity={0} distance={1.5} />
      <mesh position={[-0.4, 0.55, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.9, 14, 3, true]} />
        <meshStandardMaterial color={C.probe} metalness={0.9} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.4, 1.05, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.12, 14]} />
        <meshStandardMaterial color={C.probe} metalness={0.9} roughness={0.18} />
      </mesh>
      <mesh position={[-0.4, 0.05, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.08, 14]} />
        <meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.2} />
      </mesh>
      <mesh ref={ballRef} position={[-0.4, 0.9, 0]}>
        <sphereGeometry args={[0.075, 12, 10]} />
        <meshStandardMaterial color="#001830" emissive={E.signal} emissiveIntensity={0.5} metalness={0.3} roughness={0.2} />
      </mesh>
      <group position={[0.85, 0.1, 0]} rotation={[0, -0.3, 0]}>
        <mesh><boxGeometry args={[0.7, 0.5, 0.12]} /><meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.2} /></mesh>
        <mesh position={[0, 0.06, 0.065]}><planeGeometry args={[0.55, 0.22]} /><meshStandardMaterial color={C.screen} emissive={E.screen} emissiveIntensity={0.3} transparent opacity={0.95} /></mesh>
        {[-0.16, -0.03, 0.1].map((x, i) => (
          <mesh key={i} ref={(el) => { if (el) digits.current[i] = el; }} position={[x, 0.06, 0.075]}>
            <boxGeometry args={[0.07, 0.14, 0.001]} />
            <meshStandardMaterial color={C.signal} emissive={E.screen} emissiveIntensity={1} transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   Shared secondary scenes
   ════════════════════════════════════════════════════════════════ */
const WeldingSupervisionScene = () => {
  const groupRef  = useRef<THREE.Group>(null);
  const sparkRef  = useRef<THREE.Mesh>(null);
  const aLightRef = useRef<THREE.PointLight>(null);
  useFrame((s, dt) => {
    if (groupRef.current) { groupRef.current.rotation.y += dt * 0.1; groupRef.current.rotation.x = -0.25; }
    if (sparkRef.current) {
      const t = Math.sin(s.clock.elapsedTime * 8) * 0.5 + 0.5;
      (sparkRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + t * 4;
      if (aLightRef.current) aLightRef.current.intensity = 2 + t * 4;
    }
  });
  return (
    <group ref={groupRef}>
      {([0, -0.4] as number[]).map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[2.5, 0.1, 0.8]} />
          <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2.5, 0.7, 0.12]} />
        <meshStandardMaterial color={C.weld} metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[0.3, 0.3, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#220800" emissive={E.orange} emissiveIntensity={0.7} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh ref={sparkRef} position={[0.55, 0.0, 0]}>
        <sphereGeometry args={[0.15, 10, 8]} />
        <meshStandardMaterial color="#331100" emissive={E.xray} emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>
      <pointLight ref={aLightRef} position={[0.55, 0, 0]} color={E.xray} intensity={2} distance={3} />
      <mesh position={[-0.8, 0.2, 0.5]}>
        <boxGeometry args={[0.35, 0.5, 0.03]} />
        <meshStandardMaterial color={C.probe} metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
};

const InspectionScene = ({ accent }: { accent: string }) => {
  const groupRef  = useRef<THREE.Group>(null);
  const scanRef   = useRef<THREE.Mesh>(null);
  const sLightRef = useRef<THREE.PointLight>(null);
  useFrame((s, dt) => {
    if (groupRef.current) { groupRef.current.rotation.y += dt * 0.1; groupRef.current.rotation.x = -0.2; }
    if (scanRef.current) {
      scanRef.current.position.y = Math.sin(s.clock.elapsedTime * 0.5) * 0.4;
      const op = 0.35 + Math.sin(s.clock.elapsedTime * 2) * 0.2;
      (scanRef.current.material as THREE.MeshStandardMaterial).opacity = op;
      (scanRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = op * 3.5;
      if (sLightRef.current) {
        sLightRef.current.position.y = scanRef.current.position.y;
        sLightRef.current.intensity = 1.5 + Math.sin(s.clock.elapsedTime * 2) * 1;
      }
    }
  });
  return (
    <group ref={groupRef}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.7, 0.7, 2.0, 28, 6, true]} />
        <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      {([-1, 1] as number[]).map((px, i) => (
        <mesh key={i} position={[px, 0, 0]} rotation={[0, 0, i === 0 ? Math.PI / 2 : -Math.PI / 2]}>
          <sphereGeometry args={[0.7, 18, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 14, 2, true]} />
        <meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.22} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={scanRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.022, 10, 40]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2} transparent opacity={0.5} />
      </mesh>
      <pointLight ref={sLightRef} position={[0, 0, 0]} color={accent} intensity={1.5} distance={3} />
    </group>
  );
};

const DocumentScene = ({ accent }: { accent: string }) => {
  const groupRef  = useRef<THREE.Group>(null);
  const stampRef  = useRef<THREE.Mesh>(null);
  const sLightRef = useRef<THREE.PointLight>(null);
  useFrame((s, dt) => {
    if (groupRef.current) { groupRef.current.rotation.y += dt * 0.08; groupRef.current.rotation.x = -0.35; }
    if (stampRef.current) {
      (stampRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(s.clock.elapsedTime * 1.5) * 0.4;
      if (sLightRef.current) sLightRef.current.intensity = 1 + Math.sin(s.clock.elapsedTime * 1.5) * 0.8;
    }
  });
  return (
    <group ref={groupRef}>
      {[0, 0.06, 0.12, 0.18].map((y, i) => (
        <mesh key={i} position={[i * 0.03 - 0.05, y - 0.1, i * 0.02]}>
          <boxGeometry args={[1.4, 0.04, 1.8]} />
          <meshStandardMaterial color={i === 3 ? "#001830" : C.probe}
            emissive={i === 3 ? accent : "#000000"} emissiveIntensity={i === 3 ? 0.3 : 0}
            metalness={0.2} roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[-0.75, 0, 0]}>
        <boxGeometry args={[0.08, 0.35, 1.8]} />
        <meshStandardMaterial color="#001828" emissive={accent} emissiveIntensity={0.5} metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh ref={stampRef} position={[0.4, 0.22, -0.3]} rotation={[Math.PI / 2, 0, 0.2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 18]} />
        <meshStandardMaterial color="#001828" emissive={accent} emissiveIntensity={0.5} transparent opacity={0.8} />
      </mesh>
      <pointLight ref={sLightRef} position={[0.4, 0.22, -0.3]} color={accent} intensity={1} distance={2} />
    </group>
  );
};

const ConsultingScene = ({ accent }: { accent: string }) => {
  const groupRef  = useRef<THREE.Group>(null);
  const coreRef   = useRef<THREE.Mesh>(null);
  const pLightRef = useRef<THREE.PointLight>(null);
  useFrame((s, dt) => {
    if (groupRef.current) { groupRef.current.rotation.y += dt * 0.1; groupRef.current.rotation.x = -0.2; }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 2) * 0.1);
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(s.clock.elapsedTime * 1.5) * 0.3;
      if (pLightRef.current) pLightRef.current.intensity = 1.5 + Math.sin(s.clock.elapsedTime * 1.5) * 1;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#001830" emissive={accent} emissiveIntensity={0.5}
          metalness={0.3} roughness={0.4} transparent opacity={0.85} />
      </mesh>
      <pointLight ref={pLightRef} position={[0, 0, 0]} color={accent} intensity={1.5} distance={4} />
      {[0, 1, 2, 3, 4].map(i => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 1.3, z = Math.sin(angle) * 1.3;
        return (
          <group key={i}>
            <mesh position={[x, 0, z]}>
              <octahedronGeometry args={[0.15, 0]} />
              <meshStandardMaterial color={C.probe} emissive={accent} emissiveIntensity={0.4} metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh position={[x / 2, 0, z / 2]} rotation={[0, -angle + Math.PI / 2, 0]}>
              <boxGeometry args={[1.1, 0.008, 0.008]} />
              <meshStandardMaterial color="#001828" emissive={accent} emissiveIntensity={0.3} transparent opacity={0.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const TrainingScene = () => {
  const groupRef  = useRef<THREE.Group>(null);
  const probeRef  = useRef<THREE.Mesh>(null);
  const pLightRef = useRef<THREE.PointLight>(null);
  useFrame((s, dt) => {
    if (groupRef.current) { groupRef.current.rotation.y += dt * 0.1; groupRef.current.rotation.x = -0.3; }
    if (probeRef.current) {
      probeRef.current.position.x = Math.sin(s.clock.elapsedTime * 0.7) * 0.5;
      if (pLightRef.current) pLightRef.current.position.x = probeRef.current.position.x;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[2.0, 0.5, 1.2]} />
        <meshStandardMaterial color={C.steel} metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[1.2, -0.1, 0.3]}>
        <boxGeometry args={[0.4, 0.2, 0.6]} />
        <meshStandardMaterial color={C.probe} metalness={0.88} roughness={0.2} />
      </mesh>
      <mesh ref={probeRef} position={[0, 0.1, 0]}>
        <boxGeometry args={[0.2, 0.15, 0.15]} />
        <meshStandardMaterial color="#1a0030" emissive={E.purple} emissiveIntensity={1} metalness={0.4} roughness={0.3} />
      </mesh>
      <pointLight ref={pLightRef} position={[0, 0.1, 0]} color={E.purple} intensity={2} distance={2} />
      <mesh position={[0, 0.6, 0]}>
        <coneGeometry args={[0.1, 0.3, 8]} />
        <meshStandardMaterial color="#1a0030" emissive={E.purple} emissiveIntensity={0.8} transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   Scene Router
   ════════════════════════════════════════════════════════════════ */
const MethodSceneRouter: React.FC<{ methodId: string }> = ({ methodId }) => {
  switch (methodId) {
    case 'vt':       return <VTScene />;
    case 'pt':       return <PTScene />;
    case 'mt':       return <MTScene />;
    case 'ut':       return <UTScene />;
    case 'utt':      return <UTTScene />;
    case 'lt':       return <LTScene />;
    case 'rt':       return <RTScene />;
    case 'rt-eval':  return <RTEvalScene />;
    case 'uci':      return <UCIScene />;
    case 'leeb':     return <LeebScene />;
    case 'varilni':  return <WeldingSupervisionScene />;
    case 'prevzemi': return <InspectionScene accent="#f97316" />;
    case 'third-party': return <InspectionScene accent="#06b6d4" />;
    case 'vhodna':   return <InspectionScene accent="#3b82f6" />;
    case 'koordinacija': return <ConsultingScene accent="#f97316" />;
    case 'izvedbena': return <DocumentScene accent="#10b981" />;
    case 'proizvodnja': return <WeldingSupervisionScene />;
    case 'varilna-dok': return <DocumentScene accent="#3b82f6" />;
    case 'koncna-dok': return <DocumentScene accent="#06b6d4" />;
    case 'tehnologija': return <ConsultingScene accent="#a855f7" />;
    case 'atest':    return <WeldingSupervisionScene />;
    case 'ndt-svet': return <ConsultingScene accent="#06b6d4" />;
    case 'navodila': return <DocumentScene accent="#a855f7" />;
    case 'uvajanje': return <TrainingScene />;
    default:         return <ConsultingScene accent="#3b82f6" />;
  }
};

/* ════════════════════════════════════════════════════════════════
   Main Component
   ════════════════════════════════════════════════════════════════ */
const MethodIllustrations: React.FC<Props> = ({ methodId, color }) => {
  const videoSrc = serviceVideoMap[methodId];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoOk, setVideoOk]     = useState(false);

  const onEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current && videoOk) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setVideoOk(false));
    }
  }, [videoOk]);

  const onLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Canvas
        camera={{ position: [0, 0.5, 4.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.4;
        }}
      >
        <ambientLight intensity={0.15} color="#c0d0ea" />
        <directionalLight position={[4, 8, 4]}   intensity={2.2} color="#ffffff" />
        <directionalLight position={[-3, 1, -2]}  intensity={0.6} color="#4060b0" />
        <directionalLight position={[0, -4, 2]}   intensity={0.2} color="#1a2840" />
        <Environment preset="warehouse" />
        <fog attach="fog" args={['#06101a', 8, 20]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI * 0.15}
          maxPolarAngle={Math.PI * 0.85}
        />
        <MethodSceneRouter methodId={methodId} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.28} intensity={2.2} radius={0.45} mipmapBlur />
        </EffectComposer>
      </Canvas>

      {videoSrc && (
        <video
          ref={videoRef} src={videoSrc} muted loop playsInline preload="metadata"
          onCanPlay={() => setVideoOk(true)} onError={() => setVideoOk(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered && videoOk ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default MethodIllustrations;
