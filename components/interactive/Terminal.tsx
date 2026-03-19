"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LogEntry = {
  type: "command" | "output" | "error" | "success";
  content: string | React.ReactNode;
};

const COMMANDS = {
  help: "Display all available commands",
  about: "A brief summary of who I am",
  skills: "List my technical expertise",
  projects: "Showcase my featured work",
  experience: "My professional journey",
  architecture: "Jump to the system design playground",
  contact: "How to reach out to me",
  clear: "Clear the terminal screen",
};

export function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "output", content: "Welcome to Swaminathan's CLI v1.0.0" },
    { type: "output", content: "Type 'help' to see available commands." },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ensure site starts at top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-scroll terminal body to bottom when history changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim();
    const newHistory: LogEntry[] = [...history, { type: "command", content: `> ${cmd}` }];

    switch (cleanCmd) {
      case "help":
        newHistory.push({
          type: "output",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 mt-2">
              {Object.entries(COMMANDS).map(([name, desc]) => (
                <div key={name} className="flex gap-2">
                  <span className="text-primary font-bold w-24 shrink-0">{name}</span>
                  <span className="text-neutral-500">- {desc}</span>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case "about":
        newHistory.push({
          type: "output",
          content: "I'm a Full Stack Developer obsessed with performance, automation, and building scalable SaaS systems. Currently building at Cartrabbit.",
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          content: "Frontend: React, Next.js, TS, Tailwind. Backend: Node.js, Express, PostgreSQL, Prisma. Tools: Docker, Git, Linux.",
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          content: "Featured: Sorting Visualizer, Amazon Price Tracker. Type 'architecture' to see system design work.",
        });
        break;

      case "experience":
        newHistory.push({
          type: "output",
          content: "Software Developer @ Cartrabbit (Present) | Frontend Intern @ Mallow Tech (2023).",
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          content: "Email: swamii1413@gmail.com | LinkedIn: swami13 | GitHub: swami1302",
        });
        break;

      case "architecture":
        newHistory.push({ type: "success", content: "Navigating to Architecture Diagram..." });
        const playground = document.getElementById("playground");
        if (playground) {
          playground.scrollIntoView({ behavior: "smooth" });
        }
        break;

      case "clear":
        setHistory([]);
        return;

      case "hire":
        newHistory.push({
          type: "error",
          content: "Permission denied: You are not authorized to 'hire' without sudo.",
        });
        break;

      case "sudo hire swami":
        newHistory.push({
          type: "success",
          content: "EXECUTION GRANTED: Initializing recruitment sequence... Redirecting to email contact.",
        });
        setTimeout(() => {
          window.location.href = "mailto:swamii1413@gmail.com?subject=I'd like to hire you";
        }, 1500);
        break;

      case "":
        break;

      default:
        newHistory.push({
          type: "error",
          content: `Command not found: ${cleanCmd}. Type 'help' for assistance.`,
        });
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div 
      className="w-full bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-sm md:text-base flex flex-col h-[400px] cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="bg-neutral-900 px-4 py-2 border-b border-white/10 flex items-center justify-between pointer-events-none">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
        </div>
        <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
          developer@swami: ~
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={containerRef}
        className="p-4 overflow-y-auto flex-grow hide-scrollbar space-y-2 selection:bg-primary/30 selection:text-white"
      >
        <AnimatePresence initial={false}>
          {history.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={
                entry.type === "command" ? "text-white font-bold" :
                entry.type === "error" ? "text-red-400" :
                entry.type === "success" ? "text-primary" :
                "text-neutral-400"
              }
            >
              {entry.content}
            </motion.div>
          ))}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="relative flex items-center gap-2 mt-2">
          <span className="text-primary font-bold">➜</span>
          <span className="text-white font-bold">~</span>
          <div className="relative flex-grow flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white caret-transparent z-10"
              spellCheck={false}
              autoComplete="off"
            />
            {/* Blinking Cursor Logic */}
            <div className="absolute left-0 top-0 pointer-events-none flex items-center h-full">
               <span className="invisible whitespace-pre">{input}</span>
               <span className="terminal-cursor" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
