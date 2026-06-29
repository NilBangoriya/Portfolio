import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const layers = [
  {
    className: "w-[700px] h-[700px] bg-accent/12 blur-[140px] -top-[15%] -left-[10%]",
    speed: 0.15,
  },
  {
    className: "w-[550px] h-[550px] bg-accent2/10 blur-[120px] top-[35%] -right-[12%]",
    speed: 0.35,
  },
  {
    className: "w-[480px] h-[480px] bg-accent3/8 blur-[100px] bottom-[5%] left-[20%]",
    speed: 0.55,
  },
  {
    className: "w-[900px] h-[400px] bg-accent/6 blur-[160px] top-[55%] left-[30%]",
    speed: 0.75,
  },
];

function ParallaxOrb({
  className,
  speed,
}: {
  className: string;
  speed: number;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * speed);
  const scale = useTransform(scrollY, [0, 2000], [1, 1.2 + speed * 0.3]);

  return (
    <motion.div
      style={{ y, scale }}
      className={`absolute rounded-full pointer-events-none ${className}`}
    />
  );
}

export default function DepthAtmosphere() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-accent/8 blur-[120px] top-1/4 left-1/4 rounded-full" />
        <div className="absolute w-[500px] h-[500px] bg-accent2/6 blur-[100px] bottom-1/4 right-1/4 rounded-full" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {layers.map((layer, i) => (
        <ParallaxOrb key={i} className={layer.className} speed={layer.speed} />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050508_75%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void/90" />
    </div>
  );
}
