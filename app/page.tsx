import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import GithubStats from "@/components/sections/GithubStats";
import Projects from "@/components/sections/Projects";
import Internship from "@/components/sections/Internship";
import Patent from "@/components/sections/Patent";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import ChatWidget from "@/components/sections/ChatWidget";

// Global atmospheric effects
import LivingNetwork from "@/components/effects/LivingNetwork";
import GrainOverlay from "@/components/effects/GrainOverlay";
import CustomCursor from "@/components/effects/CustomCursor";
import AvailableBadge from "@/components/effects/AvailableBadge";
import SectionIndicator from "@/components/effects/SectionIndicator";
import CommandPalette from "@/components/ui/CommandPalette";

export default function Home() {
  return (
    <div className="relative min-h-screen text-text-primary">
      {/* Global Background Atmospheric Layers */}
      <LivingNetwork />
      <GrainOverlay />
      
      {/* Interactive Custom cursor follower */}
      <CustomCursor />

      {/* Global Command palette dialog modal */}
      <CommandPalette />

      {/* "Available for work" pill — fixed bottom-left, separate from nav */}
      <AvailableBadge />

      {/* Fixed section name indicator — below nav, top-left */}
      <SectionIndicator />

      {/* Floating Glass Navigation Dock */}
      <Navbar />

      {/* Main content grid flow */}
      <main className="relative w-full z-10">
        <Hero />
        <About />
        <Skills />
        <GithubStats />
        <Projects />
        <Internship />
        <Patent />
        <Resume />
        <Contact />
      </main>

      {/* Chat widget assistant */}
      <ChatWidget />

      {/* Footer copyright */}
      <footer className="py-12 border-t border-border-hairline text-center text-[10px] md:text-xs text-text-secondary select-none bg-black/10 relative z-20">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body">
            © {new Date().getFullYear()} Siva Surya P. All rights reserved.
          </p>
          <p className="font-data uppercase tracking-wider text-accent-indigo">
            Synapse Portfolio Build • Next.js + React Three Fiber
          </p>
        </div>
      </footer>
    </div>
  );
}
