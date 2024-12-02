import Phaser from "phaser";
import { useEffect, useRef, useState, createElement } from "react";
const PhaserGame = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#fff",
      parent: gameContainer.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: [],
    };

    const game = new Phaser.Game(config);

    const handleResize = () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      game.destroy(true); // Clean up on unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return createElement("div", {
    ref: gameContainer,
    id: "game-container",
    style: { width: "100%", height: "100vh" },
  });
};

export default PhaserGame;
