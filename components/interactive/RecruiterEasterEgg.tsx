"use client";

import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Star, Code, Briefcase, Mail, Sparkles, FileText, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecruiterEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);

  const RESUME_URL = "https://drive.google.com/file/d/14McipqpVnf_RR9NprpABC3RNMRCN9mct/view?usp=sharing";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "r") {
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Initial console welcome
    console.log(
      "%c👋 Hey recruiter! Thanks for checking the console.\n%cLooking for a React / SaaS engineer?\n%cLet's connect: swamii1413@gmail.com",
      "color: #3ecf8e; font-size: 20px; font-weight: bold;",
      "color: #888; font-size: 14px;",
      "color: #3ecf8e; font-size: 14px; font-weight: bold;"
    );

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Persistent Recruiter Hint */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-black/80 backdrop-blur-md border border-primary/30 px-3 py-2 md:px-4 md:py-3 rounded-2xl shadow-2xl hover:border-primary transition-all duration-300 overflow-hidden"
        >
          {/* Pulse effect */}
          <span className="absolute inset-0 bg-primary/5 animate-pulse group-hover:bg-primary/10 transition-colors" />
          
          <div className="p-1.5 md:p-2 bg-primary/10 text-primary rounded-lg">
            <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </div>
          
          <div className="text-left flex flex-col gap-1 md:gap-2">
            <div className="text-[9px] md:text-[10px] text-primary font-bold uppercase tracking-widest leading-none">
              Recruiter?
            </div>
            <div className="text-xs md:text-sm font-bold text-white leading-none">
              <span className="md:hidden">Click Here</span>
              <span className="hidden md:inline">Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded border border-white/20 text-xs font-mono uppercase">Shift + R</kbd></span>
            </div>
          </div>

          <div className="ml-1 md:ml-2">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary animate-bounce" />
          </div>
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[500px] bg-card border-white/10 p-0 overflow-hidden rounded-2xl">
          <div className="p-6 md:p-8 relative">
            <DialogHeader className="mb-4 md:mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 md:p-3 bg-primary/20 text-primary rounded-xl">
                  <Rocket className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
                </div>
                <DialogTitle className="text-xl md:text-2xl font-bold text-white">
                  Recruiter Mode Activated
                </DialogTitle>
              </div>
              <DialogDescription className="text-sm md:text-base text-gray-400 leading-relaxed">
                You found the secret handshake! Here&apos;s a quick summary of why I&apos;d be a great fit for your engineering team.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <h4 className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2 md:mb-4">The Highlights</h4>
              <ul className="space-y-3 md:space-y-4">
                {[
                  { icon: <Code className="w-4 h-4" />, text: "Strong expertise in React, Next.js & TypeScript" },
                  { icon: <Terminal className="w-4 h-4" />, text: "Built and scaled production SaaS systems" },
                  { icon: <Star className="w-4 h-4" />, text: "Specialized in Shopify app architecture" },
                  { icon: <FileText className="w-4 h-4" />, text: "Resume available for viewing below" },
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="text-primary/60 shrink-0">{item.icon}</div>
                    <span className="text-xs md:text-sm font-medium">{item.text}</span>
                  </motion.li>
                ))}
                </ul>
                </div>

                <div className="flex flex-col gap-3">
                <Button 
                onClick={() => window.open(RESUME_URL, "_blank")}
                className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-11 md:h-12 rounded-xl text-sm md:text-base"
                >
                <FileText className="w-4 h-4 mr-2" />
                View Resume
                </Button>

              <Button 
                onClick={() => window.location.href = "mailto:swamii1413@gmail.com"}
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5 h-11 md:h-12 rounded-xl text-white text-sm md:text-base"
              >
                <Mail className="w-4 h-4 mr-2" />
                Get in Touch
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
