import Phaser from "phaser";

class Story extends Phaser.Scene {
  constructor() {
    super({ key: "Story" });
    this.currentSceneIndex = -1; // Track the current scene index
    this.scenes = [
      // { audio: null, subtitle: "The Untold Story of the Mahabharata's Creation" }, // Initial black screen with title
      {
        image: "scene1",
        audio: "/voiceover1.wav",
        subtitle:
          "In the sacred valleys of the Himalayas, where snow-covered peaks touch the heavens, Sage Ved Vyasa sat deep in meditation. His long white hair and beard reflected his immense wisdom and devotion. A soft glow of spiritual energy surrounded him, filling the atmosphere with peace and divinity.",
      },
      {
        image: "scene2",
        audio: "/voiceover2.wav",
        subtitle:
          "Suddenly, a divine radiance illuminated the surroundings, and Lord Brahma, with his four faces, appeared. Holding a lotus flower and a golden staff, Brahma stood majestically in the air. In his serene yet commanding voice, he addressed Vyasa, 'O Sage, you must compose an epic that will guide humanity. This scripture shall encompass all the knowledge of creation.",
      },
      {
        image: "scene3",
        audio: "/voiceover3.wav",
        subtitle:
          "After Lord Brahma’s departure, Vyasa stood by a tranquil river, lost in deep thought. He gazed at the flowing water, pondering, 'How can I undertake such a monumental task and document it all?' The immense responsibility weighed heavily on his mind, yet his determination remained unwavering.",
      },
      {
        image: "scene4",
        audio: "/voiceover4.wav",
        subtitle:
          "Determined, Vyasa approached Lord Ganesha, who was seated regally beneath a grand, ancient tree. Adorned with divine ornaments, Ganesha listened attentively as Vyasa explained his predicament. With a serene smile, Ganesha replied, 'Sage, it will be my honor to assist you in this divine task. Lord Ganesha, calm yet resolute, said, 'I will write the epic for you, but on one condition: you must recite without pausing. If you stop, I too shall cease writing.' Vyasa, with a knowing smile, countered, 'Then I too set a condition—you must fully understand each verse before inscribing it.' Both agreed, setting the stage for a remarkable collaboration.",
      },
      {
        image: "scene5",
        audio: "/voiceover5.wav",
        subtitle:
          "Lord Ganesha wrote at an astonishing speed, his stylus moving without pause. Sage Vyasa, however, skillfully inserted complex sentences that made Ganesha stop briefly to understand their meaning. These moments allowed Vyasa to catch his breath and prepare the next verse, ensuring the epic’s seamless composition.",
      },
      {
        image: "scene6",
        audio: "/voiceover6.wav",
        subtitle:
          "Lord Ganesha was inscribing the Mahabharata at an incredible speed when his stylus suddenly broke. Unwilling to stop, he broke off a piece of his own tusk and continued writing without hesitation. This act of resolve earned him the name ‘Ekadanta,’ the one with one tusk.",
      },
      {
        image: "scene7",
        audio: "/voiceover7.wav",
        subtitle:
          "After three years of relentless effort, the Mahabharata was finally complete. Ganesha wrote the final verse and placed the stylus down. Vyasa looked upon the completed scrolls with a smile of deep satisfaction. Together, they had created an eternal masterpiece—a gift to humanity.",
      },
    ];
    this.currentAudio = null; // Track the currently playing audio
  }

  preload() {
    this.load.image("scene1", "/scene1.webp");
    this.load.image("scene2", "/scene2.webp");
    this.load.image("scene3", "/scene3.webp");
    this.load.image("scene4", "/scene4.webp");
    this.load.image("scene5", "/scene5.webp");
    this.load.image("scene6", "/scene6.webp");
    this.load.image("scene7", "/scene7.webp");
    this.load.audio("storyBg", "/storyBg.mp3");
    this.load.video("sparks", "/sparks.mp4", "loadeddata", false, true);

    // Load audio for each scene
    this.scenes.forEach((scene) => {
      if (scene.audio) {
        this.load.audio(scene.audio, scene.audio);
      }
    });
  }

