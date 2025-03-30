import Phaser from "phaser";
import store from "../../../App/store";
import { setTalk } from "../../../features/vedicSlice";

class Lobby extends Phaser.Scene {
  constructor() {
    super({ key: "Lobby" });
  }

  preload() {
    this.load.image("background", "/metabackground.webp");
    this.load.image("player", "/monk2.png");
    this.load.audio("nature", "/bird sounds.mp3");
    this.load.image("frame1", "/Layer 5.png");
    this.load.image("frame2", "/Layer 4.png");
    this.load.image("frame3", "/Layer 6.png");
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
    this.load.image("pillarL", "Lpillar.png");
    this.load.image("pillarR", "pillarR.png");
    this.load.image("treeTop", "treetop.png");
    this.load.image("blueHut", "blueHut.png");
    this.load.image('orangeHut','orangeHut.png');
    this.load.image('guru','teacher2.png')

    //improved 2d

    // this.load.tilemapTiledJSON('map', '/vedicversedemo.json');

    // this.load.image('tileset', 'path/to/tileset.png');
  }

  create(data) {
    console.log("Lobby scene created");

    //tracking variables
    this.isTypingCompleted = false; // To track typing completion
    this.isBHHighlighted = false;
    this.isOHHighlighted = false;
    this.isGuru=false;

    // Create a tile sprite for the background to allow for a larger map

    const mapWidth = this.cameras.main.width * 1.2; // Example map width
    const mapHeight = this.cameras.main.height * 1.25; // Example map height
    const background = this.add.tileSprite(
      0,
      0,
      mapWidth,
      mapHeight,
      "background"
    );
    background.setOrigin(0, 0); // Set origin to top-left

    //fire animation
    this.anims.create({
      key: "fireAn1", // Unique key for the animation
      frames: [{ key: "frame1" }, { key: "frame2" }, { key: "frame3" }],
      frameRate: 5, // Speed of the animation (frames per second)
      repeat: -1, // Repeat indefinitely (-1 means loop forever)
    });

    // Setting Top layer Elements Here

    const pillarL = this.add.sprite(386, 595, "pillarL");
    pillarL.depth = 1;

    const pillarR = this.add.sprite(1402, 595, "pillarL");
    pillarR.depth = 1;

    const treeTop = this.add.sprite(455, 607, "treeTop");
    treeTop.depth = 1;

    const treeTop2 = this.add.sprite(1327, 607, "treeTop");
    treeTop2.depth = 1;

    this.blueHut = this.add.sprite(255, 630, "blueHut");
    this.blueHut.depth = 1;

    this.orangeHut=this.add.sprite(249, 380, "orangeHut");
    this.orangeHut.depth=1;

    // Add a sprite and play the animation
    const fire = this.add.sprite(870, 210, "frame1"); // Position and initial frame
    fire.play("fireAn1");

    //fire2 animation
    this.anims.create({
      key: "fireAn2", // Unique key for the animation
      frames: [{ key: "frame2" }, { key: "frame1" }, { key: "frame3" }],
      frameRate: 4, // Speed of the animation (frames per second)
      repeat: -1, // Repeat indefinitely (-1 means loop forever)
    });

    // Add a sprite and play the animation
    const fire2 = this.add.sprite(670, 285, "frame2"); // Position and initial frame
    fire2.setScale(1.09);
    fire2.play("fireAn2");
    const fire3 = this.add.sprite(1065, 285, "frame2"); // Position and initial frame
    fire3.setScale(1.09);
    fire3.play("fireAn2");

    // Add player sprite at the center

    let { x, y } = data;

    this.player = this.physics.add.sprite(
      x || mapWidth / 2,
      y || mapHeight / 2.1,
      "player"
    );
    this.player.setOrigin(0.5, 0.5); // Center the player sprite
    this.player.setScale(0.35); // Decrease the size of the player

    this.guru = this.physics.add.sprite(1450,500,'guru')
    this.guru.setScale(0.16);

    this.anims.create({
      key: "walkRight",
      frames: [{ key: "r2" }, { key: "r1" }, { key: "r3" }],
      frameRate: 5, // Adjust speed of the animation
      repeat: -1, // Loop the animation infinitely
    });

    this.anims.create({
      key: "walkLeft",
      frames: [{ key: "l2" }, { key: "l1" }, { key: "l3" }],
      frameRate: 5, // Adjust speed of the animation
      repeat: -1, // Loop the animation infinitely
    });

    this.anims.create({
      key: "walkUp",
      frames: [{ key: "u1" }, { key: "u2" }, { key: "u3" }],
      frameRate: 8, // Adjust speed of the animation
      repeat: -1, // Loop the animation infinitely
    });

    this.anims.create({
      key: "walkDown",
      frames: [{ key: "b1" }, { key: "b2" }, { key: "b3" }],
      frameRate: 6, // Adjust speed of the animation
      repeat: -1, // Loop the animation infinitely
    });

    //Music tamjham
    this.music = this.sound.add("nature", {
      loop: true, // Enable looping
      volume: 0.08, // Adjust volume (optional)
    });
    this.music.play();

    // Prevent player from moving out of the world bounds
    this.player.setCollideWorldBounds(true);

    // Set up keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
    // this.enterKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.ENTER)

    // Set camera to follow the player
    this.cameras.main.startFollow(this.player);

    // Set world bounds (assuming the background is the map)
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

    //collideable object

    const boundary1 = this.add.rectangle(545, 200, 320, 480);
    this.physics.add.existing(boundary1, true);

    const boundary2 = this.add.rectangle(745, 180, 100, 300);
    this.physics.add.existing(boundary2, true);

    const boundary3 = this.add.rectangle(1000, 180, 100, 300);
    this.physics.add.existing(boundary3, true);

    const boundary4 = this.add.rectangle(1220, 200, 350, 500);
    // boundary4.setStrokeStyle(2, 0x00ff00);
    this.physics.add.existing(boundary4, true);

    const boundary5 = this.add.rectangle(550, 780, 300, 300);
    this.physics.add.existing(boundary5, true);

    const boundary6 = this.add.rectangle(720, 850, 200, 300);
    this.physics.add.existing(boundary6, true);

    const boundary7 = this.add.rectangle(1050, 850, 200, 300);
    this.physics.add.existing(boundary7, true);

    const boundary8 = this.add.rectangle(1220, 780, 350, 300);
    this.physics.add.existing(boundary8, true);

    const boundary9 = this.add.rectangle(260, 670, 130, 50);
    // boundary9.setStrokeStyle(2, 0x00ff00);
    this.physics.add.existing(boundary9, true);

    const boundary10 = this.add.rectangle(1400, 570, 30, 140);
    // boundary10.setStrokeStyle(2, 0x00ff00);
    this.physics.add.existing(boundary10, true);

    // // enable collision
    this.physics.add.collider(this.player, boundary1); // Restrict movement
    this.physics.add.collider(this.player, boundary2); // Restrict movement
    this.physics.add.collider(this.player, boundary3); // Restrict movement
    this.physics.add.collider(this.player, boundary4); // Restrict movement
    this.physics.add.collider(this.player, boundary5); // Restrict movement
    this.physics.add.collider(this.player, boundary6); // Restrict movement
    this.physics.add.collider(this.player, boundary7); // Restrict movement
    this.physics.add.collider(this.player, boundary8); // Restrict movement
    this.physics.add.collider(this.player, boundary10); // Blue Hut Restriction

    //Dialogue Box

    this.dialogMessage =
      "Welcome, traveler, to the sacred lands of VedicVerse! You stand at the gateway to ancient wisdom, where the knowledge of the Vedas comes to life through challenges and stories.";

    // Dialog box and text setup
    const dialogHeight = 150;
    const dialogWidth = 700;
    this.dialogBox = this.add
      .rectangle(
        this.cameras.main.centerX,
        this.cameras.main.height - dialogHeight / 2,
        dialogWidth,
        dialogHeight,
        0x000000,
        0.7
      )
      .setOrigin(0.5);

    this.dialogText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.height - dialogHeight / 20,
      "",
      {
        font: "24px Arial",
        fill: "#ffffff",
        wordWrap: { width: dialogWidth - 100, useAdvancedWrap: true },
        align:'center'
      }
    ).setOrigin(0.09,0.1);

