"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMotion } from "./motion-provider";
import { Zap, ZapOff, Menu, X } from "lucide-react";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Terminal", href: "#terminal" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isMotionEnabled, toggleMotion } = useMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 inset-x-0 z-[60] flex md:justify-center justify-end py-4 transition-all duration-300 px-4",
          scrolled ? "py-4" : "py-6"
        )}
      >
        <div className="flex items-center gap-2 sm:gap-4 max-w-full">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex sm:hidden p-2.5 rounded-full transition-all duration-300 group relative border border-white/5",
              scrolled ? "glass-panel" : "bg-white/5 border border-white/5 shadow-lg shadow-black/20",
              "text-muted-foreground hover:text-white"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Desktop Navigation */}
          <nav
            className={cn(
              "hidden sm:flex items-center gap-1 sm:gap-4 px-4 sm:px-6 py-2 rounded-full transition-all duration-300",
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm sm:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[280px] z-[80] bg-card/95 backdrop-blur-xl border-l border-white/10 p-8 pt-24 sm:hidden shadow-2xl"
            >
              {/* Internal Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-8 p-2.5  hover:text-white transition-all"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-6">
                {links.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="text-2xl font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-4 group"
                    >
                      <span className="text-xs font-mono text-primary/40 group-hover:text-primary transition-colors">0{i + 1}</span>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
