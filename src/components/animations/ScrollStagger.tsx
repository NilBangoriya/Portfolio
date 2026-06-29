import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { staggerContainer, viewportDefault } from "../../lib/scrollAnimations";

interface ScrollStaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export default function ScrollStagger({
  children,
  className = "",
  stagger = 0.08,
}: ScrollStaggerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportDefault}
      variants={{
        ...staggerContainer,
        visible: {
          ...staggerContainer.visible,
          transition: { staggerChildren: stagger, delayChildren: 0.06 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { type: "spring", stiffness: 70, damping: 18 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Timeline line that draws as you scroll */
export function ScrollDrawLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="absolute inset-0 w-px bg-white/[0.06] origin-top" />
      {!reduced && (
        <motion.div
          className="absolute inset-0 w-px origin-top bg-gradient-to-b from-accent via-accent2 to-accent3/30"
          style={{ scaleY }}
        />
      )}
    </div>
  );
}
