import { useState } from "react";
import { profile } from "@/lib/data";
import { motion } from "framer-motion";
import { Github, Linkedin, Code2 as LeetCode } from "lucide-react";

const socials = [
  { label: "GitHub", url: profile.github || "#", icon: Github },
  { label: "LinkedIn", url: profile.linkedin || "#", icon: Linkedin },
  { label: "LeetCode", url: profile.leetcode || "#", icon: LeetCode },
];

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6">
          <span className="gradient-text">Let's Build</span>
          <br />
          <span className="text-foreground">Something Extraordinary</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-16 max-w-xl mx-auto">
          Open to collaborations, internships, and projects that push boundaries.
        </p>

        {/* Email */}
        <button
          onClick={copyEmail}
          className="magnetic-btn group glass-card px-8 py-4 rounded-xl mb-10 inline-flex items-center gap-4 hover:border-primary/30 transition-all duration-500"
        >
          <span className="text-foreground/80 font-mono text-sm md:text-base">{profile.email}</span>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs font-mono text-primary/60"
          >
            {copied ? "Copied!" : "Click to copy"}
          </motion.span>
        </button>

        {/* Socials */}
        <div className="flex justify-center gap-4">
          {socials.map(s => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn glass-card w-14 h-14 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-500"
                aria-label={s.label}
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} />
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border/30">
          <p className="text-xs font-mono text-muted-foreground/40">
            Designed & built by {profile.name} · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
