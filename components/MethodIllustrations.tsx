import React, { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  methodId: string;
  color: string;
}

/* ════════════════════════════════════════════════════════════════
   Video Map — AI-generated videos (hover-to-play, added later)
   ════════════════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════════════════
   VT – Visual Testing: weld + magnifying lens + defect
   ════════════════════════════════════════════════════════════════ */
const VTScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const lensRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.12; groupRef.current.rotation.x = -0.35 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05; }
    if (lensRef.current) { lensRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.8; }
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.2, 0]}><boxGeometry args={[2.8, 0.3, 1.8, 10, 2, 6]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 0.0, 0]}><boxGeometry args={[2.4, 0.12, 0.18, 10, 1, 1]} /><meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.7} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0.4, 0.06, 0]}><boxGeometry args={[0.15, 0.08, 0.2]} /><meshBasicMaterial color="#f97316" transparent opacity={0.85} blending={THREE.AdditiveBlending} /></mesh>
      <group ref={lensRef} position={[0, 0.8, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.3, 0.03, 12, 24]} /><meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.8} blending={THREE.AdditiveBlending} /></mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}><circleGeometry args={[0.28, 24]} /><meshBasicMaterial color="#3b82f6" transparent opacity={0.15} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} /></mesh>
        <mesh position={[0.3, 0.25, 0]} rotation={[0, 0, -0.5]}><cylinderGeometry args={[0.025, 0.025, 0.5, 6]} /><meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.6} blending={THREE.AdditiveBlending} /></mesh>
        <mesh position={[0, -0.4, 0]}><coneGeometry args={[0.25, 0.6, 12, 1, true]} /><meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.2} blending={THREE.AdditiveBlending} /></mesh>
      </group>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   PT – Penetrant Testing: plate + crack + red drops + spray
   ════════════════════════════════════════════════════════════════ */
const PTScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const drop1 = useRef<THREE.Mesh>(null); const drop2 = useRef<THREE.Mesh>(null); const drop3 = useRef<THREE.Mesh>(null);
  const crackRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.12; groupRef.current.rotation.x = -0.35 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05; }
    const animDrop = (ref: React.RefObject<THREE.Mesh | null>, off: number, x: number) => {
      if (!ref.current) return; const t = ((state.clock.elapsedTime * 0.7) + off) % 2.5;
      ref.current.position.set(x, 1.6 - t * 0.9, 0); ref.current.scale.setScalar(t < 2 ? 1 : 0);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1.0 - t * 0.3);
    };
    animDrop(drop1, 0, -0.1); animDrop(drop2, 0.8, 0.05); animDrop(drop3, 1.6, 0.12);
    if (crackRef.current) (crackRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.2, 0]}><boxGeometry args={[2.8, 0.5, 1.8, 10, 2, 6]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 0.05, 0]}><boxGeometry args={[0.04, 0.55, 1.0, 1, 3, 4]} /><meshBasicMaterial color="#0f172a" transparent opacity={0.9} /></mesh>
      <mesh ref={crackRef} position={[0, 0.05, 0]}><boxGeometry args={[0.06, 0.5, 1.0, 1, 2, 4]} /><meshBasicMaterial color="#ef4444" transparent opacity={0.65} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 0.06, 0]}><boxGeometry args={[0.8, 0.02, 1.2, 4, 1, 4]} /><meshBasicMaterial color="#ef4444" transparent opacity={0.25} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 1.8, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.12, 0.25, 8, 1, true]} /><meshBasicMaterial color="#ef4444" wireframe transparent opacity={0.55} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 1.4, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.4, 0.6, 8, 1, true]} /><meshBasicMaterial color="#ef4444" wireframe transparent opacity={0.2} blending={THREE.AdditiveBlending} /></mesh>
      {[drop1, drop2, drop3].map((r, i) => <mesh key={i} ref={r}><sphereGeometry args={[0.05 - i * 0.005, 6, 6]} /><meshBasicMaterial color="#ef4444" transparent opacity={0.8} blending={THREE.AdditiveBlending} /></mesh>)}
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   MT – Magnetic Testing: yoke + field lines + glowing defect
   ════════════════════════════════════════════════════════════════ */
const MTScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const defectRef = useRef<THREE.Mesh>(null);
  const fieldLines = useMemo(() => [0.6, 0.85, 1.1].map(h => {
    const c = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-0.6, 0.4, 0), new THREE.Vector3(0, 0.4 + h, 0), new THREE.Vector3(0.6, 0.4, 0));
    return new THREE.TubeGeometry(c, 20, 0.012, 6, false);
  }), []);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.12; groupRef.current.rotation.x = -0.3 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05; }
    if (defectRef.current) (defectRef.current.material as THREE.MeshBasicMaterial).opacity = 0.7 + Math.sin(state.clock.elapsedTime * 3) * 0.25;
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.2, 0]}><boxGeometry args={[2.8, 0.35, 1.8, 10, 2, 6]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 0, 0]}><boxGeometry args={[0.03, 0.1, 0.5, 1, 1, 2]} /><meshBasicMaterial color="#0f172a" transparent opacity={0.8} /></mesh>
      <mesh ref={defectRef} position={[0, 0.02, 0]}><boxGeometry args={[0.08, 0.06, 0.55, 1, 1, 3]} /><meshBasicMaterial color="#4ade80" transparent opacity={0.85} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[-0.6, 0.5, 0]}><boxGeometry args={[0.2, 0.8, 0.25, 2, 4, 2]} /><meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.6} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0.6, 0.5, 0]}><boxGeometry args={[0.2, 0.8, 0.25, 2, 4, 2]} /><meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.6} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 0.85, 0]}><boxGeometry args={[1.4, 0.15, 0.25, 6, 1, 2]} /><meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.6} blending={THREE.AdditiveBlending} /></mesh>
      {fieldLines.map((g, i) => <mesh key={i} geometry={g}><meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.35 + i * 0.08} blending={THREE.AdditiveBlending} /></mesh>)}
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   UT – Ultrasonic Testing: probe + waves + reflected defect
   ════════════════════════════════════════════════════════════════ */
const UTScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const w1 = useRef<THREE.Mesh>(null); const w2 = useRef<THREE.Mesh>(null); const w3 = useRef<THREE.Mesh>(null); const reflRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.12; groupRef.current.rotation.x = -0.3 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05; }
    const animW = (ref: React.RefObject<THREE.Mesh | null>, off: number) => { if (!ref.current) return; const t = ((state.clock.elapsedTime * 0.8) + off) % 1.5; ref.current.position.y = 0.2 - t * 0.9; const s = 0.3 + t * 0.6; ref.current.scale.set(s, 1, s); (ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.65 - t * 0.3); };
    animW(w1, 0); animW(w2, 0.5); animW(w3, 1.0);
    if (reflRef.current) { const t = ((state.clock.elapsedTime * 0.6) + 0.7) % 2; reflRef.current.position.y = -0.4 + t * 0.5; const s = 0.2 + t * 0.3; reflRef.current.scale.set(s, 1, s); (reflRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.75 - t * 0.25); }
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.5, 0]}><boxGeometry args={[2.4, 1.0, 1.6, 8, 4, 6]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0.1, -0.5, 0]}><sphereGeometry args={[0.12, 8, 6]} /><meshBasicMaterial color="#f97316" transparent opacity={0.75} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 0.2, 0]}><boxGeometry args={[0.35, 0.2, 0.25, 3, 2, 2]} /><meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.7} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.02, 0.02, 0.5, 6]} /><meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      {[w1, w2, w3].map((r, i) => <mesh key={i} ref={r} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.3, 0.015 - i * 0.002, 6, 24]} /><meshBasicMaterial color="#06b6d4" transparent opacity={0.6} blending={THREE.AdditiveBlending} /></mesh>)}
      <mesh ref={reflRef} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.15, 0.012, 6, 20]} /><meshBasicMaterial color="#f97316" transparent opacity={0.65} blending={THREE.AdditiveBlending} /></mesh>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   UTT – Thickness Measurement: pipe cross-section + probe + gauge
   ════════════════════════════════════════════════════════════════ */
