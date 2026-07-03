"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver: track which section is most visible
  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "internship", "patent", "resume", "contact"];
    const observers: IntersectionObserver[] = [];

    const sectionVisibility: Record<string, number> = {};

    const updateActive = () => {
      // Pick the section with the highest intersection ratio
      let best = "";
      let bestRatio = 0;
      for (const [id, ratio] of Object.entries(sectionVisibility)) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      }
      if (bestRatio > 0) setActiveSection(best);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          sectionVisibility[id] = entry.intersectionRatio;
          updateActive();
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "-80px 0px -20% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Internship", href: "#internship", id: "internship" },
    { name: "Patent", href: "#patent", id: "patent" },
    { name: "Resume", href: "#resume", id: "resume" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleCommandPaletteClick = () => {
    window.dispatchEvent(new CustomEvent("toggle-command-palette"));
  };

  return (
    <motion.header
      className="fixed left-1/2 z-[200] flex items-center justify-between shadow-2xl"
      style={{ 
        width: "92%", 
        maxWidth: "960px",
        translateX: "-50%",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "16px",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
      animate={{
        top: isScrolled ? 12 : 24,
        height: isScrolled ? 50 : 60,
        paddingLeft: isScrolled ? 16 : 24,
        paddingRight: isScrolled ? 16 : 24,
        backgroundColor: isScrolled ? "rgba(20, 20, 28, 0.92)" : "rgba(20, 20, 28, 0.65)",
        borderColor: isScrolled ? "rgba(108, 92, 231, 0.35)" : "rgba(255, 255, 255, 0.08)",
        boxShadow: isScrolled 
          ? "0 4px 30px rgba(0,0,0,0.6), 0 0 20px rgba(108,92,231,0.15)" 
          : "0 4px 30px rgba(0,0,0,0.5)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Left: Name wordmark */}
      <a
        href="#"
        className="select-none no-underline"
        style={{
          fontFamily: "var(--font-data, 'JetBrains Mono', monospace)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: "rgba(244,243,247,0.9)",
          textDecoration: "none",
        }}
      >
        <span style={{ color: "#6C5CE7" }}>S</span>iva{" "}
        <span style={{ color: "#FF6B5B" }}>S</span>urya
      </a>

      {/* Middle: Nav links (hidden on mobile) */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.name}
              href={link.href}
              className="relative text-xs font-medium transition-colors duration-200 py-1 flex flex-col items-center gap-0.5"
              style={{ color: isActive ? "#F4F3F7" : "rgba(244,243,247,0.45)" }}
            >
              <span style={{ fontWeight: isActive ? 600 : 400 }}>{link.name}</span>
              {/* Active indicator dot */}
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#6C5CE7",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.25s ease",
                  boxShadow: isActive ? "0 0 6px rgba(108,92,231,0.8)" : "none",
                }}
              />
            </a>
          );
        })}
      </nav>

      {/* Right: Command Palette Hint */}
      <button
        onClick={handleCommandPaletteClick}
        className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all font-data text-xs text-text-secondary select-none"
      >
        <span>Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-black/40 border border-white/5 rounded text-text-secondary">
          <span>Ctrl</span><span>K</span>
        </kbd>
      </button>
    </motion.header>
  );
}
