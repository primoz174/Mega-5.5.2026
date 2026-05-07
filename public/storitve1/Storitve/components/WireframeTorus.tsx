import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const TorusMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Calculate radius based on viewport to match HTML orbitRadius (35% of min dimension)
  const minDim = Math.min(viewport.width, viewport.height);
  const radius = minDim * 0.35;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z -= delta * 0.05;
      // Smoothly update scale to avoid jitter during resize
      const targetScale = new THREE.Vector3(radius, radius, radius);
      meshRef.current.scale.lerp(targetScale, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]} scale={radius}>
      {/* Base geometry with radius 1, tube 0.33 */}
      <torusGeometry args={[1, 0.33, 80, 200]} />
      <meshBasicMaterial 
        color="#3b82f6" 
        wireframe={true} 
        transparent={true} 
        opacity={0.25} 
      />
    </mesh>
  );
};

export default function WireframeTorus() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <fog attach="fog" args={['#020617', 8, 16]} />
        <TorusMesh />
      </Canvas>
    </div>
  );
}
