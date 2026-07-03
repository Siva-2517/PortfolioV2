"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Pulse {
  startIdx: number;
  endIdx: number;
  startTime: number;
}

export default function LivingNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize 42 particles (slightly denser for a richer look)
    const particleCount = 42;
    const particles: Particle[] = [];

    // Use a fixed seed LCG generator for deterministic layout when frozen (reduced motion)
    let seed = 42;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const rng = prefersReducedMotion ? random : Math.random;

    for (let i = 0; i < particleCount; i++) {
      // Small random velocity: -0.35 to 0.35 px per frame
      const vx = (rng() - 0.5) * 0.7; 
      const vy = (rng() - 0.5) * 0.7;

      particles.push({
        x: rng() * width,
        y: rng() * height,
        vx,
        vy,
        radius: 3.2 // Larger particles (3.2px instead of 2.0px)
      });
    }

    // Active pulses list (max 3)
    const pulses: Pulse[] = [];
    let lastPulseTime = 0;
    const pulseIntervalMin = 1200; // ms
    const pulseIntervalMax = 1500; // ms
    let nextPulseDelay = pulseIntervalMin + Math.random() * (pulseIntervalMax - pulseIntervalMin);

    // Handle resizing
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // If prefers reduced motion, redraw the static frame immediately on resize
      if (prefersReducedMotion) {
        drawStaticFrame();
      }
    };
    window.addEventListener("resize", handleResize);

    // Draw static frame for prefers-reduced-motion
    const drawStaticFrame = () => {
      ctx.fillStyle = "#0A0A0F";
      ctx.fillRect(0, 0, width, height);

      // Draw connection lines with neon indigo shadow glow (wider threshold: 115px)
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(108, 92, 231, 0.45)";
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.85; // Closer = higher opacity (up to 0.85)
            ctx.strokeStyle = `rgba(108, 92, 231, ${alpha})`;
            ctx.lineWidth = 0.85; // Thicker lines
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles on top with glowing neon shadows
      ctx.fillStyle = "rgba(140, 125, 255, 0.98)";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#6C5CE7";
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset shadow settings
      ctx.shadowBlur = 0;
    };

    // Main animation loop
    const animate = (timestamp: number) => {
      // Clear and redraw full canvas with the canvas background color (#0A0A0F)
      ctx.fillStyle = "#0A0A0F";
      ctx.fillRect(0, 0, width, height);

      // Store current connected pairs to choose from for pulses
      const connectedPairs: [number, number][] = [];

      // 1. Draw connections with glowing neon paths (wider threshold: 115px)
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(108, 92, 231, 0.45)";
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            connectedPairs.push([i, j]);
            const alpha = (1 - dist / 115) * 0.85; // Closer = higher opacity (up to 0.85)
            ctx.strokeStyle = `rgba(108, 92, 231, ${alpha})`;
            ctx.lineWidth = 0.85; // Thicker connections
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Spawn pulses
      if (timestamp - lastPulseTime > nextPulseDelay) {
        if (connectedPairs.length > 0 && pulses.length < 3) {
          const pair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
          pulses.push({
            startIdx: pair[0],
            endIdx: pair[1],
            startTime: timestamp
          });
          lastPulseTime = timestamp;
          nextPulseDelay = pulseIntervalMin + Math.random() * (pulseIntervalMax - pulseIntervalMin);
        }
      }

      // 3. Draw and update pulses with neon coral glow shadows (larger size: 3.5px)
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#FF6B5B";
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const elapsed = timestamp - p.startTime;
        const progress = Math.min(elapsed / 1100, 1); // 1.1s duration

        const start = particles[p.startIdx];
        const end = particles[p.endIdx];

        // If particles wrapped or drift too far apart, cancel the pulse to prevent speed-jump
        const dx = start.x - end.x;
        const dy = start.y - end.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (progress >= 1 || dist > 140) {
          pulses.splice(i, 1);
          continue;
        }

        // Interpolate current position
        const px = start.x + (end.x - start.x) * progress;
        const py = start.y + (end.y - start.y) * progress;

        ctx.fillStyle = "#FF6B5B"; // accent-coral
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2); // Larger pulse
        ctx.fill();
      }

      // 4. Update and draw particles with neon indigo shadows (larger size: 3.2px)
      ctx.fillStyle = "rgba(140, 125, 255, 0.98)"; // lighter/brighter indigo
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#6C5CE7";
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edge
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset shadows for next frame drawing elements
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    if (prefersReducedMotion) {
      drawStaticFrame();
    } else {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mounted, prefersReducedMotion]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-30 pointer-events-none bg-[#0A0A0F]"
    />
  );
}
