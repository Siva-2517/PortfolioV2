"use client";

import { useEffect, useRef, useState } from "react";

interface Atom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Drifting atoms (particles)
    const atomsCount = 50;
    const atoms: Atom[] = [];
    
    // Theme colors for atoms
    const atomColors = [
      "rgba(108, 92, 231, 0.25)", // Indigo
      "rgba(255, 107, 91, 0.25)",  // Coral
      "rgba(156, 153, 171, 0.18)" // Muted grey
    ];

    for (let i = 0; i < atomsCount; i++) {
      atoms.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // Drifting atoms
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 1, // 1px to 3px
        color: atomColors[Math.floor(Math.random() * atomColors.length)]
      });
    }

    // Handle resizing
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let lastTime = performance.now();
    const fpsInterval = 1000 / 30; // Throttled to 30 FPS for smooth background performance

    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);

      const elapsed = timestamp - lastTime;

      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, width, height);

        // 1. Draw connecting synapse lines between close atoms
        for (let i = 0; i < atomsCount; i++) {
          for (let j = i + 1; j < atomsCount; j++) {
            const dx = atoms[i].x - atoms[j].x;
            const dy = atoms[i].y - atoms[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              const alpha = (1 - dist / 100) * 0.08;
              ctx.strokeStyle = `rgba(108, 92, 231, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(atoms[i].x, atoms[i].y);
              ctx.lineTo(atoms[j].x, atoms[j].y);
              ctx.stroke();
            }
          }
        }

        // 2. Draw and update atoms
        for (let i = 0; i < atomsCount; i++) {
          const a = atoms[i];

          ctx.fillStyle = a.color;
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
          ctx.fill();

          // Move
          a.x += a.vx;
          a.y += a.vy;

          // Wrap borders
          if (a.x < -10) a.x = width + 10;
          if (a.x > width + 10) a.x = -10;
          if (a.y < -10) a.y = height + 10;
          if (a.y > height + 10) a.y = -10;
        }
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [mounted, prefersReducedMotion]);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none bg-transparent"
    />
  );
}
