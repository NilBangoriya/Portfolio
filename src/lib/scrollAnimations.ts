import type { Transition, Variants } from "framer-motion";

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 70,
  damping: 18,
  mass: 0.8,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
};

export const easeOutExpo: Transition = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1],
};

export const viewportDefault = {
  once: true,
  margin: "-80px" as const,
  amount: 0.25 as const,
};

export const viewportEarly = {
  once: true,
  margin: "-40px" as const,
  amount: 0.15 as const,
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springSmooth,
  },
};

export type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "blur" | "rotate";

const directionOffsets: Record<
  RevealDirection,
  { hidden: Record<string, number | string>; visible: Record<string, number | string> }
> = {
  up: { hidden: { y: 70 }, visible: { y: 0 } },
  down: { hidden: { y: -50 }, visible: { y: 0 } },
  left: { hidden: { x: -60 }, visible: { x: 0 } },
  right: { hidden: { x: 60 }, visible: { x: 0 } },
  scale: { hidden: { scale: 0.85 }, visible: { scale: 1 } },
  blur: { hidden: { filter: "blur(12px)" }, visible: { filter: "blur(0px)" } },
  rotate: { hidden: { rotate: -4, y: 30 }, visible: { rotate: 0, y: 0 } },
};

export function revealVariants(
  direction: RevealDirection = "up",
  extra?: Partial<Variants["hidden"]>
): Variants {
  const offset = directionOffsets[direction];
  return {
    hidden: {
      opacity: 0,
      ...offset.hidden,
      ...extra,
    },
    visible: {
      opacity: 1,
      ...offset.visible,
      transition: springSmooth,
    },
  };
}

export function wordStaggerVariants(delay = 0): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };
}

export const wordVariant: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: springSnappy,
  },
};