const UTTScene = () => {
  const groupRef = useRef<THREE.Group>(null); const pulseRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.12; groupRef.current.rotation.x = -0.3; }
    if (pulseRef.current) { const t = (state.clock.elapsedTime * 1.2) % 2; pulseRef.current.position.y = 0.05 - t * 0.6; (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.7 - t * 0.3); }
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.3, 0]}><boxGeometry args={[2.4, 0.8, 1.6, 8, 4, 6]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.15, 0.18, 0.2, 12, 2]} /><meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.7} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0.8, -0.3, 0.5]}><boxGeometry args={[0.02, 0.8, 0.02]} /><meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.8} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0.8, 0.1, 0.5]} rotation={[0, 0, Math.PI]}><coneGeometry args={[0.06, 0.1, 4]} /><meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.7} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0.8, -0.7, 0.5]}><coneGeometry args={[0.06, 0.1, 4]} /><meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.7} blending={THREE.AdditiveBlending} /></mesh>
      <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.2, 0.01, 6, 20]} /><meshBasicMaterial color="#06b6d4" transparent opacity={0.6} blending={THREE.AdditiveBlending} /></mesh>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   LT – Leak Testing: pressure vessel + escaping particles
   ════════════════════════════════════════════════════════════════ */
const LTScene = () => {
  const groupRef = useRef<THREE.Group>(null); const parts = useRef<THREE.Mesh[]>([]);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.12; groupRef.current.rotation.x = -0.15; }
    parts.current.forEach((p, i) => { if (!p) return; const t = ((state.clock.elapsedTime * 0.5) + i * 0.4) % 2; p.position.set(0.65 + t * 0.6, 0.15 + Math.sin(t * 3 + i) * 0.2, Math.cos(t * 2 + i * 1.5) * 0.15); p.scale.setScalar(Math.max(0, 1 - t * 0.5)); (p.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.85 - t * 0.3); });
  });
  return (
    <group ref={groupRef}>
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.55, 0.55, 2.5, 32, 8, true]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[-1.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}><sphereGeometry args={[0.55, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[1.25, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><sphereGeometry args={[0.55, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0.6, 0.15, 0]}><sphereGeometry args={[0.06, 8, 6]} /><meshBasicMaterial color="#ef4444" transparent opacity={0.8} blending={THREE.AdditiveBlending} /></mesh>
      {[0, 1, 2, 3, 4].map(i => <mesh key={i} ref={el => { if (el) parts.current[i] = el; }}><sphereGeometry args={[0.03, 6, 4]} /><meshBasicMaterial color="#ef4444" transparent opacity={0.5} blending={THREE.AdditiveBlending} /></mesh>)}
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   RT – Radiographic Testing: X-ray source → beam → plate → film
   ════════════════════════════════════════════════════════════════ */
const RTScene = () => {
  const groupRef = useRef<THREE.Group>(null); const beamRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.12; groupRef.current.rotation.x = -0.25 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05; }
    if (beamRef.current) (beamRef.current.material as THREE.MeshBasicMaterial).opacity = 0.18 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, 1.3, 0]}><boxGeometry args={[0.4, 0.3, 0.3, 3, 2, 2]} /><meshBasicMaterial color="#eab308" wireframe transparent opacity={0.65} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 1.1, 0]}><sphereGeometry args={[0.06, 8, 6]} /><meshBasicMaterial color="#eab308" transparent opacity={0.7} blending={THREE.AdditiveBlending} /></mesh>
      <mesh ref={beamRef} position={[0, 0.3, 0]}><coneGeometry args={[1.2, 1.6, 12, 4, true]} /><meshBasicMaterial color="#eab308" wireframe transparent opacity={0.2} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, -0.2, 0]}><boxGeometry args={[2.0, 0.25, 1.4, 8, 1, 6]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0.2, -0.2, 0]}><sphereGeometry args={[0.1, 6, 6]} /><meshBasicMaterial color="#eab308" transparent opacity={0.65} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, -0.7, 0]}><boxGeometry args={[2.2, 0.05, 1.6, 8, 1, 6]} /><meshBasicMaterial color="#a3a3a3" wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   RT-eval – Film evaluation: lightbox + film + loupe
   ════════════════════════════════════════════════════════════════ */
