"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Eye, EyeOff, X } from "lucide-react";

export default function Resume() {
  const [activePreview, setActivePreview] = useState<"ai" | "fullstack" | null>(null);

  const resumeData = [
    {
      id: "ai" as const,
      title: "AI Engineer Resume",
      tag: "Agentic AI / RAG / Python",
      description: "Optimized for machine learning, vector database, LangChain/LangGraph agent roles.",
      fileUrl: "/resume/Sivasurya_AI_Engineer_Resume.pdf",
      fileName: "Sivasurya_AI_Engineer_Resume.pdf",
      highlights: ["LangGraph Workflows", "Vector Search & ChromaDB", "Python GenAI Pipelines"]
    },
    {
      id: "fullstack" as const,
      title: "Full Stack Resume",
      tag: "MERN / Spring Boot / Java",
      description: "Optimized for backend API design, database systems, and interactive UI engineering.",
      fileUrl: "/resume/Sivasurya_FullStack_Resume.pdf",
      fileName: "Sivasurya_FullStack_Resume.pdf",
      highlights: ["REST APIs & Spring Boot", "MERN Stack Dev", "Relational & NoSQL Storage"]
    }
  ];

  const activeResumeData = resumeData.find((r) => r.id === activePreview);

  const togglePreview = (id: "ai" | "fullstack") => {
    setActivePreview((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (activePreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePreview]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePreview(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const getResumeTheme = (id: "ai" | "fullstack") => {
    if (id === "ai") {
      return {
        glowColor: "rgba(255, 121, 198, 0.25)",
        glowShadow: "rgba(255, 121, 198, 0.35)",
        glowBorder: "rgba(255, 121, 198, 0.6)"
      };
    }
    return {
      glowColor: "rgba(108, 92, 231, 0.25)",
      glowShadow: "rgba(108, 92, 231, 0.35)",
      glowBorder: "rgba(108, 92, 231, 0.6)"
    };
  };

  return (
    <section id="resume" className="py-20 px-4 md:px-8 max-w-5xl mx-auto scroll-mt-24">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-text-primary">
          Resumes
        </h2>
        <p className="text-sm md:text-base text-text-secondary mt-2 max-w-2xl font-body">
          Download or preview specialized copies of my professional curriculum vitae based on role targets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {resumeData.map((res) => {
          const isPreviewing = activePreview === res.id;
          const theme = getResumeTheme(res.id);

          return (
            <div
              key={res.id}
              onMouseMove={handleMouseMove}
              className="glass-card p-6 md:p-8 bg-surface-glass/40 shadow-xl flex flex-col justify-between"
              style={{
                "--glow-color": theme.glowColor,
                "--glow-shadow": theme.glowShadow,
                "--glow-border": theme.glowBorder
              } as React.CSSProperties}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider font-data text-accent-indigo">
                  {res.tag}
                </span>

                <h3 className="text-lg md:text-xl font-bold font-display tracking-tight text-text-primary mt-2">
                  {res.title}
                </h3>
                
                <p className="text-xs md:text-sm text-text-secondary mt-2 font-body leading-relaxed">
                  {res.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {res.highlights.map((h) => (
                    <span 
                      key={h}
                      className="px-2 py-0.5 rounded bg-[#6C5CE7]/5 border border-[#6C5CE7]/10 text-[9px] font-semibold text-[#6C5CE7]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8">
                <div className="flex gap-3">
                  {/* Download Button */}
                  <a
                    href={res.fileUrl}
                    download={res.fileName}
                    className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-text-primary font-semibold text-xs transition-all shadow-[0_0_15px_rgba(108,92,231,0.2)] hover:shadow-[0_0_20px_rgba(108,92,231,0.3)] select-none text-center"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>

                  {/* Preview Toggle */}
                  <button
                    onClick={() => togglePreview(res.id)}
                    className="px-3.5 py-2.5 rounded-xl border border-border-hairline text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                  >
                    {isPreviewing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Resume Preview Modal */}
      <AnimatePresence>
        {activePreview && activeResumeData && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePreview(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="w-full max-w-5xl h-[85vh] overflow-hidden glass-card border-border-hairline shadow-2xl relative flex flex-col bg-[#14141C]/90 rounded-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-hairline bg-[#14141C]/40 backdrop-blur-sm">
                <div className="flex flex-col text-left">
                  <h3 className="text-base md:text-lg font-bold font-display tracking-tight text-text-primary">
                    {activeResumeData.title}
                  </h3>
                  <span className="text-[10px] font-semibold font-data text-accent-indigo uppercase tracking-wider mt-0.5">
                    {activeResumeData.tag}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={activeResumeData.fileUrl}
                    download={activeResumeData.fileName}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-indigo hover:bg-accent-indigo/90 text-text-primary font-semibold text-xs transition-all shadow-[0_0_15px_rgba(108,92,231,0.2)] select-none"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download PDF</span>
                  </a>
                  <button
                    onClick={() => setActivePreview(null)}
                    className="p-1.5 rounded-lg border border-border-hairline text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Body */}
              <div className="flex-grow w-full bg-black/20 p-2 md:p-4">
                <iframe
                  src={`${activeResumeData.fileUrl}#toolbar=0&view=FitH`}
                  className="w-full h-full rounded-lg border border-border-hairline bg-black/40"
                  title={`${activeResumeData.title} Preview`}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
