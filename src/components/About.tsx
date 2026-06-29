import { motion } from "framer-motion";
import { profile } from "../data/profile";
import ScrollReveal from "./animations/ScrollReveal";
import ScrollTextReveal from "./animations/ScrollTextReveal";
import AnimatedCounter from "./animations/AnimatedCounter";
import ScrollStagger, { ScrollStaggerItem } from "./animations/ScrollStagger";
import Parallax from "./animations/Parallax";

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="blur" className="mb-16">
          <p className="section-label mb-4">01 — About</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold max-w-xl">
            <ScrollTextReveal text="Turning" as="span" />{" "}
            <span className="gradient-text">
              <ScrollTextReveal text="research into reality" as="span" delay={0.15} />
            </span>
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <ScrollStagger className="space-y-6">
            {profile.about.map((paragraph) => (
              <ScrollStaggerItem key={paragraph.slice(0, 24)}>
                <p className="text-muted text-lg leading-relaxed">{paragraph}</p>
              </ScrollStaggerItem>
            ))}

            <ScrollStaggerItem>
              <div className="flex flex-wrap gap-3 pt-4">
                {["Open to full-time", "Remote-friendly", "Contract work"].map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05, borderColor: "rgba(0,240,255,0.4)" }}
                    className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 text-muted"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </ScrollStaggerItem>
          </ScrollStagger>

          <ScrollStagger className="grid grid-cols-2 gap-4" stagger={0.12}>
            {profile.stats.map((stat) => (
              <ScrollStaggerItem key={stat.label}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass rounded-2xl p-6 glass-hover group"
                >
                  <div className="font-display text-4xl sm:text-5xl font-bold gradient-text mb-2">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="font-mono text-xs text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>

        <Parallax speed={0.25}>
          <ScrollReveal direction="scale" delay={0.1} className="mt-20">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6 sm:p-8 font-mono text-sm overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-muted/50 text-xs">nil@ml-engine ~</span>
              </div>
              <pre className="text-muted/90 leading-relaxed overflow-x-auto">
                <code>
{`class AIMLEngineer:
    def __init__(self):
        self.name = "${profile.name}"
        self.role = "${profile.title}"
        self.passion = "shipping AI that works"

    def build(self, problem):
        pipeline = self.design_architecture(problem)
        model = self.train_and_evaluate(pipeline)
        return self.deploy_to_production(model)

    def superpower(self):
        return "RAG + LLMs + Production ML"`}
                </code>
              </pre>
            </motion.div>
          </ScrollReveal>
        </Parallax>
      </div>
    </section>
  );
}