    // Start typing animation
    this.typeText(0);

    // Space key for skipping or destroying dialog

    this.input.keyboard.on("keydown-SPACE", this.handleSpacePress, this);

    this.input.keyboard.on('keydown-ENTER',()=>{
        if(this.isBHHighlighted){
            const homeBtn=document.getElementsByClassName("homeBtn");
            homeBtn[0].style.visibility="hidden";
            this.scene.start("Story")
            this.music.stop();
        }
        if(this.isGuru){
          store.dispatch(setTalk(true))
          this.input.keyboard.enabled=false;
        }
    })

    this.textBg = this.add.rectangle(0, 0, 300,30, 0x000000, 0.5).setOrigin(0.5, 0.5).setVisible(false);
    this.oHutText=this.add.text(0,0,"Explore Veds Through Games",{fontSize:'16px',fill:'#fff'}).setOrigin(0.5,0.5).setVisible(false);
    this.bHutText=this.add.text(0,0,"Explore Veds Through Stories",{fontSize:'16px',fill:'#fff'}).setOrigin(0.5,0.5).setVisible(false);
    this.textBg.depth=1;
    this.bHutText.depth=1;
    this.oHutText.depth=1;

  }

  typeText(index) {
    if (index < this.dialogMessage.length) {
      this.dialogText.setText(this.dialogMessage.substring(0, index + 1));
      this.time.delayedCall(50, () => this.typeText(index + 1));
    } else {
      this.isTypingCompleted = true; // Mark typing as completed
    }
  }

  handleSpacePress() {
    if (!this.isTypingCompleted) {
      // Skip typing animation
      this.dialogText.setText(this.dialogMessage);
      this.isTypingCompleted = true;
    } else {
      // Destroy dialog box and text
      this.dialogBox.destroy();
      this.dialogText.destroy();
    }
  }

  update() {
    const speed = 300; // Adjust speed as needed

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
      this.player.anims.play("walkDown", true); // Assuming you have a 'walkDown' animation
    } else {
      this.player.anims.stop(); // Stop animation when no movement
    }

    // Scene transition logic
    if (this.player.x >= 820 && this.player.x <= 920 && this.player.y <= 250) {
      this.scene.start("Temple"); // Switch to the next scene
      this.music.stop();
    }

    // Add transition to Ashram when player reaches bottom
    if (this.player.y >= this.physics.world.bounds.height - 100) {
      this.scene.start("Ashram", { x: this.player.x, y: 100 });
      this.music.stop();
    }

    // Dialog positioning logic
    const dialogHeight = 150;
    const dialogWidth = 600;
    this.dialogBox.setPosition(
      this.cameras.main.scrollX + this.cameras.main.width / 2, // Center of the screen
      this.cameras.main.scrollY + this.cameras.main.height - dialogHeight / 2 // Bottom of the screen
    );
    this.dialogText.setPosition(
      this.dialogBox.x - dialogWidth / 2 + 50, // Text offset within dialog box
      this.dialogBox.y - dialogHeight / 2 + 20
    );

    //Hut Hightlight

    const distBwPnBH = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.blueHut.x,
      this.blueHut.y
    );

    // Highlight if player is near
    if (distBwPnBH < 100) {
      this.blueHut.setTint(0xffffff55); // Highlight with red tint
      this.isBHHighlighted = true;
      this.bHutText.setPosition(this.blueHut.x,this.blueHut.y-50).setVisible(true);
      this.textBg.setPosition(this.blueHut.x,this.blueHut.y-50).setVisible(true);
    } else {
      this.blueHut.clearTint(); // Remove highlight
      this.isBHHighlighted = false;
      this.bHutText.setVisible(false);
      this.textBg.setVisible(false);
    }


    const distBwPnOH = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.orangeHut.x,
      this.orangeHut.y
    );

    // Highlight if player is near
    if (distBwPnOH < 100) {
      this.orangeHut.setTint(0xffbb4455); // Highlight with red tint
      this.isOHHighlighted = true;
      this.oHutText.setPosition(this.orangeHut.x,this.orangeHut.y-50).setVisible(true);
      this.textBg.setPosition(this.orangeHut.x,this.orangeHut.y-50).setVisible(true);
    } else {
      this.orangeHut.clearTint(); // Remove highlight
      this.isOHHighlighted = false;
      this.oHutText.setVisible(false);
      this.textBg.setVisible(false);
    }

    const distBwPnG=Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.guru.x,
      this.guru.y
    )

    if(distBwPnG<150){
      this.isGuru=true;
      this.guru.setTint(0xffbb4455);
    }else{
      this.isGuru=false;
      this.guru.clearTint(); 
    }

    if (!store.getState().talkGuru) {
      this.input.keyboard.enabled=true;
  } 

  }
}

export default Lobby;
