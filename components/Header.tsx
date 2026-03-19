"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMotion } from "./motion-provider";
import { Zap, ZapOff } from "lucide-react";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Playground", href: "#playground" },
  { name: "Terminal", href: "#terminal" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { isMotionEnabled, toggleMotion } = useMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 inset-x-0 z-[60] flex justify-center py-4 transition-all duration-300",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <div className="flex items-center gap-4">
        <nav
          className={cn(
            "flex items-center gap-1 sm:gap-4 px-4 sm:px-6 py-2 rounded-full transition-all duration-300",
            scrolled ? "glass-panel" : "bg-white/5 border border-white/5 shadow-lg shadow-black/20"
          )}
        >
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-white transition-colors px-2 sm:px-3 py-1 rounded-full hover:bg-white/5"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <button
          onClick={toggleMotion}
          className={cn(
            "p-2.5 rounded-full transition-all duration-300 group relative border border-white/5",
            scrolled ? "glass-panel" : "bg-white/5 border border-white/5 shadow-lg shadow-black/20",
            isMotionEnabled ? "text-primary" : "text-muted-foreground"
          )}
          aria-label={isMotionEnabled ? "Disable animations" : "Enable animations"}
        >
          {isMotionEnabled ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 border border-neutral-800 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Motion: {isMotionEnabled ? "On" : "Off"}
          </span>
        </button>
      </div>
    </motion.header>
  );
}
