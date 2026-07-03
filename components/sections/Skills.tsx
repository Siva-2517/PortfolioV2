"use client";

import React from "react";

import { PROFILE } from "@/lib/data";

// Custom type definitions

interface CategoryConfig {
  title: string;
  borderColor: string;
  textColor: string;
  glowColor: string;
  badgeBg: string;
  glowColorVar: string;
  glowShadowVar: string;
  glowBorderVar: string;
  items: string[];
}

// 1. Precise SVGs for every tech logo to match the visual mockups perfectly
function TechIcon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const normalized = name.toLowerCase().trim();

  // Return specific premium SVG for each technology
  switch (normalized) {
    case "python":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M11.9 2C6.9 2 7.1 4.1 7.1 4.1l.1 1.9h4.8v.7H5.1S2 6.4 2 11.5s2.7 5.2 2.7 5.2h1.6V14.1s-.1-2.9 2.8-2.9h4.8s2.8.1 2.8-2.8V4.8s.2-2.8-4.8-2.8Z" fill="#3776AB"/>
          <path d="M12.1 22c5 0 4.8-2.1 4.8-2.1l-.1-1.9H12v-.7h6.9s3.1.3 3.1-4.8c0-5.1-2.7-5.2-2.7-5.2h-1.6v2.6s.1 2.9-2.8 2.9H10s-2.8-.1-2.8 2.8v3.6s-.2 2.8 4.8 2.8Z" fill="#FFD343"/>
          <circle cx="9.2" cy="4.1" r="0.6" fill="#fff"/>
          <circle cx="14.8" cy="19.9" r="0.6" fill="#111"/>
        </svg>
      );
    case "java":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Coffee cup body */}
          <path d="M6 3h10l-1 11H7L6 3Z" fill="#EA2D42" opacity="0.9"/>
          {/* Cup handle */}
          <path d="M16 6h2a2 2 0 0 1 0 4h-2" stroke="#EA2D42" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Saucer */}
          <ellipse cx="11" cy="15.5" rx="5.5" ry="1.2" fill="#007396"/>
          {/* Steam wisps */}
          <path d="M9 1.5 Q9.5 0.5 9 -0.5" stroke="#EA2D42" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
          <path d="M12 1.5 Q12.5 0.5 12 -0.5" stroke="#EA2D42" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
          {/* Java text base */}
          <rect x="6" y="17" width="10" height="2" rx="1" fill="#007396" opacity="0.7"/>
        </svg>
      );
    case "javascript":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
          <path d="M18.8 18.4c-.4.8-1.1 1.4-2.1 1.7-1 .3-2 .2-2.8-.2-.7-.4-1.2-1-1.4-1.8h1.9c.1.4.3.7.6.9.3.2.7.3 1.1.2.4 0 .7-.1.9-.3.2-.2.3-.5.3-.8 0-.3-.1-.5-.3-.7-.2-.2-.5-.3-1.1-.5-1-.3-1.7-.6-2.2-1-.5-.4-.7-1-.7-1.8 0-.7.3-1.3.9-1.7.6-.4 1.4-.6 2.3-.6.9 0 1.6.2 2.1.6.5.4.9.9 1 1.6h-1.8c-.1-.3-.3-.6-.5-.7-.2-.1-.5-.2-.9-.2-.3 0-.6.1-.8.2-.2.1-.3.3-.3.6 0 .2.1.4.3.5.2.1.6.3 1.2.5.9.3 1.6.6 2 1 .4.4.6.9.6 1.7 0 .6-.2 1.2-.6 1.6ZM11.6 11.2v7.6c0 .5-.1 1-.4 1.3-.3.3-.8.5-1.5.5s-1.2-.2-1.5-.5c-.3-.3-.4-.8-.4-1.3H6c0 .9.3 1.7.8 2.2.5.5 1.3.8 2.5.8s2-.3 2.5-.8c.5-.5.8-1.3.8-2.2v-7.6h-1Z" fill="#000"/>
        </svg>
      );
    case "c":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#00599C"/>
          <path d="M16 8.5c-.8-1-2.1-1.7-3.7-1.7-3 0-5.3 2.3-5.3 5.2s2.3 5.2 5.3 5.2c1.6 0 2.9-.7 3.7-1.7" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );
    case "n8n":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#FF6C37" strokeWidth="2"/>
          <circle cx="12" cy="12" r="4" fill="#FF6C37"/>
          <line x1="12" y1="2" x2="12" y2="8" stroke="#FF6C37" strokeWidth="2"/>
          <line x1="12" y1="16" x2="12" y2="22" stroke="#FF6C37" strokeWidth="2"/>
          <line x1="2" y1="12" x2="8" y2="12" stroke="#FF6C37" strokeWidth="2"/>
          <line x1="16" y1="12" x2="22" y2="12" stroke="#FF6C37" strokeWidth="2"/>
        </svg>
      );
    case "claude api":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L9 9H2L7 13.5L5 21L12 16.5L19 21L17 13.5L22 9H15L12 2Z" fill="#D97706" />
        </svg>
      );
    case "gpt / gemini":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Sparkles icon */}
          <path d="M9.5 2L11 6.5L15.5 8L11 9.5L9.5 14L8 9.5L3.5 8L8 6.5L9.5 2Z" fill="#FF6B5B"/>
          <path d="M17.5 10L18.5 13L21.5 14L18.5 15L17.5 18L16.5 15L13.5 14L16.5 13L17.5 10Z" fill="#6C5CE7"/>
        </svg>
      );
    case "watsonx.ai":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="2" fill="#0f62fe"/>
          {/* IBM Watson lines */}
          <line x1="4" y1="6" x2="20" y2="6" stroke="#fff" strokeWidth="2"/>
          <line x1="4" y1="10" x2="20" y2="10" stroke="#fff" strokeWidth="2"/>
          <line x1="4" y1="14" x2="20" y2="14" stroke="#fff" strokeWidth="2"/>
          <line x1="4" y1="18" x2="20" y2="18" stroke="#fff" strokeWidth="2"/>
        </svg>
      );
    case "langchain":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Parrot / Chain Link style icon */}
          <path d="M12 2a4 4 0 00-4 4v3h8V6a4 4 0 00-4-4ZM7 11a1 1 0 011-1h8a1 1 0 011 1v6a5 5 0 01-10 0v-6Z" fill="#13B6B5" />
          <circle cx="10" cy="13" r="1.5" fill="#FFF"/>
          <circle cx="14" cy="13" r="1.5" fill="#FFF"/>
        </svg>
      );
    case "langgraph":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="5" r="3" fill="#13B6B5" />
          <circle cx="6" cy="15" r="3" fill="#6C5CE7" />
          <circle cx="18" cy="15" r="3" fill="#FF6B5B" />
          <line x1="12" y1="8" x2="7.5" y2="12.5" stroke="#FFF" strokeWidth="2"/>
          <line x1="12" y1="8" x2="16.5" y2="12.5" stroke="#FFF" strokeWidth="2"/>
          <line x1="9" y1="15" x2="15" y2="15" stroke="#FFF" strokeWidth="1.5" strokeDasharray="2"/>
        </svg>
      );
    case "react":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)"/>
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB"/>
        </svg>
      );
    case "next.js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#000" stroke="#FFF" strokeWidth="1"/>
          <path d="M16.5 17.5l-6-8.5v8.5H9v-11h1.5l5.8 8.2V6.5h1.2v11z" fill="#FFF"/>
        </svg>
      );
    case "tailwind css":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 7.5c-2.7 0-4 .9-4 2.7 0 2.2 2 2.7 3.3 3 1.3.3 1.7.6 1.7 1.3 0 .8-.7 1.2-1.7 1.2-1.6 0-2.4-.7-2.7-2.1H6c.3 2.7 2 3.6 4.3 3.6 2.7 0 4.2-.9 4.2-2.8 0-2.2-2-2.7-3.3-3-1.3-.3-1.7-.6-1.7-1.3 0-.8.7-1.2 1.7-1.2 1.4 0 2.1.6 2.4 1.9h2.6c-.3-2.5-2-3.5-4.2-3.5Z" fill="#38BDF8"/>
        </svg>
      );
    case "html5":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M2 2h20l-1.8 20-8.2 2.3-8.2-2.3L2 2Z" fill="#E34F26"/>
          <path d="M12 4.2v15.6l5.7-1.6L19 5.8H12Z" fill="#F06529"/>
          <path d="M12 9.5H8.7l-.2-2.6H12v2.6ZM12 12.8H9l-.2-2.6H12v2.6ZM12 14.8l-2.8-.7-.2-1.9H6.3l.4 4.5 5.3 1.5v-3.4Z" fill="#FFF"/>
          <path d="M12 9.5h3.3l-.3 3.3H12v-3.3ZM12 12.8h2.9l-.3 3.1-2.6.7v-3.8Z" fill="#EBEBEB"/>
        </svg>
      );
    case "css3":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M2 2h20l-1.8 20-8.2 2.3-8.2-2.3L2 2Z" fill="#1572B6"/>
          <path d="M12 4.2v15.6l5.7-1.6L19 5.8H12Z" fill="#33A9DC"/>
          <path d="M12 9.5H8.7l-.2-2.6H12v2.6ZM12 12.8H9l-.2-2.6H12v2.6ZM12 14.8l-2.8-.7-.2-1.9H6.3l.4 4.5 5.3 1.5v-3.4Z" fill="#FFF"/>
          <path d="M12 9.5h3.3l-.3 3.3H12v-3.3ZM12 12.8h2.9l-.3 3.1-2.6.7v-3.8Z" fill="#EBEBEB"/>
        </svg>
      );
    case "fastapi":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#05998B"/>
          <path d="M12.5 4L6 13h5.5l-1 7 6.5-9h-5.5l1-7Z" fill="#FFF"/>
        </svg>
      );
    case "node.js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 6.6v9.2l8 4.6 8-4.6V6.6L12 2Z" fill="#339933"/>
          <path d="M12 4.5v14.4l6-3.5V8L12 4.5Z" fill="#66CC33"/>
          <path d="M12 12l-4-2.3v4.6l4 2.3V12Z" fill="#FFF"/>
        </svg>
      );
    case "mysql":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12.1 3c-4.9 0-8.9 3.5-8.9 7.8 0 2.2 1.1 4.2 2.8 5.6C4.8 17.6 3 19 3 19s3.6-.3 6.1-2.2c1 .4 2 .6 3 .6 4.9 0 8.9-3.5 8.9-7.8S17 3 12.1 3Z" fill="#00758F"/>
          <path d="M13.5 8.5c-.8.8-1.5.3-2.1-.2s-1-.3-1 .2c0 .8 1 1.2 1.8 1.2.9 0 1.6-.5 1.6-1.2h-.3Z" fill="#F29111"/>
        </svg>
      );
    case "mongodb":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2s-5 4.5-5 9.5c0 4.1 2.2 7.1 5 8.5V2Z" fill="#47A248"/>
          <path d="M12 2s5 4.5 5 9.5c0 4.1-2.2 7.1-5 8.5V2Z" fill="#3FA049"/>
          <path d="M12 18.2v3.8c-.8-.2-1.5-.7-1.5-1.5V18.2h1.5Z" fill="#13aa52"/>
          <path d="M12 18.2v3.8c.8-.2 1.5-.7 1.5-1.5V18.2H12Z" fill="#10aa50"/>
        </svg>
      );
    case "supabase":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4.5 12.5h6L9.5 22l7.5-10.5h-6L12 2Z" fill="#3ECF8E"/>
        </svg>
      );
    case "firebase":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M3.9 17.8L5.7 6.2c.1-.8.9-1.2 1.5-.7l3.6 3.3L3.9 17.8Z" fill="#FFC300"/>
          <path d="M20.1 17.8L12.4 3.2c-.3-.6-1.1-.6-1.4 0L9.1 6.8l7.6 7.4 3.4 3.6Z" fill="#FFA000"/>
          <path d="M11 9.3l-7.1 8.5L12 22l8.1-4.2L11 9.3Z" fill="#FF7043"/>
        </svg>
      );
    case "git":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M22.6 11.4L12.6 1.4c-.6-.6-1.6-.6-2.2 0L8 3.8l2.9 2.9c.4-.2.9-.2 1.3.1.5.5.5 1.2.1 1.7-.4.4-1.1.4-1.6.1L7.8 5.7 1.4 12.1c-.6.6-.6 1.6 0 2.2l10 10c.6.6 1.6.6 2.2 0l7.7-7.7c.3-.3.5-.7.5-1.1-.1-.5-.2-.8-.7-1.1Z" fill="#F05032"/>
          <circle cx="12" cy="18" r="2" fill="#FFF"/>
          <circle cx="12" cy="8" r="2" fill="#FFF"/>
        </svg>
      );
    case "github":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2Z"/>
        </svg>
      );
    case "docker":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M13.9 11h2.4v2.4h-2.4V11Zm-2.9 0h2.4v2.4H11V11Zm-2.9 0h2.4v2.4H8.1V11Zm-2.9 0h2.4v2.4H5.2V11Zm8.7-2.9h2.4v2.4h-2.4V8.1Zm-2.9 0h2.4v2.4H11V8.1Zm-2.9 0h2.4v2.4H8.1V8.1Zm5.8-2.9h2.4V7.6h-2.4V5.2ZM2 13.9s.4 3.7 3.5 3.7h13.2c3 0 5.3-2.4 5.3-5.3 0-3.3-2.9-4.8-2.9-4.8s-.3-2-2.1-2h-.3c-.8.8-.8 2-.8 2H9.8V9.8H7.1v2.9c0 .7-.4 1.2-.9 1.2H2Z" fill="#2496ED"/>
        </svg>
      );
    case "vercel":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 20h20L12 2Z"/>
        </svg>
      );
    case "netlify":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 8l3 11 9 3 6-9-9-11Z" fill="#00C7B7"/>
          <path d="M12 6.5l-4.5 3L9 15l6.5.5L12 6.5Z" fill="#FFF"/>
        </svg>
      );
    case "postman":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6 9.1v-2.3c-2.3-.9-4-3.1-4-5.8 0-3.9 3.1-7 7-7s7 3.1 7 7c0 2.7-1.7 4.9-4 5.8v2.3c3.5-1.5 6-5 6-9.1 0-5.5-4.5-10-10-10Z" fill="#FF6C37"/>
          <path d="M12 7.5L9.5 13h5L12 7.5Z" fill="#FF6C37"/>
        </svg>
      );
    case "render":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#46E3B7" opacity="0.9"/>
          <path d="M7 8h5a3 3 0 0 1 0 6H7V8Zm0 6h2l3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      );
    case "rag-agent":
    case "rag agent":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" fill="#FF79C6"/>
          <circle cx="5" cy="7" r="2" fill="#6C5CE7"/>
          <circle cx="19" cy="7" r="2" fill="#6C5CE7"/>
          <circle cx="5" cy="17" r="2" fill="#13B6B5"/>
          <circle cx="19" cy="17" r="2" fill="#13B6B5"/>
          <line x1="7" y1="7" x2="10" y2="10" stroke="#a29bfe" strokeWidth="1.2"/>
          <line x1="17" y1="7" x2="14" y2="10" stroke="#a29bfe" strokeWidth="1.2"/>
          <line x1="7" y1="17" x2="10" y2="14" stroke="#a29bfe" strokeWidth="1.2"/>
          <line x1="17" y1="17" x2="14" y2="14" stroke="#a29bfe" strokeWidth="1.2"/>
        </svg>
      );
    case "dsa":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Binary tree nodes */}
          <circle cx="12" cy="4" r="2.5" fill="#6C5CE7"/>
          <circle cx="6" cy="12" r="2.5" fill="#a29bfe"/>
          <circle cx="18" cy="12" r="2.5" fill="#a29bfe"/>
          <circle cx="3" cy="20" r="2" fill="#6C5CE7" opacity="0.6"/>
          <circle cx="9" cy="20" r="2" fill="#6C5CE7" opacity="0.6"/>
          <circle cx="15" cy="20" r="2" fill="#6C5CE7" opacity="0.6"/>
          <circle cx="21" cy="20" r="2" fill="#6C5CE7" opacity="0.6"/>
          <line x1="10.2" y1="5.7" x2="7.8" y2="10.3" stroke="#6C5CE7" strokeWidth="1.2"/>
          <line x1="13.8" y1="5.7" x2="16.2" y2="10.3" stroke="#6C5CE7" strokeWidth="1.2"/>
          <line x1="4.8" y1="13.7" x2="3.8" y2="18" stroke="#a29bfe" strokeWidth="1"/>
          <line x1="7.2" y1="13.7" x2="8.2" y2="18" stroke="#a29bfe" strokeWidth="1"/>
          <line x1="16.8" y1="13.7" x2="15.8" y2="18" stroke="#a29bfe" strokeWidth="1"/>
          <line x1="19.2" y1="13.7" x2="20.2" y2="18" stroke="#a29bfe" strokeWidth="1"/>
        </svg>
      );
    case "oop":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Class box */}
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="#FF79C6" strokeWidth="1.5" fill="none"/>
          <line x1="4" y1="9" x2="20" y2="9" stroke="#FF79C6" strokeWidth="1.2"/>
          {/* Method lines */}
          <line x1="7" y1="12.5" x2="17" y2="12.5" stroke="#a29bfe" strokeWidth="1" strokeDasharray="2"/>
          <line x1="7" y1="15" x2="15" y2="15" stroke="#a29bfe" strokeWidth="1" strokeDasharray="2"/>
          {/* Inheritance arrow */}
          <path d="M12 4V1M10 2.5L12 1l2 1.5" stroke="#FF79C6" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      );
    case "dbms":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Database cylinder */}
          <ellipse cx="12" cy="6" rx="8" ry="3" fill="#00758F" opacity="0.9"/>
          <rect x="4" y="6" width="16" height="5" fill="#00758F" opacity="0.7"/>
          <ellipse cx="12" cy="11" rx="8" ry="3" fill="#0097b2"/>
          <rect x="4" y="11" width="16" height="5" fill="#00758F" opacity="0.5"/>
          <ellipse cx="12" cy="16" rx="8" ry="3" fill="#0097b2" opacity="0.8"/>
        </svg>
      );
    case "os":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* CPU chip */}
          <rect x="6" y="6" width="12" height="12" rx="2" fill="#6C5CE7" opacity="0.9"/>
          <rect x="8.5" y="8.5" width="7" height="7" rx="1" fill="#14141C"/>
          {/* Pins left */}
          <line x1="4" y1="9" x2="6" y2="9" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="4" y1="12" x2="6" y2="12" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="4" y1="15" x2="6" y2="15" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Pins right */}
          <line x1="18" y1="9" x2="20" y2="9" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="18" y1="12" x2="20" y2="12" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="18" y1="15" x2="20" y2="15" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Pins top */}
          <line x1="9" y1="4" x2="9" y2="6" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="12" y1="4" x2="12" y2="6" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="15" y1="4" x2="15" y2="6" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Pins bottom */}
          <line x1="9" y1="18" x2="9" y2="20" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="12" y1="18" x2="12" y2="20" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="15" y1="18" x2="15" y2="20" stroke="#a29bfe" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case "sdlc":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Circular lifecycle arrows */}
          <circle cx="12" cy="12" r="8" stroke="#00E6A0" strokeWidth="1.5" strokeDasharray="4 2" fill="none"/>
          {/* Phase dots */}
          <circle cx="12" cy="4" r="2" fill="#00E6A0"/>
          <circle cx="20" cy="12" r="2" fill="#6C5CE7"/>
          <circle cx="12" cy="20" r="2" fill="#FF6B5B"/>
          <circle cx="4" cy="12" r="2" fill="#FF79C6"/>
          {/* Arrow indicator */}
          <path d="M12 4.5 Q 15 8 12 11.5" stroke="#00E6A0" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
        </svg>
      );
    case "mcp architecture":
    case "mvp architecture":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          {/* Server nodes connected */}
          <rect x="1.5" y="9" width="6" height="6" rx="1.5" fill="#FF6B5B" opacity="0.9"/>
          <rect x="9" y="4" width="6" height="6" rx="1.5" fill="#6C5CE7"/>
          <rect x="9" y="14" width="6" height="6" rx="1.5" fill="#6C5CE7"/>
          <rect x="16.5" y="9" width="6" height="6" rx="1.5" fill="#FF6B5B" opacity="0.9"/>
          {/* Connections */}
          <line x1="7.5" y1="12" x2="9" y2="7" stroke="#a29bfe" strokeWidth="1.2"/>
          <line x1="7.5" y1="12" x2="9" y2="17" stroke="#a29bfe" strokeWidth="1.2"/>
          <line x1="15" y1="7" x2="16.5" y2="12" stroke="#a29bfe" strokeWidth="1.2"/>
          <line x1="15" y1="17" x2="16.5" y2="12" stroke="#a29bfe" strokeWidth="1.2"/>
          <line x1="15" y1="7" x2="15" y2="14" stroke="#6C5CE7" strokeWidth="1" strokeDasharray="2"/>
        </svg>
      );
    default:
      // Fallback: A nice generic visual tech tag icon (brackets/dots/network)
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

