"use client";

import { motion, Variants } from "framer-motion";
import { Github, ExternalLink, Activity, Rocket, Zap, Share2, Layers, CheckCircle2, Construction, GitBranch, ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Sorting Algorithms Visualizer",
    description: "Interactive algorithm visualization tool demonstrating Bubble Sort and Insertion Sort with HTML5 Canvas rendering. Reduced animation lag by 25%.",
    tech: ["React", "HTML5 Canvas", "JavaScript", "CSS"],
    github: "https://github.com/swami1302/Sorting_visualizer",
    live: "https://sortvisualizer13.vercel.app",
    icon: <Activity className="w-12 h-12 text-primary/50 group-hover:text-primary transition-colors" />,
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
};

export function Projects() {
  const scrollToArchitecture = () => {
    const element = document.getElementById("playground");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="w-full max-w-6xl py-32 px-4 mx-auto">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight mb-16">
          Selected Projects
        </motion.h2>

        {/* Flagship SaaS Project */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -10 }}
          className="mb-16 group"
        >
          <div className="bg-card border border-primary/20 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-primary/50 shadow-2xl relative">
            {/* Featured Badge */}
            <div className="absolute top-6 left-6 z-20">
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                <Rocket className="w-3.5 h-3.5" />
                Flagship Project
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Visual Side */}
              <div className="lg:col-span-5 bg-white/[0.02] border-b lg:border-b-0 lg:border-r border-white/5 relative min-h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,207,142,0.05)_0%,transparent_70%)]" />
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-700 flex flex-col items-center gap-4">
                  <div className="p-6 rounded-3xl bg-primary/10 text-primary">
                    <Zap className="w-16 h-16" />
                  </div>
                  <div className="flex gap-3">
                    <div className="p-3 rounded-xl bg-white/5 text-white/40"><Share2 className="w-6 h-6" /></div>
                    <div className="p-3 rounded-xl bg-white/5 text-white/40"><Layers className="w-6 h-6" /></div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-primary transition-colors">
                  E-commerce SaaS Platform & Shopify App
                </h3>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Built a production-grade SaaS platform and Shopify application enabling merchants to manage reviews, loyalty programs, referrals, and membership systems.
                  The platform includes a visual workflow automation builder allowing merchants to configure triggers and actions using a drag-and-drop interface.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Core Modules</h4>
                    <ul className="space-y-3">
                      {[
                        "Visual Workflow Automation", 
                        "Advanced Referral Engine", 
                        "Loyalty & Rewards System", 
                        "Reviews & Social Proof",
                        "Tiered Membership Plans",
                        "Shopify & WooCommerce Support"
                      ].map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-primary/60" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Business Impact</h4>
                    <div className="space-y-4">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="text-xl font-bold text-white">50+</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Active Merchants</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="text-xl font-bold text-white">-35%</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Onboarding Friction</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                  {["React", "Next.js", "TypeScript", "React Flow", "Node.js", "PostgreSQL", "Prisma", "Redis"].map((t) => (
                    <span key={t} className="text-[10px] font-mono bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded text-white/80 uppercase tracking-tighter">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-auto pt-8 border-t border-white/5">
                  <Button 
                    onClick={scrollToArchitecture}
                    variant="outline" 
                    className="rounded-xl border-white/10 hover:bg-white/5 hover:text-white transition-all h-12"
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    View Architecture
                  </Button>
                  <div className="flex items-center px-6 rounded-xl bg-white/5 border border-white/10 text-white/40 text-sm font-medium italic h-12 cursor-default">
                    Private / Production System
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ongoing Project: Workflow Automation Builder */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="group h-full flex flex-col"
          >
            <div className="bg-card/50 border border-white/5 border-dashed h-full flex flex-col overflow-hidden rounded-[2rem] transition-all duration-500 hover:border-primary/30 relative">
              <div className="absolute top-4 right-4 z-20">
                <span className="text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                  Currently Building
                </span>
              </div>

              <div className="h-48 bg-white/[0.02] w-full flex items-center justify-center border-b border-white/5 relative overflow-hidden group-hover:bg-primary/[0.02] transition-colors duration-500">
                <GitBranch className="w-12 h-12 text-neutral-600 group-hover:text-primary/40 transition-colors duration-500" />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-neutral-300 group-hover:text-primary transition-colors">
                    Workflow Automation Builder
                  </h3>
                </div>
                
                <p className="text-sm text-neutral-500 mb-6 flex-grow leading-relaxed">
                  Building a visual workflow automation system that allows users to create trigger-based actions using a drag-and-drop interface, similar to tools like Zapier and n8n.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-neutral-500">Milestones</span>
                    <span className="text-primary/60">Active Dev</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500/50" />
                      <span>Core UI & Editor</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <div className="w-3 h-3 rounded-full border border-neutral-700 flex items-center justify-center">
                        <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                      </div>
                      <span>Execution Engine</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {["React Flow", "TypeScript", "Zustand", "Redis"].map((t) => (
                    <span 
                      key={t} 
                      className="px-3 py-1 text-[10px] font-mono rounded-full bg-white/5 text-neutral-500 border border-white/10 uppercase tracking-tighter"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-[10px] text-neutral-600 italic mb-4">
                  * This project is currently under active development.
                </p>

                <div className="pt-6 border-t border-white/5 mt-auto">
                  <Button disabled variant="ghost" className="w-full rounded-xl text-neutral-600 bg-white/5 cursor-not-allowed">
                    Documentation Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Regular Project */}
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group h-full flex flex-col"
            >
              <div className="bg-card border border-white/5 h-full flex flex-col overflow-hidden rounded-[2rem] transition-all duration-500 hover:border-primary/50">
                
                <div className="h-48 bg-white/5 w-full flex items-center justify-center border-b border-white/5 relative overflow-hidden group-hover:bg-primary/5 transition-colors duration-500">
                  <div className="relative z-20 transform group-hover:scale-110 transition-transform duration-500">
                    {project.icon}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.tech.map((t) => (
                      <span 
                        key={t} 
                        className="px-3 py-1 text-[10px] font-mono rounded-full bg-white/5 text-white/70 border border-white/10 uppercase tracking-tighter"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-white/5">
                    {project.github && (
                      <Link href={project.github} target="_blank" className="flex-1">
                        <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-white/10 hover:text-white transition-all h-12">
                          <Github className="w-4 h-4 mr-2" />
                          Source
                        </Button>
                      </Link>
                    )}
                    {project.live && (
                      <Link href={project.live} target="_blank" className="flex-1">
                        <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white transition-all h-12 shadow-[0_0_15px_-3px_rgba(62,207,142,0.4)]">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Site
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
