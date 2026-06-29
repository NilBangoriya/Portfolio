import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDepthMotionOptional } from "../../hooks/useDepthMotion";

const ORB_COUNT = 12;

export default function DepthOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, scroll } = useDepthMotionOptional();

  const orbs = useMemo(
    () =>
      Array.from({ length: ORB_COUNT }, (_, i) => ({
        x: (Math.random() - 0.5) * 180,
        y: (Math.random() - 0.5) * 100,
        z: -60 - Math.random() * 120,
        scale: 4 + Math.random() * 14,
        speed: 0.1 + Math.random() * 0.2,
        hue: i % 3,
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scrollZ = scroll.current * 0.05;

    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.x = orb.x + Math.sin(t * orb.speed + i) * 6 + mouse.current.x * 8;
      child.position.y = orb.y + Math.cos(t * orb.speed * 0.8 + i) * 4 + mouse.current.y * 5;
      child.position.z = orb.z - scrollZ * 0.3 + Math.sin(t * 0.1 + i * 0.5) * 3;
    });
  });

  const colors = ["#00f0ff", "#b026ff", "#ff2d78"];

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={[orb.x, orb.y, orb.z]} scale={orb.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={colors[orb.hue]}
            transparent
            opacity={0.04}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