// 2. Custom CSS animations for orbiting tech logos and glowing orbs
const cssStyles = `
  :root {
    --r1: 45px;
    --r2: 80px;
    --r3: 115px;
  }
  @media (min-width: 768px) {
    :root {
      --r1: 60px;
      --r2: 105px;
      --r3: 145px;
    }
  }
  @keyframes orbit-cw-1 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes orbit-ccw-1 {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.95); opacity: 0.2; }
    50% { transform: scale(1.1); opacity: 0.4; }
    100% { transform: scale(0.95); opacity: 0.2; }
  }
  @keyframes pulse-glowing {
    0% { box-shadow: 0 0 20px rgba(108, 92, 231, 0.4), inset 0 0 10px rgba(108, 92, 231, 0.2); }
    50% { box-shadow: 0 0 35px rgba(108, 92, 231, 0.7), inset 0 0 20px rgba(108, 92, 231, 0.4); }
    100% { box-shadow: 0 0 20px rgba(108, 92, 231, 0.4), inset 0 0 10px rgba(108, 92, 231, 0.2); }
  }
  .animate-orbit-cw-inner {
    animation: orbit-cw-1 25s linear infinite;
  }
  .animate-orbit-ccw-middle {
    animation: orbit-ccw-1 32s linear infinite;
  }
  .animate-orbit-cw-outer {
    animation: orbit-cw-1 40s linear infinite;
  }
  .animate-orbit-cw-inner:hover,
  .animate-orbit-ccw-middle:hover,
  .animate-orbit-cw-outer:hover {
    animation-play-state: paused;
  }
  .animate-counter-rotate-cw {
    animation: orbit-ccw-1 25s linear infinite;
  }
  .animate-counter-rotate-ccw {
    animation: orbit-cw-1 32s linear infinite;
  }
  .animate-counter-rotate-outer {
    animation: orbit-ccw-1 40s linear infinite;
  }
  .parent-hover-pause:hover .animate-counter-rotate-cw,
  .parent-hover-pause:hover .animate-counter-rotate-ccw,
  .parent-hover-pause:hover .animate-counter-rotate-outer {
    animation-play-state: paused;
  }
  .pulse-ring-element {
    animation: pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .center-orb-glowing {
    animation: pulse-glowing 3s ease-in-out infinite;
  }

  .skills-badge-item {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, background-color 0.2s;
    z-index: 2;
  }
  .glass-card:hover .skills-badge-item {
    transform: translateY(-3px);
  }
`;

