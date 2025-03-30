import Phaser from "phaser";

class Ashram extends Phaser.Scene {
  constructor() {
    super({ key: "Ashram" });
  }

  preload() {
    // Load map and player assets
    this.load.image("ashram", "/meta elements/ashram.png");
    this.load.image("player", "/monk2.png");
    this.load.audio("nature", "/bird sounds.mp3");
    
    // Load player animation frames
    this.load.image("r1", "/r1.png");
    this.load.image("r2", "/r2.png");
    this.load.image("r3", "/r3.png");
    this.load.image("l1", "/l1.png");
    this.load.image("l2", "/l2.png");
    this.load.image("l3", "/l3.png");
    this.load.image("u1", "/u1.png");
    this.load.image("u2", "/u2.png");
    this.load.image("u3", "/u3.png");
    this.load.image("b1", "/b1.png");
    this.load.image("b2", "/b2.png");
    this.load.image("b3", "/b3.png");
  }

  create(data) {
    console.log("Ashram scene created");

    // Create a tile sprite for the background
    const mapWidth = this.cameras.main.width * 1.2;
    const mapHeight = this.cameras.main.height * 1.25;
    const background = this.add.tileSprite(0, 0, mapWidth, mapHeight, "ashram");
    background.setOrigin(0, 0);

    // Add player sprite at the center
    let { x, y } = data;
    this.player = this.physics.add.sprite(
      x || mapWidth / 2,
      y || mapHeight / 2.1,
      "player"
    );
    this.player.setOrigin(0.5, 0.5);
    this.player.setScale(0.35);

    // Add background music
    this.music = this.sound.add("nature", {
      loop: true,
      volume: 0.02,
    });
    this.music.play();

    // Prevent player from moving out of the world bounds
    this.player.setCollideWorldBounds(true);

    // Set up keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Set camera to follow the player
    this.cameras.main.startFollow(this.player);

    // Set world bounds
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
  }

  update() {
    const speed = 300;

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
      this.player.anims.play("walkLeft", true);
    } else if (dirX > 0) {
      this.player.anims.play("walkRight", true);
    } else if (dirY < 0) {
      this.player.anims.play("walkUp", true);
    } else if (dirY > 0) {
      this.player.anims.play("walkDown", true);
    } else {
      this.player.anims.stop();
    }

    // Scene transition logic - when player reaches bottom
    if (this.player.y >= this.physics.world.bounds.height - 100) {
      this.scene.start("Lobby", { x: this.player.x, y: 100 });
      this.music.stop();
    }
  }
}

export default Ashram;
