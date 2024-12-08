import Phaser from "phaser";

class Lobby extends Phaser.Scene {
    constructor() {
        super({ key: 'Lobby' });
    }

    preload() {
        this.load.image('background', "/metabackground.webp");
        this.load.image('player', "/monk2.png");
        this.load.audio('nature','/bird sounds.mp3')
        this.load.image('frame1','/Layer 5.png')
        this.load.image('frame2','/Layer 4.png')
        this.load.image('frame3','/Layer 6.png')
        this.load.image('r1','/r1.png')
        this.load.image('r2','/r2.png')
        this.load.image('r3','/r3.png')
        this.load.image('l1','/l1.png')
        this.load.image('l2','/l2.png')
        this.load.image('l3','/l3.png')
        this.load.image('u1','/u1.png')
        this.load.image('u2','/u2.png')
        this.load.image('u3','/u3.png')

        //improved 2d

        // this.load.tilemapTiledJSON('map', '/vedicversedemo.json');

        // this.load.image('tileset', 'path/to/tileset.png');
    }

    create(data) {
        console.log('Lobby scene created');

        // Create a tile sprite for the background to allow for a larger map

        const mapWidth = this.cameras.main.width * 1.2; // Example map width
        const mapHeight = this.cameras.main.height * 1.5; // Example map height
        const background = this.add.tileSprite(0, 0, mapWidth, mapHeight, 'background');
        background.setOrigin(0, 0); // Set origin to top-left

        //fire animation
        this.anims.create({
            key: 'fireAn1', // Unique key for the animation
            frames: [
                { key: 'frame1' },
                { key: 'frame2' },
                { key: 'frame3' },
            ],
            frameRate: 5, // Speed of the animation (frames per second)
            repeat: -1,    // Repeat indefinitely (-1 means loop forever)
        });
    
        // Add a sprite and play the animation
        const fire = this.add.sprite(870, 210, 'frame1'); // Position and initial frame
        fire.play('fireAn1');

        //fire2 animation
        this.anims.create({
            key: 'fireAn2', // Unique key for the animation
            frames: [
                { key: 'frame2' },
                { key: 'frame1' },
                { key: 'frame3' },
            ],
            frameRate: 4, // Speed of the animation (frames per second)
            repeat: -1,    // Repeat indefinitely (-1 means loop forever)
        });
    
        // Add a sprite and play the animation
        const fire2 = this.add.sprite(670, 285, 'frame2'); // Position and initial frame
        fire2.setScale(1.09)
        fire2.play('fireAn2');
        const fire3 = this.add.sprite(1065, 285, 'frame2'); // Position and initial frame
        fire3.setScale(1.09)
        fire3.play('fireAn2');

        // Add player sprite at the center

        let {x,y}=data;

        this.player = this.physics.add.sprite(x || mapWidth / 2, y || mapHeight / 2, 'player');
        this.player.setOrigin(0.5, 0.5); // Center the player sprite
        this.player.setScale(0.35); // Decrease the size of the player

        this.anims.create({
            key: 'walkRight',
            frames: [
                { key: 'r2' },
                { key: 'r1' },
                { key: 'r3' }
            ],
            frameRate: 5, // Adjust speed of the animation
            repeat: -1     // Loop the animation infinitely
        });

        this.anims.create({
            key: 'walkLeft',
            frames: [
                { key: 'l2' },
                { key: 'l1' },
                { key: 'l3' }
            ],
            frameRate: 5, // Adjust speed of the animation
            repeat: -1     // Loop the animation infinitely
        });

        this.anims.create({
            key: 'walkUp',
            frames: [
                { key: 'u1' },
                { key: 'u2' },
                { key: 'u3' }
            ],
            frameRate: 6, // Adjust speed of the animation
            repeat: -1     // Loop the animation infinitely
        });

        //Music tamjham
        this.music = this.sound.add('nature', {
            loop: true, // Enable looping
            volume: 0.1, // Adjust volume (optional)
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

        //collideable object
        const boundary1 = this.add.rectangle(545, 200, 320, 480);
        // boundary1.setStrokeStyle(2, 0x00ff00);
        this.physics.add.existing(boundary1, true); 
        
        const boundary2 = this.add.rectangle(745, 180, 100, 300);
        // boundary2.setStrokeStyle(2, 0x00ff00);
        this.physics.add.existing(boundary2, true); 

        const boundary3 = this.add.rectangle(1000, 180, 100, 300);
        // boundary3.setStrokeStyle(2, 0x00ff00);
        this.physics.add.existing(boundary3, true); 

        const boundary4 = this.add.rectangle(1220, 200, 350, 500);
        // boundary4.setStrokeStyle(2, 0x00ff00);
        this.physics.add.existing(boundary4, true); 

        // // enable collision
        this.physics.add.collider(this.player, boundary1); // Restrict movement
        this.physics.add.collider(this.player, boundary2); // Restrict movement
        this.physics.add.collider(this.player, boundary3); // Restrict movement
        this.physics.add.collider(this.player, boundary4); // Restrict movement

        //Dialogue Box

        // Create a background for the dialog box (optional)
        const dialogHeight = 150; // Height of the dialog box
        const dialogWidth = 600;  // Width of the dialog box
        
        // Fix the dialog box at the bottom center of the screen
        this.dialogBox = this.add.rectangle(
            this.cameras.main.centerX,  // Center horizontally
            this.cameras.main.height - dialogHeight / 2, // Fixed at the bottom
            dialogWidth,
            dialogHeight,
            0x000000, 0.7
        );
        this.dialogBox.setOrigin(0.5);  // Center the rectangle

        // Create a Text object to show the dialog
        this.dialogText = this.add.text(50, this.cameras.main.height - dialogHeight + 20, '', {
            font: '24px Arial',
            fill: '#ffffff',
            wordWrap: { width: dialogWidth - 100, useAdvancedWrap: true }, // Leave space for padding
        });

        // Define the text to be typed
        this.dialogMessage = 'Hello, welcome to the game! This is a typing animation.';

        // Initialize the typing animation
        this.typeText(0); // Start typing from the first letter

        //improved 2d

        // const map = this.make.tilemap({key:"map"});
        // const tileset = map.addTilesetImage('tileset');
        // const layer = map.createLayer('Tile Layer 1', tileset, 0, 0);

        // this.physics.add.collider(this.player, layer);
    }

    typeText(index) {
        if (index < this.dialogMessage.length) {
            // Add the next character to the dialog text
            this.dialogText.setText(this.dialogMessage.substring(0, index + 1));

            // Continue typing after a small delay (typing speed)
            this.time.delayedCall(50, () => {
                this.typeText(index + 1); // Call the function recursively
            });
        }
    }

    update() {
        const speed = 100; // Adjust speed as needed
        
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
    
        // Scene transition logic
        if (this.player.x >= 820 && this.player.x <= 920 && this.player.y <= 250) {
            this.scene.start('Temple'); // Switch to the next scene
            this.music.stop();
        }
    
        // Dialog positioning logic
        const dialogHeight = 150;
        const dialogWidth = 600;
        this.dialogBox.setPosition(
            this.cameras.main.scrollX + this.cameras.main.width / 2,  // Center of the screen
            this.cameras.main.scrollY + this.cameras.main.height - dialogHeight / 2  // Bottom of the screen
        );
        this.dialogText.setPosition(
            this.dialogBox.x - dialogWidth / 2 + 50,  // Text offset within dialog box
            this.dialogBox.y - dialogHeight / 2 + 20
        );
    }
    
}

export default Lobby;