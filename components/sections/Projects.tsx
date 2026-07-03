"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink, X, Info, Github } from "lucide-react";
import { PROJECTS, PROJECT_DETAILS, ProjectDetail } from "@/lib/data";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "fullstack" | "systems">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [connectorLines, setConnectorLines] = useState<{
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    category: string;
  }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "ai":
        return {
          glowColor: "rgba(255, 121, 198, 0.25)",
          glowShadow: "rgba(255, 121, 198, 0.35)",
          glowBorder: "rgba(255, 121, 198, 0.6)"
        };
      case "fullstack":
        return {
          glowColor: "rgba(108, 92, 231, 0.25)",
          glowShadow: "rgba(108, 92, 231, 0.35)",
          glowBorder: "rgba(108, 92, 231, 0.6)"
        };
      case "systems":
      default:
        return {
          glowColor: "rgba(80, 250, 123, 0.25)",
          glowShadow: "rgba(80, 250, 123, 0.35)",
          glowBorder: "rgba(80, 250, 123, 0.6)"
        };
    }
  };

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      if (activeFilter === "all") return true;
      return proj.category === activeFilter;
    });
  }, [activeFilter]);

  // Calculate coordinates for the SVG connector lines
  const updateLines = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newLines: typeof connectorLines = [];

    // Connection definitions linking projects in the grid:
    // AI: nulaware-ai <-> rag-assistant <-> gesture-cursor
    // Fullstack: college-sphere <-> snaplink
    // Systems connection bridging: snaplink <-> parking-system
    const connections = [
      { id: "ai-conn-1", from: "nulaware-ai", to: "rag-assistant", category: "ai" },
      { id: "ai-conn-2", from: "rag-assistant", to: "gesture-cursor", category: "ai" },
      { id: "fs-conn", from: "college-sphere", to: "snaplink", category: "fullstack" },
      { id: "sys-conn", from: "snaplink", to: "parking-system", category: "systems" }
    ];

    connections.forEach((conn) => {
      // Check if both cards are rendered and visible in current filter
      const showLine = filteredProjects.some(p => p.id === conn.from) && 
                        filteredProjects.some(p => p.id === conn.to);

      if (showLine) {
        const fromEl = document.getElementById(conn.from);
        const toEl = document.getElementById(conn.to);

        if (fromEl && toEl) {
          const r1 = fromEl.getBoundingClientRect();
          const r2 = toEl.getBoundingClientRect();

          // Calculate centers relative to the container
          const x1 = r1.left - containerRect.left + r1.width / 2;
          const y1 = r1.top - containerRect.top + r1.height / 2;
          
          const x2 = r2.left - containerRect.left + r2.width / 2;
          const y2 = r2.top - containerRect.top + r2.height / 2;

          newLines.push({ id: conn.id, x1, y1, x2, y2, category: conn.category });
        }
      }
    });

    setConnectorLines(newLines);
  }, [filteredProjects]);

  // Recalculate on resize and filter change
  useEffect(() => {
    updateLines();
    window.addEventListener("resize", updateLines);

    // Stagger recalculations to allow Framer Motion reflow to finish
    const timer1 = setTimeout(updateLines, 100);
    const timer2 = setTimeout(updateLines, 300);
    const timer3 = setTimeout(updateLines, 600);

    return () => {
      window.removeEventListener("resize", updateLines);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [updateLines]);

  // Handle escape key for modal closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="projects" className="py-20 px-4 md:px-8 max-w-5xl mx-auto scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-text-primary">
          Projects Bento Grid
        </h2>
        <p className="text-sm md:text-base text-text-secondary mt-2 max-w-2xl mx-auto font-body">
          Explore my works in AI engineering, agentic systems, and full-stack development, connected by neural lines.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8 select-none">
          {(["all", "ai", "fullstack", "systems"] as const).map((filter) => {
            const labelMap = {
              all: "All Projects",
              ai: "AI / ML",
              fullstack: "Full Stack",
              systems: "Systems"
            };

            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold font-body border transition-all duration-200 ${
                  isActive
                    ? "bg-[#6C5CE7]/10 text-accent-indigo border-accent-indigo"
                    : "bg-white/5 text-text-secondary border-white/10 hover:border-white/20 hover:text-text-primary"
                }`}
              >
                {labelMap[filter]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Wrapper */}
      <div ref={containerRef} className="relative w-full">
        
        {/* SVG Constellation connector lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          <defs>
            {/* Soft glow filter for the overlay lines */}
            <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComponentTransfer in="blur" result="glow">
                <feFuncA type="linear" slope="0.6"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {connectorLines.map((line) => {
            const isAi = line.category === "ai";
            const isFs = line.category === "fullstack";
            
            // AI: coral glow, Fullstack: indigo/purple glow, Systems: green glow
            const outerStroke = isAi ? "#FF6B5B" : isFs ? "#6C5CE7" : "#50FA7B";
            const innerStroke = isAi ? "#6C5CE7" : isFs ? "#A29BFE" : "#6C5CE7";

            return (
              <g key={line.id}>
                {/* Outer soft glowing line */}
                <motion.line
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={outerStroke}
                  strokeWidth="2.5"
                  strokeOpacity="0.25"
                  filter="url(#line-glow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                {/* Inner pipeline wire */}
                <motion.line
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={innerStroke}
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </g>
            );
          })}
        </svg>

        {/* Bento Grid */}
        <LayoutGroup>
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10 relative"
          >
            <AnimatePresence>
              {filteredProjects.map((proj, index) => {
                const isFeatured = index === 0;
                const isAi = proj.category === "ai";
                const theme = getCategoryTheme(proj.category);

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    key={proj.id}
                    id={proj.id}
                    onMouseMove={handleMouseMove}
                    className={`glass-card p-6 md:p-8 flex flex-col justify-between group shadow-xl ${
                      isFeatured ? "md:col-span-2" : "md:col-span-1"
                    }`}
                    style={{
                      "--glow-color": theme.glowColor,
                      "--glow-shadow": theme.glowShadow,
                      "--glow-border": theme.glowBorder
                    } as React.CSSProperties}
                  >
                    <div>
                      {/* Top Header Tag & Links */}
                      <div className="flex justify-between items-center mb-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider font-data ${
                          isAi ? "text-accent-coral" : "text-text-secondary"
                        }`}>
                          {proj.category}
                        </span>
                        
                        <div className="flex items-center gap-3 relative z-20">
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text-secondary hover:text-accent-indigo transition-all duration-200 hover:scale-110"
                              title="View GitHub Repository"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          
                          {proj.demoUrl && (
                            <a
                              href={proj.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text-secondary hover:text-accent-coral transition-all duration-200 hover:scale-110"
                              title="View Live Demo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Title & Pitch */}
                      <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-text-primary group-hover:text-accent-indigo transition-colors">
                        {proj.title}
                      </h3>
                      
                      <p className="text-xs md:text-sm text-text-secondary mt-3 font-body leading-relaxed">
                        {proj.pitch}
                      </p>                      

                      {/* Technical Bullets */}
                      <ul className="space-y-1.5 mt-4">
                        {proj.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="text-xs text-text-secondary font-body flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo/60 mt-1.5 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom: Stack & CTA Details */}
                    <div className="mt-8 pt-4 border-t border-border-hairline">
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {proj.stack.map((item) => (
                          <span 
                            key={item} 
                            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-semibold text-text-secondary font-body"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedProject(PROJECT_DETAILS[proj.id])}
                        className="flex items-center gap-1.5 text-xs font-semibold text-accent-indigo hover:text-accent-coral transition-colors"
                      >
                        <Info className="w-4 h-4" />
                        <span>Case Study Details</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* Modal Scrim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Card Panel */}
            {/* Slide-over on mobile, centered modal card on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="w-full max-w-[650px] max-h-[85vh] overflow-y-auto glass-card border-border-hairline shadow-2xl relative flex flex-col bg-[#14141C]/90 p-6 md:p-10 z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold font-display text-text-primary">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-accent-coral font-semibold uppercase tracking-wider font-data mt-1">
                    {selectedProject.subtitle}
                  </p>
                </div>
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded-lg border border-border-hairline hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable details */}
              <div className="space-y-6 text-sm text-text-secondary font-body leading-relaxed">
                
                {/* Problem Section */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-accent-indigo font-data tracking-wider mb-2">
                    The Problem
                  </h4>
                  <p className="bg-black/20 p-3.5 rounded-xl border border-white/5">
                    {selectedProject.problem}
                  </p>
                </div>

                {/* Approach Section */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-accent-indigo font-data tracking-wider mb-2">
                    My Approach
                  </h4>
                  <p className="bg-black/20 p-3.5 rounded-xl border border-white/5">
                    {selectedProject.approach}
                  </p>
                </div>

                {/* Architecture Bullets */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-accent-indigo font-data tracking-wider mb-2.5">
                    Architecture & Components
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.architecture.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6C5CE7]/10 text-accent-indigo font-data text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes Section */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-accent-indigo font-data tracking-wider mb-2.5">
                    Key Outcomes & Metrics
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedProject.outcomes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#00E6A0] font-data text-xs mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
              
              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4 border-t border-border-hairline">
                <div className="flex gap-4">
                  {(() => {
                    const baseProj = PROJECTS.find(p => p.id === selectedProject.id);
                    if (!baseProj) return null;
                    return (
                      <>
                        {baseProj.githubUrl && (
                          <a
                            href={baseProj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent-indigo transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span>Code Repository</span>
                          </a>
                        )}
                        {baseProj.demoUrl && (
                          <a
                            href={baseProj.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent-coral transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Deployment</span>
                          </a>
                        )}
                      </>
                    );
                  })()}
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-full border border-border-hairline text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all select-none self-end sm:self-auto"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
