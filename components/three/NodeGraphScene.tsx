"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic Pseudo-Random Number Generator (LCG)
function createLcg(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// 10 Deterministic nodes in a sphere of radius 2.2
const NODES: [number, number, number][] = (() => {
  const lcg = createLcg(1337); // Seed
  const coords: [number, number, number][] = [];
  for (let i = 0; i < 10; i++) {
    const theta = lcg() * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * lcg() - 1.0);
    const r = 0.6 + lcg() * 1.5; // Radius between 0.6 and 2.1
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    coords.push([x, y, z]);
  }
  return coords;
})();

// 15 Deterministic edges connecting nodes
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 5],
  [2, 6], [3, 7], [4, 7], [5, 8], [6, 8],
  [7, 9], [8, 9], [3, 5], [4, 6], [1, 2]
];

function NodeGraphContent({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const { invalidate } = useThree();
  const tiltGroupRef = useRef<THREE.Group>(null);
  const rotateGroupRef = useRef<THREE.Group>(null);
  
  // Track pulses
  // Store active status, current progress, edge index
  const pulsesState = useRef([
    { active: false, progress: 0, edgeIndex: 0, cooldown: 0 },
    { active: false, progress: 0, edgeIndex: 0, cooldown: 1.5 },
    { active: false, progress: 0, edgeIndex: 0, cooldown: 3.0 }
  ]);

  const pulseRefs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null)
  ];

  useFrame((state, delta) => {
    // Cap delta to prevent massive jumps when tab is inactive
    const d = Math.min(delta, 0.1);
    let needsRender = false;

    // 1. Slow continuous rotation (1 full rotation every ~50 seconds)
    if (rotateGroupRef.current && !prefersReducedMotion) {
      rotateGroupRef.current.rotation.y += d * (2 * Math.PI / 50);
      needsRender = true;
    }

    // 2. Parallax mouse tilt (max 8 degrees / ~0.14 rads)
    if (tiltGroupRef.current && !prefersReducedMotion) {
      const targetX = state.pointer.y * 0.14;
      const targetY = state.pointer.x * 0.14;
      tiltGroupRef.current.rotation.x = THREE.MathUtils.lerp(tiltGroupRef.current.rotation.x, targetX, 0.05);
      tiltGroupRef.current.rotation.y = THREE.MathUtils.lerp(tiltGroupRef.current.rotation.y, targetY, 0.05);
      needsRender = true;
    }

    // 3. Traveling signal pulses
    pulsesState.current.forEach((pulse, idx) => {
      const pulseMesh = pulseRefs[idx].current;

      if (pulse.active) {
        pulse.progress += d / 1.5; // 1.5 seconds travel time
        needsRender = true;

        if (pulse.progress >= 1) {
          pulse.active = false;
          pulse.progress = 0;
          pulse.cooldown = 1.0 + Math.random() * 3.0; // Wait 1-4s to fire again
          if (pulseMesh) pulseMesh.visible = false;
        } else {
          // Calculate interpolated position
          const edge = EDGES[pulse.edgeIndex];
          const start = NODES[edge[0]];
          const end = NODES[edge[1]];

          if (pulseMesh) {
            pulseMesh.position.x = start[0] + (end[0] - start[0]) * pulse.progress;
            pulseMesh.position.y = start[1] + (end[1] - start[1]) * pulse.progress;
            pulseMesh.position.z = start[2] + (end[2] - start[2]) * pulse.progress;
            pulseMesh.visible = true;
          }
        }
      } else {
        if (pulseMesh) pulseMesh.visible = false;

        if (!prefersReducedMotion) {
          pulse.cooldown -= d;
          if (pulse.cooldown <= 0) {
            pulse.active = true;
            pulse.progress = 0;
            pulse.edgeIndex = Math.floor(Math.random() * EDGES.length);
          }
        }
      }
    });

    if (needsRender) {
      invalidate();
    }
  });

  return (
    <group ref={tiltGroupRef}>
      <group ref={rotateGroupRef}>
        {/* Render edges */}
        {EDGES.map((edge, idx) => {
          const start = NODES[edge[0]];
          const end = NODES[edge[1]];
          const points = [
            new THREE.Vector3(...start),
            new THREE.Vector3(...end)
          ];
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <line key={`edge-${idx}`}>
              <primitive object={lineGeometry} attach="geometry" />
              <lineBasicMaterial
                color="#6C5CE7"
                transparent
                opacity={0.15}
                linewidth={1}
              />
            </line>
          );
        })}

        {/* Render nodes */}
        {NODES.map((pos, idx) => (
          <mesh key={`node-${idx}`} position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#6C5CE7" />
          </mesh>
        ))}

        {/* Render pulse dots */}
        {pulseRefs.map((ref, idx) => (
          <mesh key={`pulse-${idx}`} ref={ref} visible={false}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#FF6B5B" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function NodeGraphScene() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full h-full fixed inset-0 -z-10 bg-transparent overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 60 }}
        dpr={[1, 1.5]}
        frameloop="demand"
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 3, -2]} intensity={1.5} color="#FF6B5B" />
        <pointLight position={[-2, -3, 2]} intensity={1.0} color="#6C5CE7" />
        
        <Suspense fallback={null}>
          <NodeGraphContent prefersReducedMotion={prefersReducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
