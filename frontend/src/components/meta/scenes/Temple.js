import Phaser from "phaser";

class Temple extends Phaser.Scene {
    constructor() {
        super({ key: 'Temple' });
    }

    preload() {
        this.load.image('temple', "/temple.jpg");
        this.load.audio('backgroundMusic', "/temple.mp3")

        //improved 2d

        // this.load.tilemapTiledJSON('map', '/vedicversedemo.json');

        // this.load.image('tileset', 'path/to/tileset.png');
    }

    create() {
        console.log('Lobby scene created');

        // Create a tile sprite for the background to allow for a larger map

        const mapWidth = this.cameras.main.width; // Example map width
        const mapHeight = this.cameras.main.height * 1.85; // Example map height
        const background = this.add.tileSprite(0, 0, mapWidth, mapHeight, 'temple');
        background.setScale(1.3)
        background.setOrigin(0, 0); // Set origin to top-left

        // Add player sprite at the center

        this.player = this.physics.add.sprite(mapWidth / 2, mapHeight-100, 'player');
        this.player.setOrigin(0.5, 0.5); // Center the player sprite
        this.player.setScale(0.4); // Decrease the size of the player

        //Music tamjham
        this.music = this.sound.add('backgroundMusic', {
            loop: true, // Enable looping
            volume: 0.5, // Adjust volume (optional)
        });
        this.music.play();

        // Prevent player from moving out of the world bounds
        this.player.setCollideWorldBounds(true);

        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set camera to follow the player
        this.cameras.main.startFollow(this.player);

        // Set world bounds (assuming the background is the map)
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

        //improved 2d

        // const map = this.make.tilemap({key:"map"});
        // const tileset = map.addTilesetImage('tileset');
        // const layer = map.createLayer('Tile Layer 1', tileset, 0, 0);

        // this.physics.add.collider(this.player, layer);
    }

    update() {
        const speed = 150; // Adjust speed as needed
        
        // Initialize direction vector
        let dirX = 0;
        let dirY = 0;
    
        // Check input and update direction
        if (this.cursors.left.isDown) {
            dirX = -1;
        } else if (this.cursors.right.isDown) {
            dirX = 1;
        }
    
        if (this.cursors.up.isDown) {
            dirY = -1;
        } else if (this.cursors.down.isDown) {
            dirY = 1;
        }
    
        // Create and normalize the direction vector
        const magnitude = Math.sqrt(dirX * dirX + dirY * dirY);
        const normalizedDirX = magnitude === 0 ? 0 : dirX / magnitude;
        const normalizedDirY = magnitude === 0 ? 0 : dirY / magnitude;
    
        // Apply velocity using the vector
        this.player.setVelocity(normalizedDirX * speed, normalizedDirY * speed);
    
        // Handle animations based on direction
        if (dirX < 0) {
            this.player.anims.play('walkLeft', true);
        } else if (dirX > 0) {
            this.player.anims.play('walkRight', true);
        } else if (dirY < 0) {
            this.player.anims.play('walkUp', true);
        } else if (dirY > 0) {
            this.player.anims.play('walkDown', true); // Assuming you have a 'walkDown' animation
        } else {
            this.player.anims.stop(); // Stop animation when no movement
        }

        if (this.player.y>=1200) {
            this.scene.start('Lobby',{x:870,y:280}); // Switch to the next scene
            this.music.stop();
        }
    }
}

export default Temple;