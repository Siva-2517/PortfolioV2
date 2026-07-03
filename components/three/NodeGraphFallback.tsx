import React from "react";

export default function NodeGraphFallback() {
  // Deterministic static positions for 8 fallback nodes (percentage based)
  const fallbackNodes = [
    { top: "25%", left: "45%" },
    { top: "35%", left: "60%" },
    { top: "42%", left: "30%" },
    { top: "50%", left: "55%" },
    { top: "58%", left: "40%" },
    { top: "65%", left: "68%" },
    { top: "72%", left: "48%" },
    { top: "30%", left: "35%" }
  ];

  return (
    <div className="w-full h-full fixed inset-0 -z-10 bg-transparent overflow-hidden">
      {/* Aurora glow background */}
      <div 
        className="absolute inset-0 w-full h-full opacity-60"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(108, 92, 231, 0.15) 0%, rgba(255, 107, 91, 0.08) 40%, rgba(10, 10, 15, 0) 70%)"
        }}
      />
      
      {/* Mock SVG connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <line x1="45%" y1="25%" x2="60%" y2="35%" stroke="#6C5CE7" strokeWidth="1" />
        <line x1="45%" y1="25%" x2="30%" y2="42%" stroke="#6C5CE7" strokeWidth="1" />
        <line x1="30%" y1="42%" x2="55%" y2="50%" stroke="#6C5CE7" strokeWidth="1" />
        <line x1="60%" y1="35%" x2="55%" y2="50%" stroke="#6C5CE7" strokeWidth="1" />
        <line x1="30%" y1="42%" x2="40%" y2="58%" stroke="#6C5CE7" strokeWidth="1" />
        <line x1="55%" y1="50%" x2="40%" y2="58%" stroke="#6C5CE7" strokeWidth="1" />
        <line x1="55%" y1="50%" x2="68%" y2="65%" stroke="#6C5CE7" strokeWidth="1" />
        <line x1="40%" y1="58%" x2="48%" y2="72%" stroke="#6C5CE7" strokeWidth="1" />
        <line x1="68%" y1="65%" x2="48%" y2="72%" stroke="#6C5CE7" strokeWidth="1" />
        <line x1="35%" y1="30%" x2="45%" y2="25%" stroke="#6C5CE7" strokeWidth="1" />
        <line x1="35%" y1="30%" x2="30%" y2="42%" stroke="#6C5CE7" strokeWidth="1" />
      </svg>

      {/* Mock Nodes */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {fallbackNodes.map((node, idx) => (
          <div
            key={`fallback-node-${idx}`}
            className="absolute w-2 h-2 rounded-full bg-[#6C5CE7] opacity-40 shadow-[0_0_8px_#6C5CE7]"
            style={{
              top: node.top,
              left: node.left,
              transform: "translate(-50%, -50%)"
            }}
          />
        ))}
      </div>
    </div>
  );
}
