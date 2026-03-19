"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Database, 
  LayoutTemplate, 
  Server, 
  Wrench,
  ChevronRight,
  ChevronDown
} from "lucide-react";

const arsenal = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: <LayoutTemplate className="w-5 h-5 text-blue-500" />,
    description: "React.js, Next.js, TypeScript, TailwindCSS, Zustand, TanStack Query, Framer Motion"
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: <Server className="w-5 h-5 text-emerald-500" />,
    description: "Node.js, Express.js, REST APIs, GraphQL, Microservices architecture"
  },
  {
    id: "databases",
    title: "Databases & ORM",
    icon: <Database className="w-5 h-5 text-purple-500" />,
    description: "PostgreSQL, Prisma ORM, MySQL, MongoDB, NeonDB, Redis"
  },
  {
    id: "platforms",
    title: "Platform & UI",
    icon: <Code2 className="w-5 h-5 text-pink-500" />,
    description: "Shopify, Polaris, Liquid, shadcn/ui, WordPress, Headless CMS"
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    icon: <Wrench className="w-5 h-5 text-amber-500" />,
    description: "Docker, Git, Linux, Cloudflare, Postman, CI/CD Pipelines"
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export function Skills() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="skills" className="w-full max-w-5xl py-32 px-4 mx-auto">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mb-16">
          <motion.div variants={itemVariants} className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4">
            The Arsenal
          </motion.div>
          <div className="max-w-3xl">
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Building at the intersection of <span className="text-primary">performance</span> and <span className="text-primary">design.</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
              Specializing in building robust SaaS applications and Shopify ecosystems. 
              My approach focuses on type-safety, performance, and maintainable architecture.
            </motion.p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {arsenal.map((item) => {
            const isExpanded = expandedId === item.id;
            
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                className="group"
              >
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className={`relative bg-card border border-white/5 p-6 rounded-[2rem] flex flex-col transition-all duration-300 cursor-pointer group-hover:border-primary/20 ${isExpanded ? 'border-primary/30 ring-1 ring-primary/10 shadow-[0_0_30px_-10px_rgba(62,207,142,0.1)]' : ''}`}
                >
                  <div className="flex items-center gap-6">
                    {/* Icon Container */}
                    <div className="flex-shrink-0 w-16 h-16 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-primary/5 group-hover:border-primary/10 transition-all duration-300">
                      {item.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        {!isExpanded && (
                          <p className="text-sm text-muted-foreground truncate max-w-[250px] mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                      {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-white/5">
                          <div className="flex flex-wrap gap-2">
                            {item.description.split(", ").map((tech) => (
                              <span key={tech} className="text-[10px] font-mono bg-white/[0.03] border border-white/10 px-2 py-1 rounded text-white/90">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
