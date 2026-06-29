import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { skills } from "../data/profile";
import ScrollReveal from "./animations/ScrollReveal";
import ScrollTextReveal from "./animations/ScrollTextReveal";
import ScrollStagger, { ScrollStaggerItem } from "./animations/ScrollStagger";

const colors = [
  "from-accent/20 to-accent/5 border-accent/20",
  "from-accent2/20 to-accent2/5 border-accent2/20",
  "from-accent3/20 to-accent3/5 border-accent3/20",
];

function SkillCard({
  category,
  colorClass,
  index,
}: {
  category: (typeof skills)[0];
  colorClass: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.2"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -12 : 12, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -40 : 40, 0]);

  return (
    <motion.div
      ref={ref}
      style={
        reduced
          ? undefined
          : { rotateY, x, transformPerspective: 1000, transformStyle: "preserve-3d" as const }
      }
    >
      <ScrollStaggerItem>
        <div
          className={`glass rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${colorClass} glass-hover h-full`}
        >
          <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-3">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-accent2"
            />
            {category.name}
          </h3>
          <ScrollStagger className="flex flex-wrap gap-2" stagger={0.04}>
            {category.skills.map((skill) => (
              <ScrollStaggerItem key={skill}>
                <motion.span
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="inline-block px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white/80 hover:border-accent/30 hover:text-accent transition-colors duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </ScrollStaggerItem>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal direction="left" className="mb-16">
          <p className="section-label mb-4">02 — Skills</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            My <span className="gradient-text"><ScrollTextReveal text="tech stack" as="span" delay={0.1} /></span>
          </h2>
        </ScrollReveal>

        <ScrollStagger className="grid md:grid-cols-3 gap-6" stagger={0.15}>
          {skills.map((category, ci) => (
            <SkillCard
              key={category.name}
              category={category}
              colorClass={colors[ci]}
              index={ci}
            />
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