const RTEvalScene = () => {
  const groupRef = useRef<THREE.Group>(null); const loupeRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.1; groupRef.current.rotation.x = -0.3; }
    if (loupeRef.current) { loupeRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.5; loupeRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.2; }
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 8, 0, 0]}><boxGeometry args={[2.5, 1.5, 0.4, 6, 4, 2]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, -0.2, 0.21]} rotation={[-Math.PI / 8, 0, 0]}><planeGeometry args={[2.2, 1.2]} /><meshBasicMaterial color="#eab308" transparent opacity={0.15} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, -0.15, 0.25]} rotation={[-Math.PI / 8, 0, 0]}><planeGeometry args={[1.8, 0.4, 12, 2]} /><meshBasicMaterial color="#a3a3a3" wireframe transparent opacity={0.6} blending={THREE.AdditiveBlending} /></mesh>
      <group ref={loupeRef} position={[0, 0.2, 0.4]} rotation={[-Math.PI / 8, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 0.3, 16, 2, true]} /><meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.8} blending={THREE.AdditiveBlending} /></mesh>
      </group>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   UCI – Hardness (UCI): diamond indenter pressing into surface
   ════════════════════════════════════════════════════════════════ */
const UCIScene = () => {
  const groupRef = useRef<THREE.Group>(null); const indRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.12; groupRef.current.rotation.x = -0.3; }
    if (indRef.current) { const t = (state.clock.elapsedTime * 0.6) % 2; indRef.current.position.y = t < 1 ? 0.6 - t * 0.4 : 0.2 + (t - 1) * 0.4; }
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.3, 0]}><boxGeometry args={[2.4, 0.6, 1.6, 8, 3, 6]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, Math.PI / 4]}><coneGeometry args={[0.1, 0.08, 4]} /><meshBasicMaterial color="#3b82f6" transparent opacity={0.5} blending={THREE.AdditiveBlending} /></mesh>
      <group ref={indRef} position={[0, 0.6, 0]}>
        <mesh rotation={[Math.PI, 0, Math.PI / 4]}><coneGeometry args={[0.12, 0.35, 4, 4]} /><meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.7} blending={THREE.AdditiveBlending} /></mesh>
        <mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.1, 0.12, 0.4, 8, 2]} /><meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.55} blending={THREE.AdditiveBlending} /></mesh>
      </group>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   Leeb – Hardness (Leeb): impact body bouncing
   ════════════════════════════════════════════════════════════════ */
const LeebScene = () => {
  const groupRef = useRef<THREE.Group>(null); const ballRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.12; groupRef.current.rotation.x = -0.2; }
    if (ballRef.current) { const t = (state.clock.elapsedTime * 1.5) % 2; ballRef.current.position.y = t < 0.5 ? 1.0 - (t / 0.5) * 0.9 : 0.1 + Math.sin(((t - 0.5) / 1.5) * Math.PI) * 0.7; }
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[1.2, 1.2, 0.8, 16, 4]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.2, 0.2, 1.2, 12, 4, true]} /><meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.3} blending={THREE.AdditiveBlending} /></mesh>
      <mesh ref={ballRef} position={[0, 1, 0]}><sphereGeometry args={[0.1, 8, 8]} /><meshBasicMaterial color="#3b82f6" transparent opacity={0.9} blending={THREE.AdditiveBlending} /></mesh>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   NADZORI = Welding Supervision / Inspection scenes
   ════════════════════════════════════════════════════════════════ */
const WeldingSupervisionScene = () => {
  const groupRef = useRef<THREE.Group>(null); const sparkRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.1; groupRef.current.rotation.x = -0.25; }
    if (sparkRef.current) (sparkRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(state.clock.elapsedTime * 8) * 0.3;
  });
  return (
    <group ref={groupRef}>
      {/* I-beam structure */}
      <mesh position={[0, 0, 0]}><boxGeometry args={[2.5, 0.1, 0.8, 8, 1, 3]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, -0.4, 0]}><boxGeometry args={[2.5, 0.1, 0.8, 8, 1, 3]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[0, -0.2, 0]}><boxGeometry args={[2.5, 0.7, 0.12, 8, 3, 1]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.35} blending={THREE.AdditiveBlending} /></mesh>
      {/* Welding torch */}
      <mesh position={[0.3, 0.3, 0]} rotation={[0, 0, -0.4]}><cylinderGeometry args={[0.04, 0.04, 0.8, 6]} /><meshBasicMaterial color="#f97316" wireframe transparent opacity={0.7} blending={THREE.AdditiveBlending} /></mesh>
      {/* Arc/spark glow */}
      <mesh ref={sparkRef} position={[0.55, 0.0, 0]}><sphereGeometry args={[0.15, 8, 8]} /><meshBasicMaterial color="#fbbf24" transparent opacity={0.6} blending={THREE.AdditiveBlending} /></mesh>
      {/* Inspector clipboard */}
      <mesh position={[-0.8, 0.2, 0.5]}><boxGeometry args={[0.35, 0.5, 0.03, 2, 3, 1]} /><meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.6} blending={THREE.AdditiveBlending} /></mesh>
    </group>
  );
};

