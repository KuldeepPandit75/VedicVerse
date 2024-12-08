import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Stripe = ({ onClick, texturePath, position = [0, 0, 0] }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();

    // Create the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Load the texture
    const loader = new THREE.TextureLoader();
    loader.load(
      texturePath,
      (texture) => {
        // Create the stripe geometry
        const geometry = new THREE.PlaneGeometry(1, 3); // Long and narrow stripe
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });
        const stripe = new THREE.Mesh(geometry, material);
        stripe.position.set(...position);
        scene.add(stripe);

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error("An error occurred loading the texture:", error);
      }
    );

    // Add click event listener
    const handleClick = () => {
      if (onClick) onClick();
    };
    mountRef.current.addEventListener("click", handleClick);

    // Cleanup
    return () => {};
  }, [onClick, texturePath, position]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100px", height: "300px", cursor: "pointer", zIndex: 50 }}
    />
  );
};

export default Stripe;
