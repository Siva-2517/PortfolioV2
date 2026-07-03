"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! I am Siva's AI assistant. Ask me anything about his B.Tech projects, LangGraph internship, or patent!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Listen to open triggers from the Command Palette
  useEffect(() => {
    const handleOpenTrigger = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-chat-widget", handleOpenTrigger);
    return () => window.removeEventListener("open-chat-widget", handleOpenTrigger);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Place an empty assistant message slot to stream into
    const assistantIndex = updatedMessages.length;
    setMessages([...updatedMessages, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessages((prev) => {
          const copy = [...prev];
          copy[assistantIndex] = {
            role: "assistant",
            content: response.status === 429 
              ? errorText 
              : "Siva's AI assistant is taking a quick break, try again shortly."
          };
          return copy;
        });
        setIsLoading(false);
        return;
      }

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value);
          
          // Parse Vercel AI SDK text line format: 0:"word"
          // Or read plain text from simulation stream
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const parsed = JSON.parse(line.substring(2));
                accumulatedText += parsed;
              } catch {
                accumulatedText += line.substring(2);
              }
            } else if (line.trim().length > 0 && !line.includes(":")) {
              accumulatedText += line;
            }
          }

          setMessages((prev) => {
            const copy = [...prev];
            copy[assistantIndex] = {
              role: "assistant",
              content: accumulatedText || "Thinking..."
            };
            return copy;
          });
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const copy = [...prev];
        copy[assistantIndex] = {
          role: "assistant",
          content: "Siva's AI assistant is taking a quick break, try again shortly."
        };
        return copy;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            className="w-[90vw] sm:w-[360px] h-[480px] glass-card border-border-hairline shadow-2xl flex flex-col bg-[#14141C]/90 overflow-hidden mb-4"
          >
            {/* Widget Header */}
            <div className="px-4 py-3.5 border-b border-border-hairline bg-black/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-accent-indigo/10 text-accent-indigo">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display text-text-primary">
                    Ask Siva (AI)
                  </h4>
                  <p className="text-[9px] text-[#00E6A0] font-data font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E6A0] inline-block animate-pulse" />
                    Gemini 2.5 Flash
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg border border-border-hairline hover:bg-white/5 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Scroll Panel */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={index}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs font-body leading-relaxed ${
                        isUser
                          ? "bg-accent-indigo text-text-primary rounded-tr-sm"
                          : "bg-white/5 border border-white/5 text-text-secondary rounded-tl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              {isLoading && messages[messages.length - 1]?.content === "" && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 text-text-secondary rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#6C5CE7] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#6C5CE7] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-[#6C5CE7] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Message Form */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-border-hairline bg-black/10 flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Siva..."
                disabled={isLoading}
                className="flex-grow px-3.5 py-2 rounded-lg bg-black/20 border border-white/10 text-xs text-text-primary placeholder:text-text-secondary outline-none focus:border-accent-indigo transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-lg bg-accent-indigo text-text-primary hover:bg-accent-indigo/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full bg-surface-glass border border-border-hairline shadow-2xl flex items-center justify-center text-accent-indigo hover:text-accent-coral transition-colors relative group select-none cursor-pointer"
        style={{
          boxShadow: "0 0 15px rgba(108, 92, 231, 0.3)"
        }}
      >
        {/* Animated ring glow indicator */}
        <span className="absolute inset-0 rounded-full border border-accent-indigo/40 group-hover:scale-110 group-hover:opacity-100 opacity-60 transition-all duration-300 animate-pulse" />
        <MessageSquare className="w-5.5 h-5.5" />
      </button>
    </div>
  );
}
