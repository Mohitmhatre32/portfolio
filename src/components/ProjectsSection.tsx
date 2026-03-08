import { useRef } from "react";
import { projects } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="projects" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
          <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-muted-foreground mb-16 max-w-xl text-lg">
          Award-winning projects built for hackathons and real-world impact.
        </p>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.15 }}
                className="project-card glass-card p-8 md:p-10 group hover:border-primary/20 transition-all duration-700"
                style={{
                  ["--project-color" as string]: project.color,
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        {project.event}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-foreground/60 text-base leading-relaxed mb-6 max-w-2xl">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 py-1 rounded-md text-xs font-mono bg-secondary text-secondary-foreground">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Achievement */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                      <span className="text-primary text-sm">🏆</span>
                      <span className="text-sm font-mono text-primary/80">{project.achievement}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
