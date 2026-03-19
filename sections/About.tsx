"use client";

import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export function About() {
  return (
    <section id="about" className="w-full max-w-4xl py-32 px-4 mx-auto relative">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8"
      >
        <motion.div variants={item}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">About Me</h2>
        </motion.div>
        
        <div className="prose prose-invert max-w-none text-lg md:text-xl text-muted-foreground leading-relaxed space-y-6">
          <motion.p variants={item}>
            I am a Full-Stack Developer experienced in building production-grade SaaS and Shopify applications 
            with a focus on <strong className="text-white font-semibold">scalable frontend systems</strong>, automation workflows, and practical backend solutions.
          </motion.p>
          <motion.p variants={item}>
            Currently based in Coimbatore, India, I specialize in crafting elegant user interfaces with React 
            and Next.js, while seamlessly connecting them to robust Node.js backend services and APIs. 
          </motion.p>
          <motion.p variants={item}>
            My recent work involves architecting merchant dashboards, creating visual <strong className="text-primary font-semibold">workflow automation 
            builders</strong> (similar to Zapier), and solving complex UI/UX challenges in the eCommerce space.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
