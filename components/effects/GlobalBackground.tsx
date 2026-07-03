"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NodeGraphFallback from "../three/NodeGraphFallback";

// Lazy-load the 3D Scene with no SSR
const NodeGraphScene = dynamic(() => import("../three/NodeGraphScene"), { ssr: false });

export default function GlobalBackground() {
  const [useFallback, setUseFallback] = useState(true);

  useEffect(() => {
    // Check if viewport is mobile or prefers reduced motion
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setUseFallback(isMobile || prefersReduced);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
      {useFallback ? <NodeGraphFallback /> : <NodeGraphScene />}
    </div>
  );
}
