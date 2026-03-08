import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({
        behavior: "smooth",
      });
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "py-3 bg-background/70 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "py-6 bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={(e) => handleScroll(e as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>, "#hero")}
            className="text-foreground font-display font-bold text-xl tracking-tight flex items-center"
          >
            M<span className="text-primary text-2xl leading-none">.</span><span className="text-primary">dev</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={(e) => handleScroll(e as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>, item.href)}
                className="text-sm font-body font-medium text-foreground/80 hover:text-primary hover:-translate-y-0.5 transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
          >
            <div className="space-y-1.5">
              <div className={`w-6 h-px bg-foreground transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <div className={`w-6 h-px bg-foreground transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <div className={`w-6 h-px bg-foreground transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={(e) => handleScroll(e as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>, item.href)}
                  className="text-2xl font-display font-bold text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
