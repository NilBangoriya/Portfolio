import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import NeuralField from "./NeuralField";
import DepthGrid from "./DepthGrid";
import DepthOrbs from "./DepthOrbs";
import DepthCamera from "./DepthCamera";
import StarField from "./StarField";

export default function DepthScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 58], fov: 55, near: 0.1, far: 300 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.75]}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#050508"]} />
      <fog attach="fog" args={["#050508", 35, 190]} />

      <Suspense fallback={null}>
        <DepthCamera />
        <StarField />
        <DepthOrbs />
        <NeuralField />
        <DepthGrid />
      </Suspense>
    </Canvas>
  );
}
