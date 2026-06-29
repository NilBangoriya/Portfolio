import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  easeOutExpo,
  revealVariants,
  type RevealDirection,
  viewportDefault,
} from "../../lib/scrollAnimations";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "span" | "h2" | "p";
  duration?: number;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  as = "div",
  duration,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportDefault}
      variants={revealVariants(direction)}
      transition={{
        ...(duration ? easeOutExpo : {}),
        delay,
        ...(duration ? { duration } : {}),
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
