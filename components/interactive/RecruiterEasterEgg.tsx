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

  const RESUME_URL = "https://drive.google.com/file/d/1O_OmTTI8ymXqu2i62o_3CbHeThw9_8fy/view?usp=drive_link";

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
      <div className="fixed bottom-8 right-8 z-[100] hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-black border border-primary/30 px-4 py-3 rounded-2xl shadow-2xl hover:border-primary transition-all duration-300 overflow-hidden"
        >
          {/* Pulse effect */}
          <span className="absolute inset-0 bg-primary/5 animate-pulse group-hover:bg-primary/10 transition-colors" />
          
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Briefcase className="w-4 h-4" />
          </div>
          
          <div className="text-left flex flex-col gap-2">
            <div className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">
              Recruiter?
            </div>
            <div className="text-sm font-bold text-white leading-none">
              Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded border border-white/20 text-xs font-mono uppercase">Shift + R</kbd>
            </div>
          </div>

          <div className="ml-2">
            <Sparkles className="w-4 h-4 text-primary animate-bounce" />
          </div>
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] bg-card border-white/10 p-0 overflow-hidden">
          <div className="p-8 relative">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-primary/20 text-primary rounded-xl">
                  <Rocket className="w-6 h-6 animate-bounce" />
                </div>
                <DialogTitle className="text-2xl font-bold text-white">
                  Recruiter Mode Activated
                </DialogTitle>
              </div>
              <DialogDescription className="text-base text-gray-400 leading-relaxed">
                You found the secret handshake! Here&apos;s a quick summary of why I&apos;d be a great fit for your engineering team.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">The Highlights</h4>
              <ul className="space-y-4">
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
                    <div className="text-primary/60">{item.icon}</div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.li>
                ))}
                </ul>
                </div>

                <div className="flex flex-col gap-3">
                <Button 
                onClick={() => window.open(RESUME_URL, "_blank")}
                className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-12 rounded-xl"
                >
                <FileText className="w-4 h-4 mr-2" />
                View Resume
                </Button>

              <Button 
                onClick={() => window.location.href = "mailto:swamii1413@gmail.com"}
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5 h-12 rounded-xl text-white"
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
