import React from "react";

/**
 * GrainOverlay
 * Adds a subtle film-grain texture across the entire page for visual depth.
 * NOTE for Siva: You can swap out the SVG data URL background in globals.css
 * with a high-quality grain PNG asset from `public/textures/grain.png` if desired.
 */
export default function GrainOverlay() {
  return (
    <div 
      className="grain-overlay fixed inset-0 pointer-events-none mix-blend-mode-overlay"
      style={{
        // Positioned above ParticleField (z-20) but below page content
        zIndex: -15 
      }}
    />
  );
}
