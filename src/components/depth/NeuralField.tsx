import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDepthMotionOptional } from "../../hooks/useDepthMotion";

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

const COUNT = () => (isMobile() ? 140 : 380);
const SPREAD = { x: 100, y: 75, z: 160 };
const CONNECT_DIST_SQ = 28 * 28;
const MAX_LINES = 600;

const palette = [
  new THREE.Color("#00f0ff"),
  new THREE.Color("#b026ff"),
  new THREE.Color("#ff2d78"),
  new THREE.Color("#7df9ff"),
];

function depthColor(z: number, out: THREE.Color) {
  const t = THREE.MathUtils.clamp((z + 80) / 160, 0, 1);
  if (t < 0.5) out.copy(palette[0]).lerp(palette[1], t * 2);
  else out.copy(palette[1]).lerp(palette[2], (t - 0.5) * 2);
  return out;
}

export default function NeuralField() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const frameRef = useRef(0);
  const { mouse, scroll } = useDepthMotionOptional();

  const particleData = useMemo(() => {
    const n = COUNT();
    const positions = new Float32Array(n * 3);
    const velocities = new Float32Array(n * 3);
    const colors = new Float32Array(n * 3);
    const phases = new Float32Array(n);
    const tmp = new THREE.Color();

    for (let i = 0; i < n; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD.x * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD.y * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD.z - 30;

      velocities[i * 3] = (Math.random() - 0.5) * 0.018;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.018;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.012;

      phases[i] = Math.random() * Math.PI * 2;

      depthColor(positions[i * 3 + 2], tmp);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }

    return { n, positions, velocities, colors, phases };
  }, []);

  const linePositions = useMemo(
    () => new Float32Array(MAX_LINES * 2 * 3),
    []
  );
  const lineColors = useMemo(() => new Float32Array(MAX_LINES * 2 * 3), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { n, positions, velocities, colors, phases } = particleData;
    frameRef.current++;

    const scrollZ = scroll.current * 0.045;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    const tmp = new THREE.Color();

    for (let i = 0; i < n; i++) {
      const ix = i * 3;
      positions[ix] +=
        velocities[ix] + Math.sin(t * 0.25 + phases[i]) * 0.004;
      positions[ix + 1] +=
        velocities[ix + 1] + Math.cos(t * 0.2 + phases[i] * 1.3) * 0.004;
      positions[ix + 2] +=
        velocities[ix + 2] + Math.sin(t * 0.15 + i * 0.01) * 0.003;

      positions[ix] += mx * 0.012;
      positions[ix + 1] += my * 0.01;
      positions[ix + 2] -= scrollZ * 0.002;

      if (positions[ix] > SPREAD.x) positions[ix] = -SPREAD.x;
      if (positions[ix] < -SPREAD.x) positions[ix] = SPREAD.x;
      if (positions[ix + 1] > SPREAD.y) positions[ix + 1] = -SPREAD.y;
      if (positions[ix + 1] < -SPREAD.y) positions[ix + 1] = SPREAD.y;
      if (positions[ix + 2] > 50) positions[ix + 2] = -SPREAD.z;
      if (positions[ix + 2] < -SPREAD.z) positions[ix + 2] = 50;

      depthColor(positions[ix + 2], tmp);
      colors[ix] = tmp.r;
      colors[ix + 1] = tmp.g;
      colors[ix + 2] = tmp.b;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }

    if (frameRef.current % 12 === 0 && linesRef.current) {
      let lineCount = 0;
      const stride = isMobile() ? 2 : 1;

      for (let i = 0; i < n && lineCount < MAX_LINES; i += stride) {
        for (let j = i + 1; j < n && lineCount < MAX_LINES; j += stride) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < CONNECT_DIST_SQ) {
            const li = lineCount * 6;
            linePositions[li] = positions[i * 3];
            linePositions[li + 1] = positions[i * 3 + 1];
            linePositions[li + 2] = positions[i * 3 + 2];
            linePositions[li + 3] = positions[j * 3];
            linePositions[li + 4] = positions[j * 3 + 1];
            linePositions[li + 5] = positions[j * 3 + 2];

            const alpha = 1 - Math.sqrt(distSq) / 28;
            lineColors[li] = colors[i * 3] * alpha;
            lineColors[li + 1] = colors[i * 3 + 1] * alpha;
            lineColors[li + 2] = colors[i * 3 + 2] * alpha;
            lineColors[li + 3] = colors[j * 3] * alpha;
            lineColors[li + 4] = colors[j * 3 + 1] * alpha;
            lineColors[li + 5] = colors[j * 3 + 2] * alpha;

            lineCount++;
          }
        }
      }

      const geo = linesRef.current.geometry;
      geo.setDrawRange(0, lineCount * 2);
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        t * 0.018 + mx * 0.22,
        0.02
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        my * 0.12,
        0.02
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        -scrollZ * 0.5,
        0.04
      );
    }
  });

  const { n, positions, colors } = particleData;

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={n}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={n}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.42}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={MAX_LINES * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={MAX_LINES * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
