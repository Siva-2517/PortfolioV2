"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useMagnetic } from "@/lib/useMagnetic";
import { PROFILE } from "@/lib/data";

function Counter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Quad out easing
      const easeProgress = progress * (2 - progress);
      setCount(easeProgress * value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  const formatted = count.toFixed(decimals);

  return (
    <span ref={ref} className="font-bold tracking-tight">
      {formatted}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  
  const subtitles = PROFILE.titles;

  const viewProjectsMagnetic = useMagnetic();
  const downloadResumeMagnetic = useMagnetic();

  useEffect(() => {
    // Subtitle rotating timer
    const interval = setInterval(() => {
      setSubtitleIdx((prev) => (prev + 1) % subtitles.length);
    }, 3200);

    return () => {
      clearInterval(interval);
    };
  }, [subtitles.length]);

  const nameString = PROFILE.name;
  const nameLetters = Array.from(nameString);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.3
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 15, stiffness: 180 }
    }
  };

  return (
    <section className="relative min-h-[92vh] md:min-h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 md:px-8 py-20">
      {/* Hero content container with backdrop scrim for text readability */}
      <div className="z-10 w-full max-w-4xl text-center select-none bg-canvas/30 backdrop-blur-[2px] p-6 rounded-2xl border border-white/5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center"
        >
          {nameLetters.map((char, idx) => (
            <motion.h1
              key={idx}
              variants={letterVariants}
              className={`text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight font-display text-text-primary ${
                char === " " ? "mx-3 sm:mx-4" : ""
              }`}
            >
              {char}
            </motion.h1>
          ))}
        </motion.div>

        {/* Dynamic rotating subtitle */}
        <div className="h-10 md:h-14 mt-4 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={subtitles[subtitleIdx]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-accent-indigo"
            >
              {subtitles[subtitleIdx]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pitch Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="max-w-2xl mx-auto mt-6 text-sm sm:text-base md:text-lg text-text-secondary font-body leading-relaxed"
        >
          Positioned around building real, connected systems. I specialize in designing autonomous{" "}
          <span className="text-text-primary font-medium">LangGraph AI workflows</span>, scalable{" "}
          <span className="text-text-primary font-medium">RAG retrieval pipelines</span>, and high-performance{" "}
          <span className="text-text-primary font-medium">Full Stack backends</span>.
        </motion.p>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
        >
          <motion.a
            ref={viewProjectsMagnetic.ref as React.RefObject<HTMLAnchorElement>}
            style={{ x: viewProjectsMagnetic.x, y: viewProjectsMagnetic.y }}
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent-indigo text-text-primary font-medium text-xs md:text-sm shadow-[0_0_20px_rgba(108,92,231,0.25)] hover:shadow-[0_0_30px_rgba(108,92,231,0.45)] transition-all select-none text-center"
          >
            View Projects
          </motion.a>
          
          <motion.a
            ref={downloadResumeMagnetic.ref as React.RefObject<HTMLAnchorElement>}
            style={{ x: downloadResumeMagnetic.x, y: downloadResumeMagnetic.y }}
            href="#resume"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-border-hairline text-text-secondary hover:text-text-primary font-medium text-xs md:text-sm hover-gradient-ring select-none text-center"
            whileHover={{
              boxShadow: "0 0 18px rgba(108,92,231,0.35), 0 0 36px rgba(255,107,91,0.18)",
              transition: { duration: 0.25 },
            }}
            initial={{
              boxShadow: "0 0 8px rgba(255,255,255,0.06)",
            }}
          >
            Download Resume
          </motion.a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16 pt-8 border-t border-border-hairline text-center"
        >
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl text-accent-coral">
              <Counter value={5} />
            </span>
            <span className="text-[10px] md:text-xs text-text-secondary uppercase tracking-wider font-body mt-1">
              Projects
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl text-accent-indigo">
              <Counter value={1} />
            </span>
            <span className="text-[10px] md:text-xs text-text-secondary uppercase tracking-wider font-body mt-1">
              Patent Published
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl text-accent-coral">
              <Counter value={8.23} decimals={2} />
            </span>
            <span className="text-[10px] md:text-xs text-text-secondary uppercase tracking-wider font-body mt-1">
              CGPA
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl text-accent-indigo">
              <Counter value={1} />
            </span>
            <span className="text-[10px] md:text-xs text-text-secondary uppercase tracking-wider font-body mt-1">
              Internship
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
