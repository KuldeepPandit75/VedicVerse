// SparksBackground.js
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const Sparks = () => {
  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  // Initialize positions and velocities
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

    velocities[i * 3] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
  }

  const meshRef = useRef();

  useFrame(() => {
    const positionsArray = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      positionsArray[i * 3] += velocities[i * 3];
      positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset particle if it moves too far
      if (positionsArray[i * 3 + 1] < -2) {
        positionsArray[i * 3] = (Math.random() - 0.5) * 5;
        positionsArray[i * 3 + 1] = 2;
        positionsArray[i * 3 + 2] = (Math.random() - 0.5) * 5;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" color="orange" size={0.05} />
    </points>
  );
};

const SparksBackground = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ height: "100vh", background: "black" }}
    >
      <Sparks />
    </Canvas>
  );
};

export default SparksBackground;
