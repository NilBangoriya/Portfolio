import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollScaleCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export default function ScrollScaleCard({
  children,
  className = "",
  index = 0,
}: ScrollScaleCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.3"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60 + index * 8, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        y,
        rotateX,
        opacity,
        transformPerspective: 1200,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
