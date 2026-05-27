"use client";

import { motion, Variants } from "framer-motion";
import { Github, ExternalLink, Activity, Rocket, Zap, Share2, Layers, CheckCircle2, Construction, GitBranch, ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Workflow Automation Builder",
    description: "A low-code visual workflow automation platform built with Next.js, enabling users to model multi-step business logic with a drag-and-drop canvas. Supports specialized node types with type-safe configuration.",
    tech: ["Next.js", "@xyflow/react", "NestJS", "Prisma", "PostgreSQL", "Zod", "React Hook Form"],
    github: "https://github.com/swami1302/workflow_automation",
    live: "https://workflow-automation-swart.vercel.app/",
    icon: <Rocket className="w-12 h-12 text-primary/50 group-hover:text-primary transition-colors" />,
    points: [
      "Built a low-code visual workflow automation platform (similar to n8n/Zapier) using Next.js and @xyflow/react, featuring a drag-and-drop canvas for modeling business logic without code",
      "Designed 6 specialized node types (Trigger, HTTP, Binary, Delay, Log, Exit) each with Zod-validated schemas and react-hook-form for type-safe configuration",
      "Developed a NestJS REST API with JWT authentication and Prisma ORM for persisting workflow graph state (nodes, edges, configurations) to PostgreSQL",
      "Architected the backend to support a future BullMQ execution engine — node types like Delay and Trigger are designed with job-queue execution in mind"
    ]
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
                  YUKO — All-in-one Customer Retention Platform
                </h3>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Architected and engineered YUKO, a comprehensive retention suite for Shopify and WooCommerce. 
                  Consolidates 5+ fragmented apps into a single powerful dashboard for Loyalty, Referrals, Reviews, and VIP Tiers, 
                  delivering a unified customer experience that drives loyalty and maximizes lifetime value.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Core Modules</h4>
                    <ul className="space-y-3">
                      {[
                        "Visual Workflow Automation", 
                        "Loyalty & Rewards (12+ Rules)", 
                        "Advanced Referral Engine", 
                        "Product Reviews & Social Proof",
                        "Tiered VIP Memberships",
                        "Shopify & WooCommerce Native"
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
                        <div className="text-xl font-bold text-white">47% Lift</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Average Lift in CLV</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="text-xl font-bold text-white">3.2x</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Repeat Purchase Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                  {["React", "Next.js", "TypeScript", "React Flow", "Node.js", "PostgreSQL", "Prisma", "Shopify API"].map((t) => (
                    <span key={t} className="text-[10px] font-mono bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded text-white/80 uppercase tracking-tighter">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-auto pt-8 border-t border-white/5">
                  <Link href="https://yuko.so/" target="_blank">
                    <Button className="rounded-xl bg-primary hover:bg-primary/90 text-black transition-all h-12 px-8 shadow-[0_0_15px_-3px_rgba(62,207,142,0.4)]">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Landing Page
                    </Button>
                  </Link>
                  <div className="flex items-center px-6 rounded-xl bg-white/5 border border-white/10 text-white/40 text-sm font-medium h-12 cursor-default">
                    Enterprise SaaS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group h-full flex flex-col"
            >
              <div className="bg-card border border-primary/20 h-full flex flex-col overflow-hidden rounded-[2rem] transition-all duration-500 hover:border-primary/50 shadow-xl">
                
                <div className="h-48 bg-white/[0.02] w-full flex items-center justify-center border-b border-white/5 relative overflow-hidden group-hover:bg-primary/[0.03] transition-colors duration-500">
                  <div className="relative z-20 transform group-hover:scale-110 transition-transform duration-500">
                    {project.icon}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {project.points.map((point, idx) => (
                      <li key={idx} className="flex gap-3 text-xs text-neutral-400 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  
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
                        <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-black transition-all h-12 shadow-[0_0_15px_-3px_rgba(62,207,142,0.4)]">
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
