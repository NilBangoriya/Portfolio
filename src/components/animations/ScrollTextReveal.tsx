import { motion, useReducedMotion } from "framer-motion";
import {
  viewportDefault,
  wordStaggerVariants,
  wordVariant,
} from "../../lib/scrollAnimations";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export default function ScrollTextReveal({
  text,
  className = "",
  as = "span",
  delay = 0,
}: ScrollTextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const Component = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportDefault}
      variants={wordStaggerVariants(delay)}
      style={{ perspective: 800 }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.28em]">
          <motion.span className="inline-block" variants={wordVariant}>
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
