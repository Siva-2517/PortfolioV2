"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking
  const mousePos = useRef({ x: -200, y: -200 });
  const pointsRef = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const ripplesRef = useRef<Array<{ id: number; x: number; y: number; t: number }>>([]);
  const isMouseInWindow = useRef(false);
  
  // Animation state
  const coreDotRadius = useRef(2.5);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const checkActivation = () => {
      const fine = pointerQuery.matches;
      const reduced = reducedMotionQuery.matches;
      setReducedMotion(reduced);
      
      if (fine) {
        setEnabled(true);
        // Respect prefers-reduced-motion by restoring native cursor for accessibility
        document.body.style.cursor = reduced ? "auto" : "none";
      } else {
        setEnabled(false);
        document.body.style.cursor = "auto";
      }
    };

    checkActivation();
    pointerQuery.addEventListener("change", checkActivation);
    reducedMotionQuery.addEventListener("change", checkActivation);

    return () => {
      pointerQuery.removeEventListener("change", checkActivation);
      reducedMotionQuery.removeEventListener("change", checkActivation);
      document.body.style.cursor = "auto";
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      isMouseInWindow.current = true;

      if (!reducedMotion) {
        pointsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          t: performance.now(),
        });
        
        // Keep slightly more points in raw array to ensure smooth filter and cap
        if (pointsRef.current.length > 30) {
          pointsRef.current.shift();
        }
      }
    };

    const handleMouseLeave = () => {
      isMouseInWindow.current = false;
    };

    const handleMouseEnter = () => {
      isMouseInWindow.current = true;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest("a, button, [role='button'], input, select, textarea, .glass-card")) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest("a, button, [role='button'], input, select, textarea, .glass-card")) {
        setIsHovered(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const now = performance.now();
      ripplesRef.current.push({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        t: now,
      });
      // Cap at 10 active ripples
      if (ripplesRef.current.length > 10) {
        ripplesRef.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("click", handleClick);

    const drawSegment = (
      ctx: CanvasRenderingContext2D,
      x0: number,
      y0: number,
      cpX: number,
      cpY: number,
      x1: number,
      y1: number,
      lineWidth: number,
      strokeStyle: string,
      shadowBlur: number,
      shadowColor: string,
      alpha: number,
      offsetX = 0,
      offsetY = 0
    ) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = strokeStyle;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      if (shadowBlur > 0) {
        ctx.shadowBlur = shadowBlur;
        ctx.shadowColor = shadowColor;
      }
      
      ctx.beginPath();
      ctx.moveTo(x0 + offsetX, y0 + offsetY);
      ctx.quadraticCurveTo(cpX + offsetX, cpY + offsetY, x1 + offsetX, y1 + offsetY);
      ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const now = performance.now();

      // Update points and ripples
      pointsRef.current = pointsRef.current.filter((p) => now - p.t <= 400);
      if (pointsRef.current.length > 20) {
        pointsRef.current = pointsRef.current.slice(-20);
      }
      ripplesRef.current = ripplesRef.current.filter((r) => now - r.t <= 600);

      // Easing hover radius for custom core dot
      const targetRadius = isHovered ? 4.5 : 2.5;
      coreDotRadius.current += (targetRadius - coreDotRadius.current) * 0.15;

      if (!reducedMotion) {
        const p = pointsRef.current;
        const n = p.length;

        if (n >= 2) {
          // Generate segments
          const segments: Array<{
            x0: number; y0: number;
            cpX: number; cpY: number;
            x1: number; y1: number;
            ageMs: number;
            ratio: number;
          }> = [];

          if (n === 2) {
            segments.push({
              x0: p[0].x, y0: p[0].y,
              cpX: (p[0].x + p[1].x) / 2, cpY: (p[0].y + p[1].y) / 2,
              x1: p[1].x, y1: p[1].y,
              ageMs: now - p[1].t,
              ratio: 1.0,
            });
          } else {
            // First segment (oldest surviving point to first midpoint)
            segments.push({
              x0: p[0].x, y0: p[0].y,
              cpX: p[0].x, cpY: p[0].y,
              x1: (p[0].x + p[1].x) / 2, y1: (p[0].y + p[1].y) / 2,
              ageMs: now - p[0].t,
              ratio: 0,
            });

            // Middle segments using quadratic Bezier curve (midpoint to midpoint)
            for (let i = 1; i < n - 2; i++) {
              const prevMidX = (p[i-1].x + p[i].x) / 2;
              const prevMidY = (p[i-1].y + p[i].y) / 2;
              const nextMidX = (p[i].x + p[i+1].x) / 2;
              const nextMidY = (p[i].y + p[i+1].y) / 2;

              segments.push({
                x0: prevMidX, y0: prevMidY,
                cpX: p[i].x, cpY: p[i].y,
                x1: nextMidX, y1: nextMidY,
                ageMs: now - p[i].t,
                ratio: i / (n - 1),
              });
            }

            // Last segment (last midpoint to newest point)
            const lastMidX = (p[n-3].x + p[n-2].x) / 2;
            const lastMidY = (p[n-3].y + p[n-2].y) / 2;
            segments.push({
              x0: lastMidX, y0: lastMidY,
              cpX: p[n-2].x, cpY: p[n-2].y,
              x1: p[n-1].x, y1: p[n-1].y,
              ageMs: now - p[n-1].t,
              ratio: 1.0,
            });
          }

          // Pass 1: Wider pass underneath for the visible color ring (#E020FF, shadowBlur: 25, max width: 4px, alpha: 0.5)
          segments.forEach((seg) => {
            const baseWidth = 0.3 + (4.0 - 0.3) * seg.ratio;
            const alpha = 1.0 - (seg.ageMs / 400);
            if (alpha <= 0) return;
            drawSegment(ctx, seg.x0, seg.y0, seg.cpX, seg.cpY, seg.x1, seg.y1, baseWidth, "#E020FF", 25, "#E020FF", alpha * 0.5);
          });

          // Pass 2: Chromatic offset duplicate (no blur, alpha: 0.15, offset: 1.5px, strokeColor: #E020FF)
          segments.forEach((seg) => {
            const baseWidth = 0.3 + (4.0 - 0.3) * seg.ratio;
            const alpha = 1.0 - (seg.ageMs / 400);
            if (alpha <= 0) return;
            drawSegment(ctx, seg.x0, seg.y0, seg.cpX, seg.cpY, seg.x1, seg.y1, baseWidth, "#E020FF", 0, "", alpha * 0.15, 1.5, 1.5);
          });

          // Pass 3: Innermost white-hot core (#FFFFFF, shadowBlur: 18, shadowColor: #E020FF, max width: 1.5px, alpha: 1.0)
          segments.forEach((seg) => {
            const baseWidth = 0.3 + (1.5 - 0.3) * seg.ratio;
            const alpha = 1.0 - (seg.ageMs / 400);
            if (alpha <= 0) return;
            drawSegment(ctx, seg.x0, seg.y0, seg.cpX, seg.cpY, seg.x1, seg.y1, baseWidth, "#FFFFFF", 18, "#E020FF", alpha * 1.0);
          });
        }

        // Draw Core Dot (always on cursor, zero lag, white core with purple glow)
        if (isMouseInWindow.current) {
          ctx.save();
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowBlur = 18;
          ctx.shadowColor = "#E020FF";
          ctx.beginPath();
          ctx.arc(mousePos.current.x, mousePos.current.y, coreDotRadius.current, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Draw Click Ripples
      ripplesRef.current.forEach((r) => {
        const ringProgress = (now - r.t) / 450;
        const dotProgress = (now - r.t) / 600;

        // Expanding ring (0 -> 35px ease-out, 0.8 -> 0 alpha linear, over 450ms)
        if (ringProgress < 1 && !reducedMotion) {
          const easeOut = 1 - Math.pow(1 - ringProgress, 3);
          const radius = 35 * easeOut;
          const alpha = 0.8 * (1 - ringProgress);

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = "#E020FF";
          ctx.lineWidth = 1.5;
          ctx.shadowColor = "#E020FF";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Static dot at exact click point (radius: 2px, fill #FFFFFF, shadowBlur: 8, fades over 600ms)
        if (dotProgress < 1) {
          const alpha = 1.0 - dotProgress;

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = "#FFFFFF";
          if (!reducedMotion) {
            ctx.shadowColor = "#E020FF";
            ctx.shadowBlur = 8;
          }
          ctx.beginPath();
          ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("click", handleClick);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [enabled, reducedMotion, isHovered]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
