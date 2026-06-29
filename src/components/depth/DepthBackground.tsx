import { Suspense, lazy } from "react";
import { useReducedMotion } from "framer-motion";
import { DepthMotionProvider } from "../../hooks/useDepthMotion";
import DepthAtmosphere from "./DepthAtmosphere";

const DepthScene = lazy(() => import("./DepthScene"));

export default function DepthBackground() {
  const reduced = useReducedMotion();

  return (
    <DepthMotionProvider>
      <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <DepthAtmosphere />

        {!reduced ? (
          <Suspense fallback={null}>
            <DepthScene />
          </Suspense>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-void via-ink to-void" />
        )}

        {/* Depth haze + film grain bridge between 3D and UI */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-transparent to-void/85 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, #050508 100%)",
          }}
        />
      </div>
    </DepthMotionProvider>
  );
}
