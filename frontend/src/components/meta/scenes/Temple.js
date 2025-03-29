import Phaser from "phaser";
import store from "../../../App/store";

class Temple extends Phaser.Scene {
    constructor() {
        super({ key: 'Temple' });
    }

    preload() {
        this.load.image('temple', "/temple.jpg");
        this.load.image('krishnji', '/meta elements/krishna.png');
        this.load.audio('backgroundMusic', "/meta elements/enchanting_flute.mp3");
        this.load.image('flower', "/meta elements/flower.png");  // Load flower image
        this.load.image('shine', '/meta elements/shine.png');

        //improved 2d

        // this.load.tilemapTiledJSON('map', '/vedicversedemo.json');

        // this.load.image('tileset', 'path/to/tileset.png');
    }

    create() {
        console.log('Lobby scene created');

        // Create a tile sprite for the background to allow for a larger map

        const mapWidth = this.cameras.main.width; // Example map width
        const mapHeight = this.cameras.main.height * 1.55; // Example map height
        const background = this.add.tileSprite(0, 0, mapWidth, mapHeight, 'temple');
        background.setScale(1.3)
        background.setOrigin(0, 0); // Set origin to top-left

        // Add player sprite at the center

        this.player = this.physics.add.sprite(mapWidth / 2, mapHeight - 100, 'player');
        this.player.setOrigin(0.5, 0.5); // Center the player sprite
        this.player.setScale(0.4); // Decrease the size of the player

        //Music tamjham
        this.music = this.sound.add('backgroundMusic', {
            loop: true, // Enable looping
            volume: 0.03, // Adjust volume (optional)
        });
        this.music.play();
        this.music.setSeek(10)
        // Prevent player from moving out of the world bounds
        this.player.setCollideWorldBounds(true);

        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set camera to follow the player
        this.cameras.main.startFollow(this.player);

        // Set world bounds (assuming the background is the map)
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

        //Krishna Ji
        this.shine = this.physics.add.sprite(732, 600, 'shine');
        this.shine.setOrigin(0.5);
        this.shine.setScale(0.2)
        this.krishnji = this.physics.add.sprite(732, 615, 'krishnji');
        this.krishnji.setOrigin(0.5, 0.5);
        this.krishnji.setScale(1.3);

        // Create flower particle system
        // this.flowerParticles = this.add.particles('flower');

        this.flowerEmitter = this.add.particles(this.krishnji.x, this.krishnji.y - this.krishnji.height / 1, 'flower', {
            speedY: { min: 100, max: 150 }, // Vertical speed
            speedX: { min: -20, max: 20 }, // Some horizontal spread
            angle: { min: 50, max: 100 }, // Slightly angled fall
            scale: { start: 0, end: 0.005 }, // Grow from 0 to original size
            rotate: { min: 0, max: 360 }, // Random rotation
            lifespan: 1500, // How long each flower exists
            frequency: 500, // How often to emit flowers (in ms)
            quantity: 1, // How many flowers to emit at once
            alpha: { start: 1, end: 0.8 }, // Fade out slightly
            // blendMode: 'ADD',
        });
        this.flowerEmitter.stop();

        // Shine Animation
        this.shineAnimation = this.tweens.add({
            targets: this.shine,
            scale: 0.1,
            duration: 1000,
            ease: 'Linear',
            repeat: -1,
            yoyo: true
        })

        this.shineAnimation.pause();

        // Boundaries

        const boundary1 = this.add.rectangle(730, 675, 110, 20);
        // boundary1.setStrokeStyle(2, 0x00ff00);
        this.physics.add.existing(boundary1, true);
        this.physics.add.collider(this.player, boundary1); // Restrict movement


        // // Optional: Stop emission after a few seconds
        this.time.delayedCall(5000, () => {
        });


        this.showerBtn = document.getElementsByClassName('showerBtn');

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

        if (this.player.y >= 1200) {
            this.scene.start('Lobby', { x: 870, y: 280 }); // Switch to the next scene
            this.music.stop();
        }

        // Dist bw krishnji Idol and Player

        const distBwPK = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.krishnji.x,
            this.krishnji.y
        )

        // Show button when player gets closer to idol
        if (distBwPK < 150) {


            this.showerBtn[0].style.display = 'flex';
        } else {
            this.showerBtn[0].style.display = 'none'
        }

        if (store.getState().shower) {
            this.flowerEmitter.start();
            this.shineAnimation.resume();
        } else {
            this.flowerEmitter.stop();
        }
    }
}

export default Temple;