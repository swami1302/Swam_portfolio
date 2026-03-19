"use client";

import { motion } from "framer-motion";
import { PerformanceOptimizer } from "@/components/interactive/PerformanceOptimizer";
import { SystemDesignPlayground } from "@/components/interactive/SystemDesignPlayground";

export function Playground() {
  return (
    <section id="playground" className="w-full max-w-6xl py-32 px-4 mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Engineering Showcase
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Interactive experiences demonstrating system understanding, performance optimization, and architectural design.
          </motion.p>
        </div>

        <div className="space-y-24">
          
          {/* Performance Optimizer */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex flex-col gap-6"
          >
            <div className="mb-2">
              <h3 className="text-3xl font-bold mb-3">Performance Optimizer Simulator</h3>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">Toggle different optimization techniques to see their impact on frontend metrics. Demonstrates knowledge of modern web performance strategies.</p>
            </div>
            <PerformanceOptimizer />
          </motion.div>

          <hr className="border-white/10" />

          {/* System Design Playground */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex flex-col gap-6"
          >
            <div className="mb-2">
              <h3 className="text-3xl font-bold mb-3">Full Stack Architecture</h3>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">An interactive visualization of a typical scalable full stack architecture. Click on the nodes to learn about the responsibilities of each component.</p>
            </div>
            <SystemDesignPlayground />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
