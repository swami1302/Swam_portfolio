"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Software Developer",
    company: "Cartrabbit",
    period: "July 2024 – Present",
    location: "India",
    achievements: [
      "Architected and shipped an eCommerce SaaS platform and Shopify App within 12 months.",
      "Owned and engineered ~70% of the frontend architecture using React and TypeScript.",
      "Built merchant dashboards supporting Reviews, Loyalty, Referrals, and Membership modules.",
      "Developed a visual workflow automation builder (similar to Zapier) using React Flow used by 50+ merchants.",
      "Designed and implemented backend services for the Referral module using Node.js, Express, PostgreSQL, and Prisma ORM.",
      "Improved dashboard performance by 25% and reduced onboarding friction by 35%.",
    ],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "React Flow", "Shopify"],
  },
  {
    role: "Frontend Developer Intern",
    company: "Mallow Technologies",
    period: "Aug 2023 – Oct 2023",
    location: "India",
    achievements: [
      "Developed responsive UI using React, HTML, CSS, and JavaScript.",
      "Improved user engagement by 30%.",
      "Worked within Agile development cycles delivering features ahead of schedule.",
    ],
    tech: ["React", "JavaScript", "HTML5", "CSS3", "Agile"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="w-full max-w-5xl py-32 px-4 mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-16"
        >
          Work Experience
        </motion.h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white/10">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2, type: "spring", stiffness: 100 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Timeline Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 bg-background shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-2xl bg-card border border-white/5 transition-all hover:border-primary/50">
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-4 gap-2">
                  <div>
                    <h3 className="font-bold text-2xl text-foreground mb-1">{exp.role}</h3>
                    <div className="text-primary font-medium flex items-center gap-2">
                      <span>{exp.company}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                      <span className="text-sm text-muted-foreground">{exp.location}</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full whitespace-nowrap self-start">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="list-disc list-outside ml-4 space-y-3 text-muted-foreground mb-6 leading-relaxed marker:text-primary/50">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.tech.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-white/70 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
