"use client";

import React from "react";
import { Briefcase, Calendar, CheckCircle } from "lucide-react";
import { INTERNSHIP } from "@/lib/data";

/**
 * Internship Section
 * 
 * Renders professional experience in a timeline format.
 * Currently imports the single INTERNSHIP object, but is structured as an array
 * of experience items to ensure it can extend cleanly if more internships are added.
 */
export default function Internship() {
  // Wrap in an array to support easy scalability for future experiences
  const experiences = [INTERNSHIP];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="internship" className="py-20 px-4 md:px-8 max-w-5xl mx-auto scroll-mt-24">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-text-primary">
          Professional Experience
        </h2>
        <p className="text-sm md:text-base text-text-secondary mt-2 max-w-2xl font-body">
          A review of my industry roles and contributions in artificial intelligence research and applications.
        </p>
      </div>

      <div 
        onMouseMove={handleMouseMove}
        className="glass-card p-6 md:p-10 bg-surface-glass/40 shadow-xl relative"
        style={{
          "--glow-color": "rgba(255, 107, 91, 0.25)",
          "--glow-shadow": "rgba(255, 107, 91, 0.35)",
          "--glow-border": "rgba(255, 107, 91, 0.6)"
        } as React.CSSProperties}
      >
        <div className="border-l-2 border-border-hairline ml-3 md:ml-6 pl-6 md:pl-10 space-y-12 py-4">
          
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Timeline Bullet Anchor */}
              <div className="absolute -left-[39px] md:-left-[55px] top-1 bg-[#14141C] border-2 border-accent-indigo rounded-full p-1.5 z-10 group-hover:scale-110 transition-transform">
                <Briefcase className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-accent-indigo" />
              </div>

              {/* Header Title */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-display text-text-primary">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-accent-coral font-semibold uppercase tracking-wider font-data mt-0.5">
                    {exp.company}
                  </p>
                </div>
                
                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-text-secondary font-data bg-white/5 border border-white/10 px-3 py-1 rounded-full w-fit">
                  <Calendar className="w-3.5 h-3.5 text-accent-indigo" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Bullets */}
              <ul className="space-y-3.5 max-w-3xl">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-xs md:text-sm text-text-secondary font-body leading-relaxed flex items-start gap-3">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00E6A0]/10 text-[#00E6A0]">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
