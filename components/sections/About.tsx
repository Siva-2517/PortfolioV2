"use client";

import React from "react";
import { GraduationCap, Award, Check } from "lucide-react";
import { PROFILE, CERTIFICATIONS } from "@/lib/data";

export default function About() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="about" className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
      <div 
        onMouseMove={handleMouseMove}
        className="glass-card p-8 md:p-12 bg-surface-glass/40 shadow-2xl relative overflow-hidden"
        style={{
          "--glow-color": "rgba(108, 92, 231, 0.25)",
          "--glow-shadow": "rgba(108, 92, 231, 0.35)",
          "--glow-border": "rgba(108, 92, 231, 0.6)"
        } as React.CSSProperties}
      >
        {/* Glow backdrop decorative layer */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent-indigo/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-coral/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left Column: Biography */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-text-primary mb-6">
                About Siva
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-text-secondary font-body leading-relaxed">
                <p>
                  I&apos;m a final-year B.Tech Information Technology student at Sri Shakthi Institute of 
                  Engineering and Technology, Coimbatore. My programming journey is driven by a deep 
                  curiosity for how complex databases, language models, and web servers interface to 
                  form intelligent systems.
                </p>
                <p>
                  Recently, I spent four months as an <span className="text-text-primary font-medium">Agentic AI && Large Language Models(LLMs)</span>, 
                  where I focused on developing stateful multi-agent workflows utilizing LangGraph, LangChain, 
                  and custom RAG pipelines. That experience solidified my passion for AI engineering.
                </p>
                <p>
                  Beyond machine learning architectures, I maintain a strong secondary track in Full Stack development 
                  with the MERN stack and Spring Boot. I love building APIs that scale and writing clean, 
                  reusable code in Python, Java, and JavaScript.
                </p>
              </div>
            </div>

            {/* Area of Interest Quick tags */}
            <div className="mt-8">
              <h4 className="text-xs uppercase font-bold text-accent-indigo font-data tracking-wider mb-3">
                Focus Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#6C5CE7]/10 text-[#6C5CE7] border border-[#6C5CE7]/20">
                  Agentic AI
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FF6B5B]/10 text-[#FF6B5B] border border-[#FF6B5B]/20">
                  RAG Systems
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-text-secondary border border-white/10">
                  Backend Architectures
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline & Certifications */}
          <div className="space-y-8">
            {/* Education Timeline */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-accent-coral" />
                <h3 className="text-lg font-bold font-display text-text-primary">Education</h3>
              </div>
              
              <div className="border-l border-border-hairline pl-4 ml-2.5 space-y-6">
                {/* College */}
                <div className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#FF6B5B]" />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">
                        {PROFILE.education[0].institution}
                      </h4>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {PROFILE.education[0].degree}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium font-data text-accent-indigo shrink-0">
                      {PROFILE.education[0].period}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#00E6A0] font-data mt-1 bg-[#00E6A0]/10 inline-block px-1.5 py-0.5 rounded">
                    CGPA {PROFILE.education[0].gpa}
                  </p>
                </div>

                {/* School */}
                <div className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-text-secondary" />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">
                        {PROFILE.hsc.school}
                      </h4>
                      <p className="text-xs text-text-secondary mt-0.5">
                        HSC (12th Grade) — {PROFILE.hsc.location}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium font-data text-text-secondary shrink-0">
                      {PROFILE.hsc.year}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1 font-data">
                    Score: {PROFILE.hsc.percentage}
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications Checklist */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-accent-indigo" />
                <h3 className="text-lg font-bold font-display text-text-primary">Certifications</h3>
              </div>

              <ul className="space-y-3">
                {CERTIFICATIONS.map((cert, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00E6A0]/20 text-[#00E6A0]">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-xs md:text-sm text-text-secondary font-body">
                      {cert}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
