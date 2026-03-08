import { useState } from "react";
import { experience } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

const ExperienceSection = () => {
  const [activeCommands, setActiveCommands] = useState<Set<number>>(new Set(experience.map((_, i) => i))); // Open all by default

  const toggleCommand = (index: number) => {
    setActiveCommands(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section id="experience" className="relative py-20 px-6 flex justify-center w-full">
      <div className="w-full max-w-7xl">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
          <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-muted-foreground mb-16 text-lg">
          Click commands to explore the timeline.
        </p>

        {/* Terminal Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card overflow-hidden border border-primary/20 shadow-glow rounded-xl bg-background/80 backdrop-blur-2xl"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-6 py-4 bg-[#1e1e1e]/50 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-4 flex-1 text-center text-xs font-mono text-muted-foreground opacity-60">mohit@portfolio ~ experience</span>
          </div>

          {/* Terminal body */}
          <div className="p-6 md:p-8 space-y-6 font-mono text-sm md:text-base selection:bg-primary/30 selection:text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="terminal-line text-muted-foreground"
            >
              <span className="text-primary mr-2">❯</span> ls experience/
            </motion.div>

            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="terminal-line"
              >
                <button
                  onClick={() => toggleCommand(i)}
                  className="flex items-center gap-2 text-left w-full group py-1"
                >
                  <span className="text-primary mr-1">❯</span>
                  <span className="text-foreground/90 group-hover:text-primary transition-colors duration-300">
                    cat {exp.command}.md
                  </span>
                  <span className="text-muted-foreground/30 text-[10px] ml-auto">
                    {activeCommands.has(i) ? "▼" : "▶"}
                  </span>
                </button>

                <AnimatePresence>
                  {activeCommands.has(i) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 ml-6 pl-4 border-l-2 border-primary/20 space-y-3 font-sans pb-4">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                          <div>
                            <p className="text-foreground font-display text-xl md:text-2xl font-bold">
                              {exp.role}
                            </p>
                            <p className="text-primary font-medium text-lg mt-1">{exp.company}</p>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-mono w-fit">
                            {exp.period}
                          </div>
                        </div>
                        <p className="text-foreground/70 font-body text-base leading-relaxed max-w-2xl mt-4 whitespace-pre-wrap">
                          {exp.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="terminal-line flex items-center gap-2 mt-4"
            >
              <span className="text-primary mr-1">❯</span>
              <span className="w-2.5 h-5 bg-primary/80 animate-pulse" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
