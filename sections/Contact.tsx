"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    // Note: You should replace 'YOUR_ACCESS_KEY_HERE' with your actual Web3Forms access key
    // Get one for free at https://web3forms.com/
    formData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY || "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error sending message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full max-w-5xl py-32 px-4 mx-auto relative mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Let&apos;s Connect</h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-md">
              I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions. Feel free to reach out!
            </p>
            
            <div className="space-y-6">
              <Link href="mailto:swamii1413@gmail.com" className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors -ml-4">
                <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <p className="text-muted-foreground group-hover:text-white/80 transition-colors">swamii1413@gmail.com</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
              
              <Link href="https://linkedin.com/in/swami13" target="_blank" className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors -ml-4">
                <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-white mb-1">LinkedIn</h4>
                  <p className="text-muted-foreground group-hover:text-white/80 transition-colors">linkedin.com/in/swami13</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
              
              <Link href="https://github.com/swami1302" target="_blank" className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors -ml-4">
                <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-white mb-1">GitHub</h4>
                  <p className="text-muted-foreground group-hover:text-white/80 transition-colors">github.com/swami1302</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </div>
          </div>
          
          <div className="bg-card p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden min-h-[500px] flex items-center">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-8">
                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                  <Button 
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="rounded-xl border-white/10 hover:bg-white/5"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 w-full relative z-10" 
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/80 ml-1">Full Name</label>
                    <input 
                      id="name" 
                      name="name"
                      type="text" 
                      required
                      placeholder="John Doe" 
                      className="w-full px-5 py-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/80 ml-1">Email Address</label>
                    <input 
                      id="email" 
                      name="email"
                      type="email" 
                      required
                      placeholder="john@example.com" 
                      className="w-full px-5 py-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/80 ml-1">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      required
                      rows={4} 
                      placeholder="How can I help you?" 
                      className="w-full px-5 py-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-muted-foreground/50 text-white"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-14 rounded-xl text-lg transition-all group mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
