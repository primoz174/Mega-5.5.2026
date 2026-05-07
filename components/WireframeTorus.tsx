import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const shapes = [
  { id: 'default', geom: <torusGeometry args={[1, 0.33, 64, 128]} />, color: '#3b82f6', speed: 0.1, rotX: 0 },
  { id: 'ndt', geom: <cylinderGeometry args={[0.8, 0.8, 2.5, 64, 32, true]} />, color: '#3b82f6', speed: 0.15, rotX: Math.PI / 4 }, 
  { id: 'nadzori', geom: <sphereGeometry args={[1.2, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />, color: '#f97316', speed: 0.2, rotX: Math.PI / 6 }, // Geodesic Dome / Overarching Shield
  { id: 'qa', geom: <boxGeometry args={[1.3, 1.3, 1.3, 24, 24, 24]} />, color: '#10b981', speed: 0.1, rotX: Math.PI / 4 }, // Precision Cube
  { id: 'svetovanje', geom: <torusKnotGeometry args={[0.75, 0.2, 200, 32]} />, color: '#a855f7', speed: 0.12, rotX: 0 }, // Brain / Connectivity
];

// Reusable animated scan beam for NDT
const NdtBeam = ({ opacityRef }: { opacityRef: React.MutableRefObject<number> }) => {
  const beamRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  
  useFrame((state) => {
    if (!beamRef.current || !materialRef.current) return;
    
    // Zelo počasno, stalno in umirjeno drsenje po dolžini cevi (brez preskokov in mežikanja)
    const t = state.clock.elapsedTime * 0.4;
    beamRef.current.position.y = Math.sin(t) * 1.2; 
    
    // Povežemo prosojnost z glavno mrežo, BREZ pulziranja (konstantna, mehka navzočnost)
    const parentOpacity = opacityRef.current;
    
    // Obroč je malenkost bolj nežen/temen kot glavna mreža za izredno subtilen vtis
    materialRef.current.opacity = parentOpacity * 0.9;
    
    beamRef.current.visible = materialRef.current.opacity > 0.01;
  });

  return (
    <mesh ref={beamRef} rotation={[Math.PI / 2, 0, 0]}>
      {/* Izjemno tanek, nežen 'O-ring' (obroček), nanešen točno na obod cevi (0.8) */}
      <torusGeometry args={[0.8, 0.005, 16, 64]} />
      <meshBasicMaterial 
        ref={materialRef}
        color="#38bdf8" 
        transparent 
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

interface ShapeMeshProps {
  shapeData: any;
  activeId: string | null;
  radius: number;
}

const ShapeMesh = ({ shapeData, activeId, radius }: ShapeMeshProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const colorObj = useRef(new THREE.Color(shapeData.color));
  
  // Track opacity in a ref so children (like NdtBeam) can read it efficiently
  const currentOpacity = useRef<number>(0);
  
  const isActive = activeId === null ? shapeData.id === 'default' : shapeData.id === activeId;

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current || !glowMeshRef.current || !materialRef.current || !glowMaterialRef.current) return;
    
    const speedMultiplier = isActive ? 1.5 : 0.5;
    groupRef.current.rotation.z -= delta * (shapeData.speed * speedMultiplier);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, shapeData.rotX, 0.02);
    groupRef.current.rotation.y += delta * (shapeData.speed * 0.5 * speedMultiplier);

    const pulse = isActive ? Math.sin(state.clock.elapsedTime * 4) * 0.05 : 0;
    const targetScaleVal = isActive ? radius + pulse : radius * 0.5;
    
    // Base mesh gets regular scale, glow mesh gets slightly larger scale for bloom
    const targetScale = new THREE.Vector3(targetScaleVal, targetScaleVal, targetScaleVal);
    const targetGlowScale = new THREE.Vector3(targetScaleVal * 1.05, targetScaleVal * 1.05, targetScaleVal * 1.05);

    meshRef.current.scale.lerp(targetScale, 0.12);
    glowMeshRef.current.scale.lerp(targetGlowScale, 0.12);
    
    // Increased base opacity for more punch, high opacity for glow but blended
    const targetOpacity = isActive ? 0.6 : 0;
    
    currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, targetOpacity, 0.15);
    materialRef.current.opacity = currentOpacity.current;
    
    // The glow is more intense but softer (simulating bloom)
    glowMaterialRef.current.opacity = currentOpacity.current * 0.4;
    
    const isVisible = currentOpacity.current > 0.01;
    meshRef.current.visible = isVisible;
    glowMeshRef.current.visible = isVisible;
  });

  return (
    <group ref={groupRef}>
      {/* Primary wireframe */}
      <mesh ref={meshRef}>
        {shapeData.geom}
        <meshBasicMaterial 
          ref={materialRef}
          color={colorObj.current}
          wireframe={true} 
          transparent={true} 
          opacity={0} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Holographic bloom/glow layer */}
      <mesh ref={glowMeshRef}>
        {shapeData.geom}
        <meshBasicMaterial 
          ref={glowMaterialRef}
          color={colorObj.current}
          wireframe={true} 
          transparent={true} 
          opacity={0} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {shapeData.id === 'ndt' && <NdtBeam opacityRef={currentOpacity} />}
    </group>
  );
};

const TorusScene = ({ activeId, single = false }: { activeId: string | null, single?: boolean }) => {
  const { viewport } = useThree();
  const minDim = Math.min(viewport.width, viewport.height);
  const radius = minDim * 0.31;

  const filteredShapes = single && activeId 
    ? shapes.filter(s => s.id === activeId) 
    : shapes;

  return (
    <>
      {!single && <fog attach="fog" args={['#000000', 35, 65]} />}
      {filteredShapes.map(shape => (
        <ShapeMesh 
          key={shape.id} 
          shapeData={shape} 
          activeId={single ? shape.id : activeId} 
          radius={radius} 
        />
      ))}
    </>
  );
};

export default function WireframeTorus({ activeId = null, isDarkened = false, single = false }: { activeId?: string | null, isDarkened?: boolean, single?: boolean }) {
  return (
    <div className={`w-full h-full pointer-events-none transition-opacity duration-1000 ${isDarkened ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
      <Canvas camera={{ position: [0, 0, 45], fov: 15 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: 'low-power', stencil: false }}>
        {/* Subtle ambient light just in case */}
        <ambientLight intensity={0.5} />
        <TorusScene activeId={activeId} single={single} />
      </Canvas>
    </div>
  );
}
