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
        // Update player position based on input
        const speed = 200; // Adjust speed as needed
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.anims.play('walkLeft',true)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.anims.play('walkRight',true)
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            this.player.anims.play('walkUp',true)
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.setTexture('player');
            this.player.anims.stop();
        }

        if (this.player.y>=1200) {
            this.scene.start('Lobby',{x:870,y:280}); // Switch to the next scene
            this.music.stop();
        }
    }
}

export default Temple;