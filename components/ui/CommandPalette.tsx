"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FolderGit2, 
  Wrench, 
  FileDown, 
  Github, 
  Linkedin, 
  Copy, 
  MessageSquareShare, 
  Search,
  Check,
  Mail,
  Phone
} from "lucide-react";
import { PROFILE } from "@/lib/data";

interface CommandItem {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords: string[];
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Setup commands
  const commands: CommandItem[] = [
    {
      id: "go-projects",
      name: "Go to Projects",
      category: "Navigation",
      icon: FolderGit2,
      keywords: ["projects", "work", "portfolio", "bento", "code"],
      action: () => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "go-skills",
      name: "Go to Skills",
      category: "Navigation",
      icon: Wrench,
      keywords: ["skills", "languages", "tools", "frameworks", "technologies"],
      action: () => {
        const el = document.getElementById("skills");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "download-resume",
      name: "Download Resume",
      category: "Downloads",
      icon: FileDown,
      keywords: ["resume", "pdf", "cv", "download", "hire"],
      action: () => {
        const el = document.getElementById("resume");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "open-github",
      name: "Open GitHub Profile",
      category: "External",
      icon: Github,
      keywords: ["github", "git", "source", "code", "profile"],
      action: () => {
        window.open(PROFILE.github, "_blank", "noopener,noreferrer");
      }
    },
    {
      id: "open-linkedin",
      name: "Open LinkedIn Profile",
      category: "External",
      icon: Linkedin,
      keywords: ["linkedin", "social", "connect", "profile", "hire"],
      action: () => {
        window.open(PROFILE.linkedin, "_blank", "noopener,noreferrer");
      }
    },
    {
      id: "copy-email",
      name: copied ? "Copied Email Address!" : "Copy Email Address",
      category: "Contact",
      icon: copied ? Check : Copy,
      keywords: ["email", "contact", "copy", "write", "message"],
      action: () => {
        navigator.clipboard.writeText(PROFILE.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      id: "email-siva",
      name: "Email Siva (Direct)",
      category: "Contact",
      icon: Mail,
      keywords: ["email", "contact", "write", "message", "mail"],
      action: () => {
        window.location.href = `mailto:${PROFILE.email}`;
      }
    },
    {
      id: "call-siva",
      name: "Call Siva (Direct)",
      category: "Contact",
      icon: Phone,
      keywords: ["phone", "call", "contact", "telephone", "mobile"],
      action: () => {
        window.location.href = `tel:${PROFILE.phone}`;
      }
    },
    {
      id: "ask-siva",
      name: "Ask Siva (AI Chat)",
      category: "Intelligence",
      icon: MessageSquareShare,
      keywords: ["chat", "ai", "ask", "bot", "agent", "gemini"],
      action: () => {
        window.dispatchEvent(new CustomEvent("open-chat-widget"));
      }
    }
  ];

  // Filtering based on input
  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    return (
      cmd.name.toLowerCase().includes(searchLower) ||
      cmd.category.toLowerCase().includes(searchLower) ||
      cmd.keywords.some((kw) => kw.toLowerCase().includes(searchLower))
    );
  });

  // Hotkeys listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomTrigger = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-command-palette", handleCustomTrigger);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-command-palette", handleCustomTrigger);
    };
  }, [isOpen]);

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation inside list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (!filteredCommands.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(filteredCommands[selectedIndex]);
    }
  };

  const executeCommand = (cmd: CommandItem) => {
    cmd.action();
    // Don't close immediately if copying email to show visual feedback
    if (cmd.id !== "copy-email") {
      setIsOpen(false);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    const listElement = listRef.current;
    if (listElement && listElement.children[selectedIndex]) {
      const activeElement = listElement.children[selectedIndex] as HTMLElement;
      const listHeight = listElement.clientHeight;
      const elemTop = activeElement.offsetTop;
      const elemHeight = activeElement.clientHeight;

      if (elemTop + elemHeight > listElement.scrollTop + listHeight) {
        listElement.scrollTop = elemTop + elemHeight - listHeight;
      } else if (elemTop < listElement.scrollTop) {
        listElement.scrollTop = elemTop;
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Blurred Back Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full max-w-[550px] overflow-hidden glass-card border-border-hairline shadow-2xl relative flex flex-col bg-[#14141C]/80"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-hairline">
              <Search className="w-4 h-4 text-text-secondary" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleListKeyDown}
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-0 outline-none text-sm text-text-primary placeholder:text-text-secondary font-body"
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[10px] px-1.5 py-0.5 border border-border-hairline rounded bg-white/5 text-text-secondary select-none"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div 
              ref={listRef}
              className="max-h-[300px] overflow-y-auto py-2"
            >
              {filteredCommands.length > 0 ? (
                Object.entries(
                  filteredCommands.reduce<Record<string, CommandItem[]>>((acc, curr) => {
                    acc[curr.category] = acc[curr.category] || [];
                    acc[curr.category].push(curr);
                    return acc;
                  }, {})
                ).map(([category, items]) => (
                  <div key={category}>
                    <div className="text-[10px] uppercase font-semibold text-accent-indigo px-4 py-1.5 font-data tracking-wider">
                      {category}
                    </div>
                    {items.map((cmd) => {
                      const absoluteIndex = filteredCommands.indexOf(cmd);
                      const isSelected = absoluteIndex === selectedIndex;
                      const Icon = cmd.icon;

                      return (
                        <div
                          key={cmd.id}
                          onClick={() => executeCommand(cmd)}
                          onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                          className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-all duration-150 ${
                            isSelected 
                              ? "bg-white/10 text-text-primary" 
                              : "text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 transition-colors ${
                              isSelected ? "text-accent-coral" : "text-text-secondary"
                            }`} />
                            <span className="text-xs font-medium font-body">{cmd.name}</span>
                          </div>
                          
                          {isSelected && (
                            <span className="text-[10px] text-text-secondary font-data bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                              Enter
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="text-xs text-text-secondary text-center py-8 font-body">
                  No commands found matching &quot;{search}&quot;
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border-hairline bg-black/20 text-[10px] text-text-secondary font-data">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <div>Press Ctrl+K to toggle</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
