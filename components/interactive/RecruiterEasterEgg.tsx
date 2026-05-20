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
import { Rocket, Star, Code, Briefcase, Mail, Sparkles, FileText, Terminal, Send, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function RecruiterEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const RESUME_URL = "https://drive.google.com/file/d/14McipqpVnf_RR9NprpABC3RNMRCN9mct/view?usp=sharing";

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      toast.error("Web3Forms access key is missing.");
      setIsSubmitting(false);
      return;
    }

    formData.append("access_key", accessKey);
    formData.append("subject", "Recruiter Inquiry — Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        toast.success("Message sent! I'll get back to you soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Error sending message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) { setShowForm(false); setIsSuccess(false); } }}>
        <DialogContent className="w-[95vw] sm:max-w-[500px] bg-card border-white/10 p-0 overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="highlights"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 md:p-8"
              >
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
                    onClick={() => setShowForm(true)}
                    variant="outline"
                    className="w-full border-white/10 hover:bg-white/5 h-11 md:h-12 rounded-xl text-white text-sm md:text-base"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Get in Touch
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-6 md:p-8"
              >
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-8"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground text-sm mb-6">I&apos;ll get back to you as soon as possible.</p>
                      <Button
                        variant="outline"
                        className="rounded-xl border-white/10 hover:bg-white/5 text-white"
                        onClick={() => { setIsSuccess(false); setShowForm(false); }}
                      >
                        Back to Highlights
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div key="contact-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <button
                          onClick={() => setShowForm(false)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div>
                          <h3 className="text-lg font-bold text-white">Get in Touch</h3>
                          <p className="text-xs text-muted-foreground">I&apos;ll reply within 24 hours</p>
                        </div>
                      </div>

                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/80 ml-1">Your Name</label>
                          <input
                            name="name"
                            type="text"
                            required
                            placeholder="Jane Smith"
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/80 ml-1">Work Email</label>
                          <input
                            name="email"
                            type="email"
                            required
                            placeholder="jane@company.com"
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/80 ml-1">Message</label>
                          <textarea
                            name="message"
                            required
                            rows={3}
                            placeholder="Tell me about the role or opportunity..."
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-muted-foreground/50 text-white text-sm"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-12 rounded-xl transition-all group"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