  create() {
    // Create a black background
    this.cameras.main.setBackgroundColor(0x000000);

    //Music tamjham

    this.music = this.sound.add("storyBg", {
      loop: true, // Enable looping
      volume: 0.1, // Adjust volume (optional)
    });
    this.music.play();

    // Create and configure the video
    this.video = this.add.video(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "sparks"
    );

    // Adjust the video size (increase width and height)
    const videoWidth = this.cameras.main.width * 0.2; // 20% larger
    const videoHeight = this.cameras.main.height * 0.2;

    //video ka agar lag raha hai wo neeche hai to ye setorigin ko 0.1 se 0.5 krke dekh le bekar lag ri hai isiliye niche kia hai. MOJ KAR

    this.video.setOrigin(0.5, 0.1); // Center origin
    this.video.setDisplaySize(videoWidth, videoHeight); // Apply adjusted size
    this.video.setDepth(10); // Increase z-index using setDepth

    this.video.play(); // Play the video

    // Fade in the title
    this.tweens.add({
      targets: this.video,
      alpha: { from: 0, to: 1 },
      duration: 2000,
      onComplete: () => {
        // After fade in, wait for a moment then fade out
        this.time.delayedCall(2000, () => {
          this.tweens.add({
            targets: this.video,
            alpha: { from: 1, to: 0 },
            duration: 2000,
          });
        });
      },
    });
    this.input.keyboard.on("keydown-SPACE", this.nextScene, this);
  }

  nextScene() {
    // Stop the current audio if it is playing
    if (this.currentAudio) {
      this.currentAudio.stop();
    }

    this.currentSceneIndex++;
    if (this.currentSceneIndex < this.scenes.length) {
      // Remove title text
      if (this.video) {
        this.video.destroy();
      }
      this.cameras.main.setBackgroundColor(0x000000); // Reset background color

      // Remove previous image if it exists
      if (this.image) {
        this.image.destroy();
      }

      // Check if there is an image for the next scene
      if (this.scenes[this.currentSceneIndex].image) {
        this.image = this.add.image(
          this.cameras.main.centerX,
          this.cameras.main.centerY,
          this.scenes[this.currentSceneIndex].image
        );
        this.image.setScale(0.85);
      }

      // Remove previous subtitle if it exists
      if (this.subtitleText) {
        this.subtitleText.destroy();
      }

      // Create a background rectangle for the subtitle
      const subtitleText = this.scenes[this.currentSceneIndex].subtitle;
      const subtitleWidth = this.cameras.main.width; // 80% of viewport width

      // Create a background rectangle for the subtitle
      const subtitleBackground = this.add
        .rectangle(
          this.cameras.main.centerX,
          this.cameras.main.height - 80,
          subtitleWidth,
          50,
          0x000000,
          0.7
        )
        .setOrigin(0.5);

      // Create subtitle text with word wrap
      this.subtitleText = this.add
        .text(
          this.cameras.main.centerX,
          this.cameras.main.height - 50,
          subtitleText,
          {
            font: "24px Arial",
            fill: "#ffffff",
            align: "center",
            wordWrap: { width: subtitleWidth, useAdvancedWrap: true }, // 80% of viewport width
          }
        )
        .setOrigin(0.5);

      // Adjust the height of the background rectangle based on the text height
      const textHeight = this.subtitleText.getBounds().height; // Get the height of the text
      subtitleBackground.height = textHeight + 20; // Add some padding

      // Play audio for the current scene if available
      if (this.scenes[this.currentSceneIndex].audio) {
        this.currentAudio = this.sound.add(
          this.scenes[this.currentSceneIndex].audio
        ); // Store the current audio
        this.currentAudio.play(); // Play the next audio if available
      }
    } else {
      this.music.stop();
      this.scene.start("Lobby",{x:265,y:680});
      this.currentSceneIndex= -1;
    }
  }

  update() {
    // Any additional update logic can go here
  }
}

export default Story;
