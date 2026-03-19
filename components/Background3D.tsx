"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMotion } from "./motion-provider";
import * as THREE from "three";

function StarBackground(props: object) {
  const ref = useRef<THREE.Points>(null);
  const { isMotionEnabled } = useMotion();
  const [sphere, setSphere] = useState<Float32Array | null>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const count = 3000;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 1.5 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      setSphere(positions);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (ref.current && isMotionEnabled) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  if (!sphere) return null;

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#3ecf8e"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

export function Background3D() {
  return (
    <div className="absolute inset-0 z-[-1] bg-[#000000]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarBackground />
      </Canvas>
    </div>
  );
}
