"use client";

import { motion } from "framer-motion";
import { Background3D } from "@/components/Background3D";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, ChevronDown, FileText } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const RESUME_URL = "https://drive.google.com/file/d/1O_OmTTI8ymXqu2i62o_3CbHeThw9_8fy/view?usp=drive_link";

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 overflow-hidden pt-20">
      <Background3D />
      
      <div className="z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 inline-block">
            Available for new opportunities
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, type: "spring" }}
        >
          Swaminathan B
        </motion.h1>
        
        <motion.h2 
          className="text-xl md:text-3xl font-medium mb-8 text-gradient-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
        >
          Full Stack Developer
        </motion.h2>
        
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
        >
          Building scalable SaaS interfaces and automation systems for real businesses. 
          Obsessed with performance, clean code, and great user experiences.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
        >
          <Link href="#projects">
            <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 text-white border-0 rounded-full transition-all">
              View Work
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="h-12 px-6 rounded-full border-border/50 text-foreground hover:bg-white/5 transition-all hover:border-white/20"
            onClick={() => window.open(RESUME_URL, "_blank")}
          >
            <FileText className="w-5 h-5 mr-2" />
            Resume
          </Button>
          <Link href="https://github.com/swami1302" target="_blank">
            <Button size="lg" variant="outline" className="h-12 px-6 rounded-full border-border/50 text-foreground hover:bg-white/5 transition-all hover:border-white/20">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/swami13" target="_blank">
            <Button size="lg" variant="outline" className="h-12 px-6 rounded-full border-border/50 text-foreground hover:bg-white/5 transition-all hover:border-white/20">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Link href="#about" aria-label="Scroll down">
          <ChevronDown className="w-8 h-8 opacity-50 hover:opacity-100 transition-opacity" />
        </Link>
      </motion.div>
    </section>
  );
}
