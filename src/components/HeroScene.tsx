import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;

// Create a soft glowing circle texture using an HTML canvas
const createCircleTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.2)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
  }
  return canvas;
};

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { positions, velocities, colors, texture } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i3] = (Math.random() - 0.5) * 0.005;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

      // Mix of warm amber and cool twilight blue
      const t = Math.random();
      if (t > 0.5) {
        // Gold/Amber
        colors[i3] = 0.8 + Math.random() * 0.2;     // R
        colors[i3 + 1] = 0.5 + Math.random() * 0.3; // G
        colors[i3 + 2] = 0.1 + Math.random() * 0.2; // B
      } else {
        // Deep cyan/blue
        colors[i3] = 0.1 + Math.random() * 0.1;     // R
        colors[i3 + 1] = 0.4 + Math.random() * 0.4; // G
        colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B
      }
    }

    const texture = new THREE.CanvasTexture(createCircleTexture());
    return { positions, velocities, colors, texture };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const time = clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.01) * 0.002;
      pos[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.01) * 0.002;
      pos[i3 + 2] += velocities[i3 + 2];

      // Wrap around
      if (Math.abs(pos[i3]) > 10) pos[i3] *= -0.9;
      if (Math.abs(pos[i3 + 1]) > 10) pos[i3 + 1] *= -0.9;
      if (Math.abs(pos[i3 + 2]) > 5) pos[i3 + 2] *= -0.9;
    }

    geo.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
    meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        map={texture}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Removed FloatingOrbs component

const HeroScene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default HeroScene;
