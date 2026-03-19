import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Playground } from "@/sections/Playground";
import { TerminalSection } from "@/sections/TerminalSection";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Playground />
      <TerminalSection />
      <Contact />
    </main>
  );
}
