import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(max-width: 768px)").matches;
    if (isTouch) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor='pointer']"));
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.body.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/50 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ease-out hidden md:block"
        style={{
          transform: `translate(${pos.x - 16}px, ${pos.y - 16}px) scale(${hovering ? 1.8 : 1})`,
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-accent pointer-events-none z-[9999] hidden md:block"
        style={{
          transform: `translate(${pos.x - 2}px, ${pos.y - 2}px)`,
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
