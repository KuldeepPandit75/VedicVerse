import Phaser from "phaser";
import store from "../../../App/store";
import { setLearn, setRecMsgRedux } from "../../../features/vedicSlice";
import { getSocket } from "../../../features/socket";

class Gurukul extends Phaser.Scene {
  constructor() {
    super({ key: "Gurukul" });
    this.socket = null;
    this.otherPlayers = {};
    this.isMathTeacher = false;
    this.currentConcept = 0;
    this.vedicMathConcepts = [
      "Ekadhikena Purvena (By one more than the previous one)",
      "Nikhilam Navatashcaramam Dashatah (All from 9 and the last from 10)",
      "Urdhva-Tiryagbyham (Vertically and crosswise)",
      "Paraavartya Yojayet (Transpose and apply)",
      "Shunyam Saamyasamuccaye (When the sum is the same, that sum is zero)",
      "Anurupyena Shunyamanyat (If one is in ratio, the other is zero)",
      "Sankalana-vyavakalanabhyam (By addition and by subtraction)",
      "Puranapuranabhyam (By the completion or non-completion)",
      "Chalana-Kalanabhyam (Differences and Similarities)",
      "Yavadunam (By the deficiency)"
    ];
  }

  preload() {
    // Load map and player assets
    this.load.image("ashram", "/meta elements/ashram.png");
    this.load.image("player", "/monk2.png");
    this.load.audio("nature", "/bird sounds.mp3");
    this.load.image("mathTeacher", "/teacher2.png"); // Load the math teacher sprite
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

    // Add the Vedic Mathematics teacher NPC in the middle of the map
    this.mathTeacher = this.physics.add.sprite(
      mapWidth / 3,
      mapHeight / 2.3,
      "mathTeacher"
    );
    this.mathTeacher.setOrigin(0.5, 0.5);
    this.mathTeacher.setScale(0.15);

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

    // Add interaction with the math teacher
    this.input.keyboard.on('keydown-ENTER', () => {
      if (this.isMathTeacher) {
        store.dispatch(setLearn(true));
        this.input.keyboard.enabled = false;
        
        // Initialize the Vedic Mathematics teaching session
        this.initializeVedicMathTeaching();
      }
    });
  }

