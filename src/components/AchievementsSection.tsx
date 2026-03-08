import { useRef } from "react";
import { achievements } from "@/lib/data";
import { motion } from "framer-motion";

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="achievements" className="relative py-20 overflow-hidden px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
          <span className="gradient-text">Achievements</span>
        </h2>
        <p className="text-muted-foreground mb-16 max-w-xl text-lg">
          Milestones from hackathons and competitions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
              className="glass-card p-8 group hover:border-primary/30 relative overflow-hidden transition-all duration-500"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary/80">
                    {a.year}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary/60 group-hover:text-primary transition-colors">
                    🏆
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-500">
                  {a.title}
                </h3>

                <p className="text-base text-muted-foreground font-body leading-relaxed mt-auto">
                  {a.event}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