// Orbit icon with hover name label (React state — reliable in transforms)
function OrbIcon({
  name,
  borderColor,
  counterClass,
}: {
  name: string;
  borderColor: string;
  shadowColor?: string;
  counterClass: string;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Name label — appears above icon on hover */}
      <span
        style={{
          position: "absolute",
          bottom: "calc(100% + 6px)",
          left: "50%",
          transform: `translateX(-50%) translateY(${hovered ? "0px" : "4px"})`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease, transform 0.2s ease",
          whiteSpace: "nowrap",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#a29bfe",
          background: "rgba(20,20,28,0.95)",
          padding: "2px 6px",
          borderRadius: "6px",
          border: "1px solid rgba(108,92,231,0.3)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        {name}
      </span>

      {/* Icon pill */}
      <div
        className={`p-2 rounded-full bg-[#14141C] border ${borderColor} ${counterClass} cursor-pointer transition-transform duration-200`}
        style={{
          transform: hovered ? "scale(1.25)" : "scale(1)",
          transition: "transform 0.2s ease",
        }}
      >
        <TechIcon name={name} className="w-4 h-4 md:w-[18px] md:h-[18px]" />
      </div>
    </div>
  );
}

export default function Skills() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // 6 Custom themed categories configs matching user screenshot
  const categories: Record<string, CategoryConfig> = {
    "Languages": {
      title: "LANGUAGES",
      borderColor: "border-[#6C5CE7]/30 hover:border-[#6C5CE7]/60",
      textColor: "text-[#a29bfe]",
      glowColor: "group-hover:shadow-[0_0_15px_rgba(108,92,231,0.15)]",
      badgeBg: "hover:bg-[#6C5CE7]/5 hover:border-[#6C5CE7]/30",
      glowColorVar: "rgba(108, 92, 231, 0.25)",
      glowShadowVar: "rgba(108, 92, 231, 0.35)",
      glowBorderVar: "rgba(108, 92, 231, 0.6)",
      items: ["Python", "Java", "C", "JavaScript"]
    },
    "AI / ML & Agents": {
      title: "AI / ML & AGENTS",
      borderColor: "border-[#FF79C6]/30 hover:border-[#FF79C6]/60",
      textColor: "text-[#FF79C6]",
      glowColor: "group-hover:shadow-[0_0_15px_rgba(255,121,198,0.15)]",
      badgeBg: "hover:bg-[#FF79C6]/5 hover:border-[#FF79C6]/30",
      glowColorVar: "rgba(255, 121, 198, 0.25)",
      glowShadowVar: "rgba(255, 121, 198, 0.35)",
      glowBorderVar: "rgba(255, 121, 198, 0.6)",
      items: ["n8n", "Claude API", "GPT / Gemini", "RAG-Agent", "LangChain", "Langgraph"]
    },
    "Frontend": {
      title: "FRONTEND",
      borderColor: "border-[#FFB86C]/30 hover:border-[#FFB86C]/60",
      textColor: "text-[#FFB86C]",
      glowColor: "group-hover:shadow-[0_0_15px_rgba(255,184,108,0.15)]",
      badgeBg: "hover:bg-[#FFB86C]/5 hover:border-[#FFB86C]/30",
      glowColorVar: "rgba(255, 184, 108, 0.25)",
      glowShadowVar: "rgba(255, 184, 108, 0.35)",
      glowBorderVar: "rgba(255, 184, 108, 0.6)",
      items: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"]
    },
    "Backend & DB": {
      title: "BACKEND & DB",
      borderColor: "border-[#8BE9FD]/30 hover:border-[#8BE9FD]/60",
      textColor: "text-[#8BE9FD]",
      glowColor: "group-hover:shadow-[0_0_15px_rgba(139,233,253,0.15)]",
      badgeBg: "hover:bg-[#8BE9FD]/5 hover:border-[#8BE9FD]/30",
      glowColorVar: "rgba(139, 233, 253, 0.25)",
      glowShadowVar: "rgba(139, 233, 253, 0.35)",
      glowBorderVar: "rgba(139, 233, 253, 0.6)",
      items: ["FastAPI", "Node.js", "MySQL", "MongoDB", "Supabase", "ChromaDB"]
    },
    "Tools": {
      title: "TOOLS",
      borderColor: "border-[#50FA7B]/30 hover:border-[#50FA7B]/60",
      textColor: "text-[#50FA7B]",
      glowColor: "group-hover:shadow-[0_0_15px_rgba(80,250,123,0.15)]",
      badgeBg: "hover:bg-[#50FA7B]/5 hover:border-[#50FA7B]/30",
      glowColorVar: "rgba(80, 250, 123, 0.25)",
      glowShadowVar: "rgba(80, 250, 123, 0.35)",
      glowBorderVar: "rgba(80, 250, 123, 0.6)",
      items: ["Git", "GitHub", "Docker", "Vercel", "Netlify", "Postman", "Render"]
    },
    "CS Concepts": {
      title: "CS CONCEPTS",
      borderColor: "border-[#F1FA8C]/30 hover:border-[#F1FA8C]/60",
      textColor: "text-[#F1FA8C]",
      glowColor: "group-hover:shadow-[0_0_15px_rgba(241,250,140,0.15)]",
      badgeBg: "hover:bg-[#F1FA8C]/5 hover:border-[#F1FA8C]/30",
      glowColorVar: "rgba(241, 250, 140, 0.25)",
      glowShadowVar: "rgba(241, 250, 140, 0.35)",
      glowBorderVar: "rgba(241, 250, 140, 0.6)",
      items: ["DSA", "OOP", "DBMS", "OS", "SDLC", "MVP Architecture"]
    }
  };

  return (
    <section id="skills" className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative z-20">
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Unique Interactive Orbit Animation */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[420px] select-none">
          {/* Main Orbiting Wheel Wrapper */}
          <div className="relative w-[290px] h-[290px] md:w-[350px] md:h-[350px] flex items-center justify-center parent-hover-pause">
            
            {/* Center Core Orb */}
            <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/75 border border-[#6C5CE7]/55 flex flex-col items-center justify-center text-center p-2 z-30 center-orb-glowing backdrop-blur-md">
              <span className="text-[9px] md:text-[10px] font-data uppercase tracking-[0.2em] text-[#6C5CE7] font-semibold">Full Stack</span>
              <span className="text-[10px] md:text-xs font-display font-extrabold text-text-primary tracking-wider mt-0.5">AI DEV</span>
            </div>

            {/* Glowing Orbit Rings (darker dashed paths) */}
            {/* Inner Ring */}
            <div className="absolute rounded-full border border-dashed border-white/20 pointer-events-none" style={{ width: "calc(var(--r1) * 2)", height: "calc(var(--r1) * 2)" }} />
            
            {/* Middle Ring */}
            <div className="absolute rounded-full border border-dashed border-white/25 pointer-events-none" style={{ width: "calc(var(--r2) * 2)", height: "calc(var(--r2) * 2)" }} />
            
            {/* Outer Ring */}
            <div className="absolute rounded-full border border-dashed border-white/20 pointer-events-none" style={{ width: "calc(var(--r3) * 2)", height: "calc(var(--r3) * 2)" }} />

            {/* Pulsing ring visual accents */}
            <div className="absolute rounded-full border border-[#FF6B5B]/35 pointer-events-none pulse-ring-element" style={{ width: "calc(var(--r1) * 2.4)", height: "calc(var(--r1) * 2.4)" }} />

            {/* 1. Orbiting Elements - Inner Orbit (React, Python, Java) */}
            <div className="absolute inset-0 animate-orbit-cw-inner pointer-events-none">
              {/* React (0 deg) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ transform: "translate(calc(-50% + var(--r1)), -50%)" }}
              >
                <OrbIcon name="React" borderColor="border-[#61DAFB]/40" shadowColor="rgba(97,218,251,0.25)" counterClass="animate-counter-rotate-cw" />
              </div>
              {/* Python (120 deg) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ transform: "translate(calc(-50% - var(--r1) * 0.5), calc(-50% + var(--r1) * 0.866))" }}
              >
                <OrbIcon name="Python" borderColor="border-[#3776AB]/40" shadowColor="rgba(55,118,171,0.25)" counterClass="animate-counter-rotate-cw" />
              </div>
              {/* Java (240 deg) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ transform: "translate(calc(-50% - var(--r1) * 0.5), calc(-50% - var(--r1) * 0.866))" }}
              >
                <OrbIcon name="Java" borderColor="border-[#007396]/40" shadowColor="rgba(0,115,150,0.25)" counterClass="animate-counter-rotate-cw" />
              </div>
            </div>

            {/* 2. Orbiting Elements - Middle Orbit (Next.js, Node.js, Docker) */}
            <div className="absolute inset-0 animate-orbit-ccw-middle pointer-events-none">
              {/* Next.js (0 deg) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ transform: "translate(calc(-50% + var(--r2)), -50%)" }}
              >
                <OrbIcon name="Next.js" borderColor="border-white/30" shadowColor="rgba(255,255,255,0.2)" counterClass="animate-counter-rotate-ccw" />
              </div>
              {/* Node.js (120 deg) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ transform: "translate(calc(-50% - var(--r2) * 0.5), calc(-50% + var(--r2) * 0.866))" }}
              >
                <OrbIcon name="Node.js" borderColor="border-[#339933]/40" shadowColor="rgba(51,153,51,0.25)" counterClass="animate-counter-rotate-ccw" />
              </div>
              {/* Docker (240 deg) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ transform: "translate(calc(-50% - var(--r2) * 0.5), calc(-50% - var(--r2) * 0.866))" }}
              >
                <OrbIcon name="Docker" borderColor="border-[#2496ED]/40" shadowColor="rgba(36,150,237,0.25)" counterClass="animate-counter-rotate-ccw" />
              </div>
            </div>

            {/* 3. Orbiting Elements - Outer Orbit (MongoDB, LangChain, Watsonx) */}
            <div className="absolute inset-0 animate-orbit-cw-outer pointer-events-none">
              {/* MongoDB (0 deg) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ transform: "translate(calc(-50% + var(--r3)), -50%)" }}
              >
                <OrbIcon name="MongoDB" borderColor="border-[#47A248]/40" shadowColor="rgba(71,162,72,0.25)" counterClass="animate-counter-rotate-outer" />
              </div>
              {/* LangChain (120 deg) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ transform: "translate(calc(-50% - var(--r3) * 0.5), calc(-50% + var(--r3) * 0.866))" }}
              >
                <OrbIcon name="LangChain" borderColor="border-[#13B6B5]/40" shadowColor="rgba(19,182,181,0.25)" counterClass="animate-counter-rotate-outer" />
              </div>
              {/* Watsonx (240 deg) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ transform: "translate(calc(-50% - var(--r3) * 0.5), calc(-50% - var(--r3) * 0.866))" }}
              >
                <OrbIcon name="Watsonx.ai" borderColor="border-[#0f62fe]/40" shadowColor="rgba(15,98,254,0.25)" counterClass="animate-counter-rotate-outer" />
              </div>
            </div>

          </div>

          {/* Under-Orbit Leetcode Links */}
          <div className="mt-8 text-center">
            <a 
              href={PROFILE.leetcode} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-data font-bold tracking-widest text-[#F1FA8C] hover:text-white uppercase transition-colors group"
            >
              300+ Leetcode Problems
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
            <div className="w-40 h-[1.5px] bg-gradient-to-r from-transparent via-[#F1FA8C] to-transparent mt-1 mx-auto" />
          </div>

        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(categories).map(([key, config]) => (
            <div
              key={key}
              onMouseMove={handleMouseMove}
              className={`group glass-card border ${config.borderColor} ${config.glowColor} p-5 md:p-6 bg-surface-glass/40 shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 relative overflow-hidden`}
              style={{ 
                "--glow-color": config.glowColorVar,
                "--glow-shadow": config.glowShadowVar,
                "--glow-border": config.glowBorderVar
              } as React.CSSProperties}
            >
              
              {/* Card Header Category Title */}
              <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-2.5 relative z-10">
                <h3 className={`text-[11px] md:text-xs font-data font-bold tracking-[0.2em] ${config.textColor}`}>
                  {config.title}
                </h3>
                {/* Tiny decorative tag dot */}
                <div className="w-1 h-1 rounded-full bg-white/20" />
              </div>

              {/* Skills badges grid */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {config.items.map((skill, idx) => (
                  <div
                    key={skill}
                    className={`skills-badge-item flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14141C]/80 border border-white/5 text-[11px] md:text-xs font-medium text-text-secondary hover:text-text-primary ${config.badgeBg} select-none cursor-default font-body`}
                    style={{ transitionDelay: `${idx * 25}ms` }}
                  >
                    <TechIcon name={skill} className="w-3.5 h-3.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>

              {/* 3. Pixel robot mascot decoration specifically on the Backend card */}
              {key === "Backend & DB" && (
                <div className="absolute bottom-1 right-2 w-8 h-8 opacity-45 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none select-none z-10">
                  {/* Little tech robot SVG mascot */}
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    {/* Head */}
                    <rect x="5" y="8" width="14" height="10" rx="2" fill="#6C5CE7" />
                    {/* Eyes */}
                    <rect x="8" y="11" width="2" height="2" fill="#00E6A0" />
                    <rect x="14" y="11" width="2" height="2" fill="#00E6A0" />
                    {/* Antenna */}
                    <line x1="12" y1="8" x2="12" y2="4" stroke="#6C5CE7" strokeWidth="2" />
                    <circle cx="12" cy="3" r="1.5" fill="#FF6B5B" />
                    {/* Body base */}
                    <rect x="8" y="18" width="8" height="3" fill="#3f3f4e" />
                  </svg>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
