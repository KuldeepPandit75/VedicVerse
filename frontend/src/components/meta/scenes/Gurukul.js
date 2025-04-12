import Phaser from "phaser";
import store from "../../../App/store";
import { setRecMsgRedux } from "../../../features/vedicSlice";
import { getSocket } from "../../../features/socket";

class Gurukul extends Phaser.Scene {
  constructor() {
    super({ key: "Gurukul" });
    this.socket = null;
    this.otherPlayers = {};
  }

  preload() {
    // Load map and player assets
    this.load.image("ashram", "/meta elements/ashram.png");
    this.load.image("player", "/monk2.png");
    this.load.audio("nature", "/bird sounds.mp3");
  }

  initializeSocket = () => {

    this.socket = getSocket();

    console.log(this.socket.connected)

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    this.socket.on('currentPlayers', (players) => {
      console.log("Received existing players:", players);
      players.forEach(player => {
        if (player.id !== this.socket.id && !this.otherPlayers[player.id]) {
          this.otherPlayers[player.id] = this.physics.add.sprite(player.x, player.y, 'player', 0);
          this.otherPlayers[player.id].setScale(0.35);

        }
      });
    });

    this.socket.on('playerJoined', (id) => {
      if (id !== this.socket.id) {
        console.log("new player joined:", id);
        if (!this.otherPlayers[id]) {
          this.otherPlayers[id] = this.physics.add.sprite(1100, 750, 'player', 0);
          this.otherPlayers[id].setScale(0.35);

        }
      }
    });

    this.socket.on('playerMoved', (data) => {
      if (this.socket.id !== data.id && this.otherPlayers[data.id]) {
        this.otherPlayers[data.id].setPosition(data.x, data.y);
        if (data.dirX < 0) {
          this.otherPlayers[data.id].setScale(0.35)
          this.otherPlayers[data.id].anims.play("walkLeft", true);
        }
        else if (data.dirX > 0) {
          this.otherPlayers[data.id].setScale(0.35)
          this.otherPlayers[data.id].anims.play("walkRight", true);
        }
        else if (data.dirY < 0) {
          this.otherPlayers[data.id].setScale(0.35)
          this.otherPlayers[data.id].anims.play("walkUp", true);
        }
        else if (data.dirY > 0) {
          this.otherPlayers[data.id].setScale(0.35)
          this.otherPlayers[data.id].anims.play("walkDown", true);
        } else {
          this.otherPlayers[data.id].setScale(0.35)
          this.otherPlayers[data.id].anims.stop();
        }
      }
    });

    this.socket.on('playerDisconnected', (playerId) => {
      if (this.otherPlayers[playerId]) {
        this.otherPlayers[playerId].destroy();
        delete this.otherPlayers[playerId];
      }
    });

    this.socket.on('joinedRoom', (roomId) => {
      console.log(`Joined room: ${roomId}`);
      document.getElementById('user-2').style.display = 'block'

    });

    this.socket.on('leftRoom', (roomId) => {
      console.log(`Left room: ${roomId}`);
    });

    this.socket.on('receiveMessage', (data) => {
      store.dispatch(setRecMsgRedux({ message: data.message, senderId: data.senderId, timestamp: Date.now() }));
    })
  }

  create(data) {

    this.initializeSocket();

    console.log("Gurukul scene created");

    // Create a tile sprite for the background
    const mapWidth = this.cameras.main.width * 1;
    const mapHeight = this.cameras.main.height * 1.25;
    const background = this.add.tileSprite(0, 0, mapWidth, mapHeight, "ashram");
    background.setOrigin(0, 0);
    background.setScale(1.6)

    // Add player sprite at the center
    let { x, y } = data;
    this.player = this.physics.add.sprite(
      mapWidth / 1.4,
      mapHeight / 1.5,
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
    this.physics.world.setBounds(0, 0, mapWidth * 1.6, mapHeight * 1.6);
    this.cameras.main.setBounds(0, 0, mapWidth * 1.6, mapHeight * 1.6);
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
    if (this.player.y <= 100) {
      this.scene.start("Lobby", { x: 865, y: this.cameras.main.height * 1.1 });
      document.getElementById('videoCallControls').style.visibility = 'hidden'

      this.music.stop();
    }

    const nearbyPlayers = [];
        Object.keys(this.otherPlayers).forEach(otherPlayer => {
            this.distBwUnP = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                this.otherPlayers[otherPlayer].x,
                this.otherPlayers[otherPlayer].y
            );

            if (this.distBwUnP < 20) {
                nearbyPlayers.push(otherPlayer);
            }
        });

        if (nearbyPlayers.length > 0) {
            const roomId = [this.socket.id, ...nearbyPlayers].sort().join('-');
            this.socket.emit('joinRoom', {
                roomId,
                playerIds: [this.socket.id, ...nearbyPlayers]
            });
        } else {
            document.getElementById('user-2').style.display = 'none'

            this.socket.emit('leaveRoom', {
                playerId: this.socket.id
            });
        }
        this.socket.emit('playerMove', { id: this.socket.id, x: this.player.x, y: this.player.y, dirX, dirY });
  }
}

export default Gurukul;
