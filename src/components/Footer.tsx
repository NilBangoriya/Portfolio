import ScrollReveal from "./animations/ScrollReveal";
import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 border-t border-white/[0.05]">
      <ScrollReveal direction="blur">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          © {year} {profile.name}. Crafted with React & curiosity.
        </p>
        <div className="flex items-center gap-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
            data-cursor="pointer"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
            data-cursor="pointer"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
            data-cursor="pointer"
          >
            Email
          </a>
        </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
