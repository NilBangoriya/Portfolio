import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";

interface DepthMotionState {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  scrollProgress: React.MutableRefObject<number>;
}

const DepthMotionContext = createContext<DepthMotionState | null>(null);

export function DepthMotionProvider({ children }: { children: ReactNode }) {
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      scroll.current = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      scrollProgress.current = window.scrollY / max;
    };

    onScroll();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <DepthMotionContext.Provider value={{ mouse, scroll, scrollProgress }}>
      {children}
    </DepthMotionContext.Provider>
  );
}

export function useDepthMotion() {
  const ctx = useContext(DepthMotionContext);
  if (!ctx) {
    throw new Error("useDepthMotion must be used within DepthMotionProvider");
  }
  return ctx;
}

/** Safe hook for components outside provider (returns static values) */
export function useDepthMotionOptional() {
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const scrollProgress = useRef(0);
  const ctx = useContext(DepthMotionContext);
  return ctx ?? { mouse, scroll, scrollProgress };
}
