"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Send, AlertTriangle } from "lucide-react";
import { PROFILE } from "@/lib/data";
import { useMagnetic } from "@/lib/useMagnetic";


// Custom simple LeetCode icon
function LeetCodeIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.877 9.88a1.375 1.375 0 0 0 0 1.943l1.19 1.19a1.37 1.37 0 0 0 1.939 0l9.87-9.88a1.375 1.375 0 0 0 0-1.943l-1.19-1.19a1.37 1.37 0 0 0-.971-.414zM22.08 11.583a1.375 1.375 0 0 0-1.149.582l-3.51 4.505a1.375 1.375 0 0 0-.174.453l-.936 3.655a1.375 1.375 0 0 0 1.768 1.636l3.528-1.517a1.375 1.375 0 0 0 .428-.316l2.97-3.418a1.375 1.375 0 0 0-.251-2.106l-2.674-1.474zM8.37 13.913L2.68 19.605a1.37 1.37 0 0 0 0 1.94l1.19 1.19a1.37 1.37 0 0 0 1.94 0l5.69-5.692L8.37 13.913z" />
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const submitMagnetic = useMagnetic();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Unable to connect to the server. Please check your internet connection.");
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 max-w-5xl mx-auto scroll-mt-24">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-text-primary">
          Get in Touch
        </h2>
        <p className="text-sm md:text-base text-text-secondary mt-2 max-w-2xl font-body">
          Have an interesting project or position? Drop me a message and let&apos;s build something together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Left: Contact Form Card (3 Columns) */}
        <div 
          onMouseMove={handleMouseMove}
          className="glass-card p-6 md:p-8 bg-surface-glass/40 shadow-xl md:col-span-3 flex flex-col justify-between"
          style={{
            "--glow-color": "rgba(108, 92, 231, 0.25)",
            "--glow-shadow": "rgba(108, 92, 231, 0.35)",
            "--glow-border": "rgba(108, 92, 231, 0.6)"
          } as React.CSSProperties}
        >
          <AnimatePresence mode="wait">
            
            {status !== "success" ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold uppercase tracking-wider font-data text-text-secondary mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === "sending"}
                    className="px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-xs text-text-primary placeholder:text-text-secondary outline-none focus:border-accent-indigo transition-colors"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <span className="text-[10px] text-accent-coral mt-1 font-body">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold uppercase tracking-wider font-data text-text-secondary mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === "sending"}
                    className="px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-xs text-text-primary placeholder:text-text-secondary outline-none focus:border-accent-indigo transition-colors"
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <span className="text-[10px] text-accent-coral mt-1 font-body">{errors.email}</span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold uppercase tracking-wider font-data text-text-secondary mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "sending"}
                    className="px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-xs text-text-primary placeholder:text-text-secondary outline-none focus:border-accent-indigo transition-colors resize-none"
                    placeholder="What would you like to discuss?"
                  />
                  {errors.message && (
                    <span className="text-[10px] text-accent-coral mt-1 font-body">{errors.message}</span>
                  )}
                </div>

                {/* Submission Error Alert */}
                {status === "error" && (
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-accent-coral/10 border border-accent-coral/20 text-xs text-accent-coral font-body">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    ref={submitMagnetic.ref as React.RefObject<HTMLButtonElement>}
                    style={{ x: submitMagnetic.x, y: submitMagnetic.y }}
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-accent-indigo hover:bg-accent-indigo/90 text-text-primary font-bold text-xs select-none flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(108,92,231,0.25)] transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{status === "sending" ? "Sending Message..." : "Send Message"}</span>
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              // Success state view with mint checkmark path animation
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="p-4 rounded-full bg-[#00E6A0]/10 text-[#00E6A0] border border-[#00E6A0]/20 shadow-[0_0_20px_rgba(0,230,160,0.15)] select-none">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.polyline
                      points="20 6 9 17 4 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </motion.svg>
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs md:text-sm text-text-secondary max-w-sm font-body">
                  Thank you for reaching out. I have received your message and will respond to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-4 py-2 rounded-full border border-border-hairline text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Contact details (2 Columns) */}
        <div className="space-y-6 md:col-span-2">
          
          {/* Email card */}
          <a
            href={`mailto:${PROFILE.email}`}
            onMouseMove={handleMouseMove}
            className="glass-card p-5 bg-surface-glass/40 shadow-md flex items-center gap-4 transition-all hover:bg-white/5 group"
            style={{
              "--glow-color": "rgba(108, 92, 231, 0.25)",
              "--glow-shadow": "rgba(108, 92, 231, 0.35)",
              "--glow-border": "rgba(108, 92, 231, 0.6)"
            } as React.CSSProperties}
          >
            <div className="p-3 rounded-xl bg-accent-indigo/10 text-accent-indigo group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider font-data text-text-secondary">
                Email Address
              </p>
              <p className="text-xs sm:text-sm font-semibold text-text-primary mt-0.5 truncate max-w-[200px]">
                {PROFILE.email}
              </p>
            </div>
          </a>

          {/* Phone card */}
          <a
            href={`tel:${PROFILE.phone}`}
            onMouseMove={handleMouseMove}
            className="glass-card p-5 bg-surface-glass/40 shadow-md flex items-center gap-4 transition-all hover:bg-white/5 group"
            style={{
              "--glow-color": "rgba(255, 107, 91, 0.25)",
              "--glow-shadow": "rgba(255, 107, 91, 0.35)",
              "--glow-border": "rgba(255, 107, 91, 0.6)"
            } as React.CSSProperties}
          >
            <div className="p-3 rounded-xl bg-accent-coral/10 text-accent-coral group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider font-data text-text-secondary">
                Phone Number
              </p>
              <p className="text-xs sm:text-sm font-semibold text-text-primary mt-0.5">
                {PROFILE.phone}
              </p>
            </div>
          </a>

          {/* Direct Social Grid */}
          <div 
            onMouseMove={handleMouseMove}
            className="glass-card p-6 bg-surface-glass/40 shadow-md"
            style={{
              "--glow-color": "rgba(108, 92, 231, 0.25)",
              "--glow-shadow": "rgba(108, 92, 231, 0.35)",
              "--glow-border": "rgba(108, 92, 231, 0.6)"
            } as React.CSSProperties}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider font-data text-text-secondary mb-4">
              Socials & Contacts
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {/* GitHub */}
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all text-text-secondary hover:text-text-primary text-center select-none group col-span-1"
              >
                <Github className="w-5 h-5 text-accent-indigo" />
                <span className="text-[9px] font-semibold font-data mt-2">GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all text-text-secondary hover:text-text-primary text-center select-none group col-span-1"
              >
                <Linkedin className="w-5 h-5 text-accent-coral" />
                <span className="text-[9px] font-semibold font-data mt-2">LinkedIn</span>
              </a>

              {/* LeetCode */}
              <a
                href={PROFILE.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all text-text-secondary hover:text-text-primary text-center select-none group col-span-1"
              >
                <LeetCodeIcon className="w-5 h-5 text-accent-indigo" />
                <span className="text-[9px] font-semibold font-data mt-2">LeetCode</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all text-text-secondary hover:text-text-primary text-center select-none group col-span-1"
              >
                <Mail className="w-5 h-5 text-accent-coral" />
                <span className="text-[9px] font-semibold font-data mt-2">Email</span>
              </a>

              {/* Phone/Call */}
              <a
                href={`tel:${PROFILE.phone}`}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all text-text-secondary hover:text-text-primary text-center select-none group col-span-2 sm:col-span-1"
              >
                <Phone className="w-5 h-5 text-accent-indigo" />
                <span className="text-[9px] font-semibold font-data mt-2">Call</span>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
