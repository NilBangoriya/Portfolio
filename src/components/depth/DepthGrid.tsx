import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDepthMotionOptional } from "../../hooks/useDepthMotion";

export default function DepthGrid() {
  const gridRef = useRef<THREE.Group>(null);
  const { scroll, mouse } = useDepthMotionOptional();

  useFrame((state) => {
    if (!gridRef.current) return;
    const t = state.clock.elapsedTime;
    const scrollZ = scroll.current * 0.08;

    gridRef.current.position.z = (t * 4 + scrollZ) % 40 - 20;
    gridRef.current.position.x = mouse.current.x * 6;
    gridRef.current.rotation.x = -Math.PI / 2.2 + mouse.current.y * 0.04;
  });

  return (
    <group ref={gridRef} position={[0, -35, -60]}>
      <gridHelper
        args={[400, 80, "#00f0ff", "#12121c"]}
        rotation={[0, 0, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial
          color="#050508"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
