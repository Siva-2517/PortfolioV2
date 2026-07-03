"use client";

import { useEffect, useState } from "react";

/**
 * Standalone "Available for work" glass pill badge — fixed bottom-left.
 * On mobile (sm breakpoint and below) it shrinks to just the pulsing dot,
 * hiding the text label to avoid overlapping CTAs or the chat widget.
 * Fades in ~500ms after mount.
 */
export default function AvailableBadge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href="#contact"
      aria-label="Available for work"
      className="cursor-pointer hover:scale-105 active:scale-95 transition-transform"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 150,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(6px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, transform 0.2s ease",
      }}
    >
      {/* Glass pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          padding: "6px 12px 6px 8px",
          borderRadius: "999px",
          background: "rgba(20, 20, 28, 0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(0, 230, 160, 0.25)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35), 0 0 12px rgba(0,230,160,0.08)",
        }}
      >
        {/* Pulsing dot */}
        <span
          style={{
            position: "relative",
            display: "inline-flex",
            width: "10px",
            height: "10px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: "#00E6A0",
              opacity: 0.7,
              animation: "badge-ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
          <span
            style={{
              position: "relative",
              display: "inline-flex",
              borderRadius: "50%",
              width: "10px",
              height: "10px",
              backgroundColor: "#00E6A0",
            }}
          />
        </span>

        {/* Text — hidden on mobile via CSS class */}
        <span
          className="badge-text"
          style={{
            fontFamily: "var(--font-data, 'JetBrains Mono', monospace)",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#00E6A0",
            whiteSpace: "nowrap",
          }}
        >
          Available for work
        </span>
      </div>

      {/* Keyframes + responsive hide for text */}
      <style>{`
        @keyframes badge-ping {
          0%    { transform: scale(1); opacity: 0.7; }
          75%,
          100%  { transform: scale(2); opacity: 0; }
        }
        /* On small screens hide text, keep just the dot */
        @media (max-width: 479px) {
          .badge-text { display: none; }
        }
      `}</style>
    </a>
  );
}
