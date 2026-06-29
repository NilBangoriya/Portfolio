import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgressBar() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-accent via-accent2 to-accent3"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-8 origin-left z-[59] pointer-events-none"
        style={{
          scaleX,
          background:
            "linear-gradient(to bottom, rgba(0, 240, 255, 0.08), transparent)",
        }}
      />
    </>
  );
}
