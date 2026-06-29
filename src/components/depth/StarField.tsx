import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDepthMotionOptional } from "../../hooks/useDepthMotion";

const STAR_COUNT = 800;

export default function StarField() {
  const ref = useRef<THREE.Points>(null);
  const { scroll, mouse } = useDepthMotionOptional();

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const speeds = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 2] = -80 - Math.random() * 200;
      speeds[i] = 0.5 + Math.random() * 2;
    }

    return { positions, speeds };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const scrollZ = scroll.current * 0.04;

    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3 + 2] += speeds[i] * delta * 8;
      positions[i * 3] += mouse.current.x * 0.02;
      positions[i * 3 + 1] += mouse.current.y * 0.02;

      if (positions[i * 3 + 2] > 20) {
        positions[i * 3 + 2] = -280;
        positions[i * 3] = (Math.random() - 0.5) * 500;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      }

      positions[i * 3 + 2] -= scrollZ * 0.001;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.z = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        color="#7df9ff"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
