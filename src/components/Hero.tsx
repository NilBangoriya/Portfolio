import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { profile } from "../data/profile";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.7], [0, 12]);
  const blurFilter = useTransform(heroBlur, (v) => `blur(${v}px)`);

  useEffect(() => {
    const word = profile.heroWords[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayText.length < word.length) {
      timeout = setTimeout(() => {
        setDisplayText(word.slice(0, displayText.length + 1));
      }, 60);
    } else if (!deleting && displayText.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(word.slice(0, displayText.length - 1));
      }, 30);
    } else if (deleting && displayText.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % profile.heroWords.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, deleting, wordIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16"
    >
      <motion.div
        style={
          reduced
            ? undefined
            : { y: heroY, opacity: heroOpacity, scale: heroScale, filter: blurFilter }
        }
        className="relative z-10 max-w-5xl mx-auto text-center will-change-transform"
      >
        {profile.availableForHire && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="font-mono text-xs text-green-400/90">Available for hire</span>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="section-label mb-4"
        >
          {profile.title} · {profile.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6"
        >
          <span className="block text-white">{profile.name.split(" ")[0]}</span>
          <span className="block gradient-text">{profile.name.split(" ").slice(1).join(" ")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-mono text-sm sm:text-base text-accent/80 mb-12 h-8"
        >
          <span className="text-muted/60">&gt; </span>
          {displayText}
          <span className="animate-pulse text-accent">▊</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 rounded-full font-medium overflow-hidden"
            data-cursor="pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent2 to-accent3 opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent2 to-accent3 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <span className="relative text-void font-semibold">View My Work</span>
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full glass glass-hover font-medium text-white/90"
            data-cursor="pointer"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