  initializeVedicMathTeaching() {
    // Create a div for the Vedic Mathematics teaching UI
    const teachingUI = document.createElement('div');
    teachingUI.id = 'vedic-math-teaching';
    teachingUI.style.position = 'absolute';
    teachingUI.style.top = '50%';
    teachingUI.style.left = '50%';
    teachingUI.style.transform = 'translate(-20%, -50%)';
    teachingUI.style.width = '80%';
    teachingUI.style.maxWidth = '800px';
    teachingUI.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    teachingUI.style.color = 'white';
    teachingUI.style.padding = '20px';
    teachingUI.style.borderRadius = '10px';
    teachingUI.style.zIndex = '1000';
    teachingUI.style.display = 'flex';
    teachingUI.style.flexDirection = 'column';
    teachingUI.style.gap = '15px';
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Vedic Mathematics';
    title.style.textAlign = 'center';
    title.style.margin = '0 0 10px 0';
    teachingUI.appendChild(title);
    
    // Add concept display
    const conceptDisplay = document.createElement('div');
    conceptDisplay.id = 'concept-display';
    conceptDisplay.style.fontSize = '18px';
    conceptDisplay.style.marginBottom = '10px';
    conceptDisplay.textContent = this.vedicMathConcepts[this.currentConcept];
    teachingUI.appendChild(conceptDisplay);
    
    // Add explanation area
    const explanationArea = document.createElement('div');
    explanationArea.id = 'explanation-area';
    explanationArea.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    explanationArea.style.padding = '15px';
    explanationArea.style.borderRadius = '5px';
    explanationArea.style.minHeight = '200px';
    explanationArea.style.maxHeight = '300px';
    explanationArea.style.overflowY = 'auto';
    explanationArea.style.marginBottom = '10px';
    explanationArea.textContent = 'Welcome to Vedic Mathematics! I will teach you ancient mathematical techniques that make calculations faster and more intuitive.';
    teachingUI.appendChild(explanationArea);
    
    // Add input area for questions
    const inputArea = document.createElement('div');
    inputArea.style.display = 'flex';
    inputArea.style.gap = '10px';
    
    const questionInput = document.createElement('input');
    questionInput.id = 'question-input';
    questionInput.type = 'text';
    questionInput.placeholder = 'Ask a question about this concept...';
    questionInput.style.flex = '1';
    questionInput.style.padding = '10px';
    questionInput.style.borderRadius = '5px';
    questionInput.style.border = 'none';
    questionInput.style.color='black'
    
    const askButton = document.createElement('button');
    askButton.textContent = 'Ask';
    askButton.style.padding = '10px 15px';
    askButton.style.backgroundColor = '#4CAF50';
    askButton.style.color = 'white';
    askButton.style.border = 'none';
    askButton.style.borderRadius = '5px';
    askButton.style.cursor = 'pointer';
    
    inputArea.appendChild(questionInput);
    inputArea.appendChild(askButton);
    teachingUI.appendChild(inputArea);
    
    // Add navigation buttons
    const navigationArea = document.createElement('div');
    navigationArea.style.display = 'flex';
    navigationArea.style.justifyContent = 'space-between';
    navigationArea.style.marginTop = '10px';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.padding = '10px 15px';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next Concept';
    nextButton.style.padding = '10px 15px';
    nextButton.style.backgroundColor = '#2196F3';
    nextButton.style.color = 'white';
    nextButton.style.border = 'none';
    nextButton.style.borderRadius = '5px';
    nextButton.style.cursor = 'pointer';
    
    navigationArea.appendChild(closeButton);
    navigationArea.appendChild(nextButton);
    teachingUI.appendChild(navigationArea);
    
    // Add event listeners
    closeButton.addEventListener('click', () => {
      document.body.removeChild(teachingUI);
      store.dispatch(setLearn(false));
      this.input.keyboard.enabled = true;
      document.getElementsByClassName('learnVed')[0].style.display='none'
    });
    
    nextButton.addEventListener('click', () => {
      this.currentConcept = (this.currentConcept + 1) % this.vedicMathConcepts.length;
      conceptDisplay.textContent = this.vedicMathConcepts[this.currentConcept];
      explanationArea.textContent = `Let me explain the concept of ${this.vedicMathConcepts[this.currentConcept]}. This is a powerful Vedic mathematical technique that can help you solve complex calculations quickly.`;
    });
    
    askButton.addEventListener('click', () => {
      const question = questionInput.value.trim();
      if (question) {
        // Add the question to the explanation area
        const questionElement = document.createElement('div');
        questionElement.style.marginTop = '10px';
        questionElement.style.padding = '10px';
        questionElement.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        questionElement.style.borderRadius = '5px';
        questionElement.innerHTML = `<strong>You:</strong> ${question}`;
        explanationArea.appendChild(questionElement);
        
        // Send the question to the backend for processing
        this.sendQuestionToBackend(question, explanationArea);
        
        // Clear the input
        questionInput.value = '';
      }
    });
    
    // Add the UI to the document
    document.body.appendChild(teachingUI);
  }
  
  sendQuestionToBackend(question, explanationArea) {
    // Create a loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.style.marginTop = '10px';
    loadingElement.style.padding = '10px';
    loadingElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    loadingElement.style.borderRadius = '5px';
    loadingElement.textContent = 'Thinking...';
    explanationArea.appendChild(loadingElement);
    
    // Send the question to the backend
    fetch('http://localhost:5000/vedic_math', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `I'm learning about ${this.vedicMathConcepts[this.currentConcept]} in Vedic Mathematics. ${question}`
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Remove the loading indicator
        explanationArea.removeChild(loadingElement);
        
        // Add the answer to the explanation area
        const answerElement = document.createElement('div');
        answerElement.style.marginTop = '10px';
        answerElement.style.padding = '10px';
        answerElement.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
        answerElement.style.borderRadius = '5px';
        answerElement.innerHTML = `<strong>Teacher:</strong> ${data.answer}`;
        explanationArea.appendChild(answerElement);
        
        // Scroll to the bottom
        explanationArea.scrollTop = explanationArea.scrollHeight;
      })
      .catch(error => {
        // Remove the loading indicator
        explanationArea.removeChild(loadingElement);
        
        // Add an error message
        const errorElement = document.createElement('div');
        errorElement.style.marginTop = '10px';
        errorElement.style.padding = '10px';
        errorElement.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        errorElement.style.borderRadius = '5px';
        errorElement.textContent = 'Sorry, there was an error processing your question. Please try again.';
        explanationArea.appendChild(errorElement);
        
        console.error('Error:', error);
      });
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

    // Check distance to math teacher for interaction
    const distToMathTeacher = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.mathTeacher.x,
      this.mathTeacher.y
    );

    if (distToMathTeacher < 150) {
      this.isMathTeacher = true;
      this.mathTeacher.setTint(0xffbb4455);
    } else {
      this.isMathTeacher = false;
      this.mathTeacher.clearTint();
    }

    // Handle multiplayer functionality
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
