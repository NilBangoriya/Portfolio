import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { experience } from "../data/profile";
import ScrollReveal from "./animations/ScrollReveal";
import ScrollTextReveal from "./animations/ScrollTextReveal";
export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.7", "end 0.3"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal direction="right" className="mb-16">
          <p className="section-label mb-4">04 — Experience</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            Where I've <span className="gradient-text"><ScrollTextReveal text="built" as="span" /></span>
          </h2>
        </ScrollReveal>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.06]" />
            {!reduced && (
              <motion.div
                className="absolute inset-0 origin-top bg-gradient-to-b from-accent via-accent2 to-accent3/20"
                style={{ scaleY: lineScale }}
              />
            )}
          </div>

          {experience.map((job, i) => (
            <ExperienceItem key={`${job.company}-${job.period}`} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({
  job,
  index,
}: {
  job: (typeof experience)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -60 : 60, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const dotScale = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.5, 1]);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="hidden md:block md:w-1/2" />

      <motion.div
        style={reduced ? undefined : { scale: dotScale }}
        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-void border-2 border-accent z-10 mt-1"
      >
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-accent/40"
        />
        <div className="absolute inset-0.5 rounded-full bg-accent/50" />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { x, opacity }}
        className={`md:w-1/2 pl-10 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="glass rounded-2xl p-6 sm:p-8 glass-hover"
        >
          <span className="font-mono text-xs text-accent/70">{job.period}</span>
          <h3 className="font-display text-xl font-bold mt-2 mb-1">{job.role}</h3>
          <p className="text-accent2/80 font-medium mb-3">{job.company}</p>
          <p className="text-muted text-sm mb-4">{job.description}</p>
          <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-left" : ""}`}>
            {job.highlights.map((h, hi) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: hi * 0.08 }}
                className="text-sm text-muted/90 flex items-start gap-2"
              >
                <span className="text-accent mt-1 shrink-0">▸</span>
                {h}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
