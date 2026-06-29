import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useDepthMotionOptional } from "../../hooks/useDepthMotion";

export default function DepthCamera() {
  const { camera } = useThree();
  const { mouse, scroll, scrollProgress } = useDepthMotionOptional();
  const lookAt = useRef(new THREE.Vector3(0, 0, -40));

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scrollZ = scroll.current * 0.07;
    const progress = scrollProgress.current;

    const targetX = mouse.current.x * 14;
    const targetY = mouse.current.y * 10 + Math.sin(t * 0.18) * 0.6;
    const targetZ = 58 - scrollZ + Math.sin(t * 0.12) * 1.5 - progress * 25;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);

    lookAt.current.set(
      mouse.current.x * 8,
      mouse.current.y * 5,
      -45 - scrollZ * 0.35 - progress * 40
    );
    camera.lookAt(lookAt.current);
  });

  return null;
}
