import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

function Leaf({ position }) {
  const leafRef = useRef();
  const [rotationSpeed] = useState(Math.random() * 0.02 + 0.001);

  useFrame(() => {
    if (leafRef.current) {
      leafRef.current.position.y -= 0.01;
      leafRef.current.rotation.z += rotationSpeed;
      if (leafRef.current.position.y < -2) {
        leafRef.current.position.y = Math.random() * 5 + 2;
        leafRef.current.position.x = (Math.random() - 0.5) * 10;
        leafRef.current.position.z = (Math.random() - 0.5) * 10;
      }
    }
  });

  return (
    <mesh ref={leafRef} position={position}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshStandardMaterial
        map={new THREE.TextureLoader().load(
          "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241100/leaf8_atjofr.png"
        )}
        transparent={true}
      />
    </mesh>
  );
}

function FallenLeaves() {
  const leaves = Array.from({ length: 100 }, () => ({
    position: [
      (Math.random() - 0.5) * 10, // X
      Math.random() * 5 + 2, // Y
      (Math.random() - 0.5) * 10, // Z
    ],
  }));

  return (
    <>
      {leaves.map((leaf, index) => (
        <Leaf key={index} position={leaf.position} />
      ))}
    </>
  );
}

export default function LeafComponents() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 1]} intensity={1} />

      <FallenLeaves />
    </Canvas>
  );
}
