import Phaser from "phaser";
import {useEffect ,useRef , createElement} from 'react'
import Lobby from "./scenes/Lobby.js";
import Temple from "./scenes/Temple.js";
import Story from "./scenes/Story.js";
import Ashram from "./scenes/Ashram.js";

const PhaserGame = () => {
  const gameContainer = useRef(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "#000",
            parent: gameContainer.current,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            scene: [Lobby,Temple,Story,Ashram]
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
