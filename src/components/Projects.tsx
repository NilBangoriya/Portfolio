import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { projects } from "../data/profile";
import ScrollReveal from "./animations/ScrollReveal";
import ScrollTextReveal from "./animations/ScrollTextReveal";
import ScrollScaleCard from "./animations/ScrollScaleCard";

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal
          direction="up"
          className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="section-label mb-4">03 — Projects</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
              Selected <span className="gradient-text"><ScrollTextReveal text="work" as="span" /></span>
            </h2>
          </div>
          <motion.a
            href="https://github.com/nilbangoriya"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 6 }}
            className="font-mono text-sm text-accent hover:text-glow transition-colors"
            data-cursor="pointer"
          >
            View all on GitHub →
          </motion.a>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.35"],
  });

  const slideX = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -80 : 80, 0]
  );

  return (
    <ScrollScaleCard index={index}>
      <motion.article
        ref={ref}
        style={reduced ? undefined : { x: slideX }}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={`group relative glass rounded-2xl p-8 glass-hover overflow-hidden ${
          project.highlight ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-8 md:items-center" : ""
        }`}
      >
        {project.highlight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full pointer-events-none"
          />
        )}

        <div className={project.highlight ? "relative" : ""}>
          {project.highlight && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-accent/10 text-accent border border-accent/20 mb-4"
            >
              ★ {project.highlight}
            </motion.span>
          )}
          <h3 className="font-display text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-500">
            {project.title}
          </h3>
          <p className="text-muted leading-relaxed mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, ti) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: ti * 0.05, type: "spring", stiffness: 200 }}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.03] text-muted border border-white/[0.05]"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-accent/80 hover:text-accent transition-colors flex items-center gap-1"
                data-cursor="pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.395-.135-.345-.72-1.395-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.02 8.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Source
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-accent2/80 hover:text-accent2 transition-colors"
                data-cursor="pointer"
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>

        {project.highlight && (
          <motion.div
            initial={{ opacity: 0, rotateY: -20 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex items-center justify-center relative mt-8 md:mt-0"
            style={{ perspective: 1000 }}
          >
            <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-accent/5 via-accent2/5 to-accent3/5 border border-white/[0.06] flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full p-6">
                <div className="absolute inset-0 opacity-30">
                  {[...Array(5)].map((_, row) => (
                    <div key={row} className="flex justify-center gap-4 mb-4">
                      {[...Array(4)].map((_, col) => (
                        <motion.div
                          key={col}
                          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: (row + col) * 0.2,
                          }}
                          className="w-3 h-3 rounded-full bg-accent/40"
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="relative z-10 font-mono text-xs text-muted/60 space-y-2">
                  <p><span className="text-accent">query</span> → embed → retrieve</p>
                  <p><span className="text-accent2">context</span> → rerank → generate</p>
                  <p><span className="text-accent3">response</span> → cite → validate</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.article>
    </ScrollScaleCard>
  );
}
