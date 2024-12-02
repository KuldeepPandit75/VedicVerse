import Phaser from "phaser";

class Lobby extends Phaser.Scene {
    constructor() {
        super({ key: 'Lobby' });
    }

    preload() {
        this.load.image('background', "/metabackground.webp");
        this.load.image('player', "/monk2.png");
    }

    create() {
        console.log('Lobby scene created');
        
        // Create a tile sprite for the background to allow for a larger map
        const mapWidth = this.cameras.main.width * 2; // Example map width
        const mapHeight = this.cameras.main.height * 2; // Example map height
        const background = this.add.tileSprite(0, 0, mapWidth, mapHeight, 'background');
        background.setOrigin(0, 0); // Set origin to top-left

        // Add player sprite at the center
        this.player = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'player');
        this.player.setOrigin(0.5, 0.5); // Center the player sprite
        this.player.setScale(0.4); // Decrease the size of the player

        // Prevent player from moving out of the world bounds
        this.player.setCollideWorldBounds(true);

        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set camera to follow the player
        this.cameras.main.startFollow(this.player);

        // Set world bounds (assuming the background is the map)
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    }

    update() {
        // Update player position based on input
        const speed = 200; // Adjust speed as needed
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
        } else {
            this.player.setVelocityY(0);
        }
    }
}

export default Lobby;