const InspectionScene = ({ accent }: { accent: string }) => {
  const groupRef = useRef<THREE.Group>(null); const scanRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.1; groupRef.current.rotation.x = -0.2; }
    if (scanRef.current) { scanRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.4; (scanRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.15; }
  });
  return (
    <group ref={groupRef}>
      {/* Pressure vessel */}
      <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.7, 0.7, 2.0, 24, 6, true]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 2]}><sphereGeometry args={[0.7, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.35} blending={THREE.AdditiveBlending} /></mesh>
      <mesh position={[1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><sphereGeometry args={[0.7, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.35} blending={THREE.AdditiveBlending} /></mesh>
      {/* Nozzle */}
      <mesh position={[0, 0.7, 0]}><cylinderGeometry args={[0.15, 0.15, 0.4, 12, 2, true]} /><meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} /></mesh>
      {/* Scanning ring */}
      <mesh ref={scanRef} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.85, 0.02, 8, 32]} /><meshBasicMaterial color={accent} transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   KAKOVOST = Documentation / Quality scenes
   ════════════════════════════════════════════════════════════════ */
const DocumentScene = ({ accent }: { accent: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.08; groupRef.current.rotation.x = -0.35; }
  });
  return (
    <group ref={groupRef}>
      {/* Document pages stack */}
      {[0, 0.06, 0.12, 0.18].map((y, i) => (
        <mesh key={i} position={[i * 0.03 - 0.05, y - 0.1, i * 0.02]}>
          <boxGeometry args={[1.4, 0.04, 1.8, 6, 1, 8]} />
          <meshBasicMaterial color={i === 3 ? accent : "#64748b"} wireframe transparent opacity={0.3 + i * 0.1} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
      {/* Folder/binder spine */}
      <mesh position={[-0.75, 0, 0]}><boxGeometry args={[0.08, 0.35, 1.8, 1, 2, 6]} /><meshBasicMaterial color={accent} wireframe transparent opacity={0.6} blending={THREE.AdditiveBlending} /></mesh>
      {/* Stamp/seal */}
      <mesh position={[0.4, 0.22, -0.3]} rotation={[Math.PI / 2, 0, 0.2]}><cylinderGeometry args={[0.2, 0.2, 0.05, 16]} /><meshBasicMaterial color={accent} transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   SVETOVANJE = Consulting / engineering scenes
   ════════════════════════════════════════════════════════════════ */
const ConsultingScene = ({ accent }: { accent: string }) => {
  const groupRef = useRef<THREE.Group>(null); const pulseRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.1; groupRef.current.rotation.x = -0.2; }
    if (pulseRef.current) { pulseRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1); (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15; }
  });
  return (
    <group ref={groupRef}>
      {/* Central knowledge node */}
      <mesh ref={pulseRef}><icosahedronGeometry args={[0.5, 1]} /><meshBasicMaterial color={accent} wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
      {/* Connection lines to sub-nodes */}
      {[0, 1, 2, 3, 4].map(i => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 1.3; const z = Math.sin(angle) * 1.3;
        return (
          <group key={i}>
            <mesh position={[x, 0, z]}><octahedronGeometry args={[0.15, 0]} /><meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} /></mesh>
            <mesh position={[x / 2, 0, z / 2]} rotation={[0, -angle + Math.PI / 2, 0]}><boxGeometry args={[1.1, 0.01, 0.01]} /><meshBasicMaterial color={accent} transparent opacity={0.25} blending={THREE.AdditiveBlending} /></mesh>
          </group>
        );
      })}
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   Training Scene — Mentor + practice specimen
   ════════════════════════════════════════════════════════════════ */
const TrainingScene = () => {
  const groupRef = useRef<THREE.Group>(null); const probeRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (groupRef.current) { groupRef.current.rotation.y += delta * 0.1; groupRef.current.rotation.x = -0.3; }
    if (probeRef.current) probeRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.5;
  });
  return (
    <group ref={groupRef}>
      {/* Practice weld specimen */}
      <mesh position={[0, -0.3, 0]}><boxGeometry args={[2.0, 0.5, 1.2, 8, 2, 4]} /><meshBasicMaterial color="#64748b" wireframe transparent opacity={0.45} blending={THREE.AdditiveBlending} /></mesh>
      {/* Reference test block */}
      <mesh position={[1.2, -0.1, 0.3]}><boxGeometry args={[0.4, 0.2, 0.6, 2, 1, 3]} /><meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
      {/* Moving probe */}
      <mesh ref={probeRef} position={[0, 0.1, 0]}><boxGeometry args={[0.2, 0.15, 0.15]} /><meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.7} blending={THREE.AdditiveBlending} /></mesh>
      {/* Guiding hand indicator (arrow) */}
      <mesh position={[0, 0.6, 0]}><coneGeometry args={[0.1, 0.3, 6]} /><meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} /></mesh>
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════
   Scene Router — Every service gets its own scene
   ════════════════════════════════════════════════════════════════ */
