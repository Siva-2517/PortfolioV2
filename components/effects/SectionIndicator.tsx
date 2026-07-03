"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about",      number: "01", label: "ABOUT" },
  { id: "skills",     number: "02", label: "SKILLS" },
  { id: "projects",   number: "03", label: "PROJECTS" },
  { id: "internship", number: "04", label: "INTERNSHIP" },
  { id: "patent",     number: "05", label: "PATENT" },
  { id: "resume",     number: "06", label: "RESUME" },
  { id: "contact",    number: "07", label: "CONTACT" },
];

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sectionVisibility: Record<string, number> = {};

    const updateActive = () => {
      let best = "";
      let bestRatio = 0;
      for (const [id, ratio] of Object.entries(sectionVisibility)) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      }
      if (bestRatio > 0.05) {
        setActiveSection(best);
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          sectionVisibility[id] = entry.intersectionRatio;
          updateActive();
        },
        {
          threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1],
          rootMargin: "-80px 0px -10% 0px",
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const section = SECTIONS.find((s) => s.id === activeSection);

  return (
    <div
      style={{
        position: "fixed",
        top: "82px",        /* just below the navbar */
        left: "24px",
        zIndex: 100,
        pointerEvents: "none",
        opacity: visible && section ? 1 : 0,
        transform: visible && section ? "translateY(0px)" : "translateY(-5px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "5px",
      }}
    >
      {/* Number + Label — no // prefix */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-data, 'JetBrains Mono', monospace)",
          fontSize: "11px",
          letterSpacing: "0.16em",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        <span style={{ color: "#FF6B5B", fontWeight: 700 }}>
          {section?.number ?? "00"}.
        </span>
        <span style={{ color: "rgba(244,243,247,0.85)", fontWeight: 600 }}>
          {section?.label ?? ""}
        </span>
      </div>

      {/* Accent underline */}
      <div
        style={{
          height: "1px",
          width: "100%",
          minWidth: "64px",
          background: "linear-gradient(to right, rgba(108,92,231,0.6), transparent)",
        }}
      />
    </div>
  );
}
