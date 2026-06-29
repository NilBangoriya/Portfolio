import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.1"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  if (reduced) {
    return <div ref={ref} className="h-24" aria-hidden />;
  }

  return (
    <div ref={ref} className="relative h-32 flex items-center justify-center overflow-hidden" aria-hidden>
      <motion.div
        style={{ scaleX, opacity }}
        className="w-full max-w-4xl h-px origin-center bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <motion.div
        style={{ scale: scaleX, opacity }}
        className="absolute w-2 h-2 rounded-full bg-accent/60 blur-[1px]"
      />
    </div>
  );
}
