"use client";

import { motion } from "framer-motion";
import { Terminal } from "@/components/interactive/Terminal";
import { Terminal as TerminalIcon } from "lucide-react";

export function TerminalSection() {
  return (
    <section id="terminal" className="w-full max-w-5xl py-32 px-4 mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center mb-12">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <TerminalIcon className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Interactive CLI
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Prefer the command line? Use this interactive terminal to explore my background, skills, and projects through a developer-first interface.
          </p>
        </div>

        <Terminal />
      </motion.div>
    </section>
  );
}
