import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

function parseValue(raw: string): { num: number; suffix: string; prefix: string } | null {
  const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return null;
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

export default function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!inView || !parsed || reduced) {
      if (inView) setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      const current = Math.round(eased * parsed.num);
      setDisplay(`${parsed.prefix}${current}${parsed.suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, parsed, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