const MethodSceneRouter: React.FC<{ methodId: string }> = ({ methodId }) => {
  switch (methodId) {
    // NDT
    case 'vt': return <VTScene />;
    case 'pt': return <PTScene />;
    case 'mt': return <MTScene />;
    case 'ut': return <UTScene />;
    case 'utt': return <UTTScene />;
    case 'lt': return <LTScene />;
    case 'rt': return <RTScene />;
    case 'rt-eval': return <RTEvalScene />;
    case 'uci': return <UCIScene />;
    case 'leeb': return <LeebScene />;
    // Nadzori
    case 'varilni': return <WeldingSupervisionScene />;
    case 'prevzemi': return <InspectionScene accent="#f97316" />;
    case 'third-party': return <InspectionScene accent="#06b6d4" />;
    case 'vhodna': return <InspectionScene accent="#3b82f6" />;
    case 'koordinacija': return <ConsultingScene accent="#f97316" />;
    // Kakovost
    case 'izvedbena': return <DocumentScene accent="#10b981" />;
    case 'proizvodnja': return <WeldingSupervisionScene />;
    case 'varilna-dok': return <DocumentScene accent="#3b82f6" />;
    case 'koncna-dok': return <DocumentScene accent="#06b6d4" />;
    // Svetovanje
    case 'tehnologija': return <ConsultingScene accent="#a855f7" />;
    case 'atest': return <WeldingSupervisionScene />;
    case 'ndt-svet': return <ConsultingScene accent="#06b6d4" />;
    case 'navodila': return <DocumentScene accent="#a855f7" />;
    case 'uvajanje': return <TrainingScene />;
    default: return <ConsultingScene accent="#3b82f6" />;
  }
};

/* ════════════════════════════════════════════════════════════════
   Main Component — 3D scene + video overlay on hover
   ════════════════════════════════════════════════════════════════ */
const MethodIllustrations: React.FC<Props> = ({ methodId, color }) => {
  const videoSrc = serviceVideoMap[methodId];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoOk, setVideoOk] = useState(false);

  const onEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current && videoOk) { videoRef.current.currentTime = 0; videoRef.current.play().catch(() => setVideoOk(false)); }
  }, [videoOk]);

  const onLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {/* 3D Scene (always rendered) */}
      <Canvas camera={{ position: [0, 0.5, 4.2], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} />
        <pointLight position={[-10, -10, -5]} intensity={1.0} color="#a855f7" />
        <fog attach="fog" args={['#0f172a', 8, 18]} />
        <MethodSceneRouter methodId={methodId} />
      </Canvas>

      {/* Video overlay — fades in on hover when available */}
      {videoSrc && (
        <video
          ref={videoRef} src={videoSrc} muted loop playsInline preload="metadata"
          onCanPlay={() => setVideoOk(true)} onError={() => setVideoOk(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered && videoOk ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default MethodIllustrations;
