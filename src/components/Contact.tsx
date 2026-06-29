import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import ScrollReveal from "./animations/ScrollReveal";
import ScrollTextReveal from "./animations/ScrollTextReveal";
import ScrollStagger, { ScrollStaggerItem } from "./animations/ScrollStagger";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16">
          <ScrollReveal direction="left">
            <p className="section-label mb-4">05 — Contact</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              Let's build something{" "}
              <span className="gradient-text">
                <ScrollTextReveal text="intelligent" as="span" delay={0.12} />
              </span>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-10">
              Whether you're hiring, collaborating, or just want to talk about
              the future of AI — I'd love to hear from you.
            </p>

            <ScrollStagger className="space-y-4" stagger={0.12}>
              {[
                {
                  href: `mailto:${profile.email}`,
                  label: "Email",
                  value: profile.email,
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  ),
                  external: false,
                },
                {
                  href: profile.github,
                  label: "GitHub",
                  value: "@nilbangoriya",
                  icon: (
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.395-.135-.345-.72-1.395-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.02 8.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  ),
                  external: true,
                },
                {
                  href: profile.linkedin,
                  label: "LinkedIn",
                  value: "Connect with me",
                  icon: (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  ),
                  external: true,
                },
              ].map((link) => (
                <ScrollStaggerItem key={link.label}>
                  <motion.a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 group"
                    data-cursor="pointer"
                  >
                    <motion.span
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:border-accent/30 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-accent"
                        fill={link.label === "Email" ? "none" : "currentColor"}
                        stroke={link.label === "Email" ? "currentColor" : undefined}
                        viewBox="0 0 24 24"
                      >
                        {link.icon}
                      </svg>
                    </motion.span>
                    <div>
                      <p className="font-mono text-xs text-muted">{link.label}</p>
                      <p className="text-white/90 group-hover:text-accent transition-colors">
                        {link.value}
                      </p>
                    </div>
                  </motion.a>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <ScrollStagger className="glass rounded-2xl p-8 space-y-5" stagger={0.1}>
              <ScrollStaggerItem>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { id: "email", label: "Email", type: "email", placeholder: "you@company.com" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="font-mono text-xs text-muted block mb-2">
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        required
                        value={formState[field.id as keyof typeof formState]}
                        onChange={(e) =>
                          setFormState({ ...formState, [field.id]: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors text-white placeholder:text-muted/40"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="font-mono text-xs text-muted block mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors text-white placeholder:text-muted/40 resize-none"
                      placeholder="Tell me about the opportunity..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent2 text-void font-semibold hover:opacity-90 transition-opacity"
                    data-cursor="pointer"
                  >
                    {submitted ? "Opening email client..." : "Send Message"}
                  </motion.button>
                </form>
              </ScrollStaggerItem>
            </ScrollStagger>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
