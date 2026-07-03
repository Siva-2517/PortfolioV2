"use client";

import React from "react";
import { FileText, Award } from "lucide-react";
import { PATENT } from "@/lib/data";

export default function Patent() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="patent" className="py-20 px-4 md:px-8 max-w-5xl mx-auto scroll-mt-24">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-text-primary">
          Patents & Publications
        </h2>
        <p className="text-sm md:text-base text-text-secondary mt-2 max-w-2xl font-body">
          Academic and industrial research papers published in recognized international journals.
        </p>
      </div>

      <div 
        onMouseMove={handleMouseMove}
        className="glass-card p-8 md:p-10 bg-surface-glass/40 shadow-xl relative overflow-hidden"
        style={{
          "--glow-color": "rgba(0, 230, 160, 0.25)",
          "--glow-shadow": "rgba(0, 230, 160, 0.35)",
          "--glow-border": "rgba(0, 230, 160, 0.6)"
        } as React.CSSProperties}
      >
        {/* Glow backdrop decorator */}
        <div className="absolute top-1/2 -translate-y-1/2 right-12 w-64 h-64 bg-accent-indigo/10 rounded-full blur-[80px] pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          
          {/* Glowing Document Icon Wrapper */}
          <div className="p-4 rounded-2xl bg-[#6C5CE7]/10 text-accent-indigo border border-[#6C5CE7]/20 shadow-[0_0_20px_rgba(108,92,231,0.15)] flex-shrink-0 select-none">
            <FileText className="w-10 h-10 md:w-12 md:h-12" />
          </div>

          {/* Details Content */}
          <div className="space-y-3 flex-grow">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-accent-coral" />
              <span className="text-xs font-semibold text-accent-coral uppercase tracking-wider font-data">
                {PATENT.status}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-extrabold font-display tracking-tight text-text-primary">
              {PATENT.title}
            </h3>

            <p className="text-xs md:text-sm text-text-secondary font-body leading-relaxed max-w-3xl">
              Published in the <span className="text-text-primary font-medium">{PATENT.publication}</span>.
              This system details an automated architectural platform designed for harbor flow automation, slot queueing, and logistics throughput optimization.
            </p>
          </div>

          {/* External Action link */}
          <div className="shrink-0 pt-4 md:pt-0">
            <span className="flex items-center gap-1 text-xs font-semibold text-text-secondary font-data bg-white/5 border border-white/10 px-3 py-2 rounded-full cursor-default select-none">
              Published Journal
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
