import Phaser from "phaser";

class Lobby extends Phaser.Scene {
    constructor() {
        super({ key: 'Lobby' });
    }

    preload() {
        // Load assets here
    }

    create() {
        // Create game objects here
        console.log('Lobby scene created');
    }

    update() {
        // Update game objects here
    }
}

export default Lobby;