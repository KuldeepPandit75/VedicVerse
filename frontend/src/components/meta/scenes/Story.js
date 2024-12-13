import Phaser from "phaser";

class Story extends Phaser.Scene {
    constructor(){
        super({key:'Story'});
        this.currentSceneIndex = 0; // Track the current scene index
        this.scenes = [
            { audio: null, subtitle: "Ganesha writes Mahabharata" }, // Initial black screen with title
            { image: "scene1", audio: "/voiceover1.mp3", subtitle: "This is the first part of the story." },
            { image: "scene2", audio: "/voiceover2.mp3", subtitle: "This is the second part of the story." },
            { image: "scene3", audio: "/voiceover3.mp3", subtitle: "This is the third part of the story." },
            { image: "scene4", audio: "/voiceover4.mp3", subtitle: "This is the final part of the story." }
        ];
    }

    preload(){
        this.load.image("scene1", "/scene1.webp");
        this.load.image("scene2", "/scene2.webp");
        this.load.image("scene3", "/scene3.webp");
        this.load.image("scene4", "/scene4.webp");
        
        // Load audio for each scene
        this.scenes.forEach(scene => {
            if (scene.audio) {
                this.load.audio(scene.audio, scene.audio);
            }
        });
    }

    create(){
        // Create a black background
        this.cameras.main.setBackgroundColor(0x000000);
        
        // Create title text
        this.titleText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, this.scenes[this.currentSceneIndex].subtitle, {
            font: '48px Arial',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Fade in the title
        this.tweens.add({
            targets: this.titleText,
            alpha: { from: 0, to: 1 },
            duration: 2000,
            onComplete: () => {
                // After fade in, wait for a moment then fade out
                this.time.delayedCall(2000, () => {
                    this.tweens.add({
                        targets: this.titleText,
                        alpha: { from: 1, to: 0 },
                        duration: 2000,
                    });
                });
            }
        });
        this.input.keyboard.on('keydown-SPACE', this.nextScene, this);
    }

    nextScene() {
        this.currentSceneIndex++;
        if (this.currentSceneIndex < this.scenes.length) {
            // Remove title text
            if (this.titleText) {
                this.titleText.destroy();
            }
            this.cameras.main.setBackgroundColor(0x000000); // Reset background color
            
            // Remove previous image if it exists
            if (this.image) {
                this.image.destroy();
            }

            // Check if there is an image for the next scene
            if (this.scenes[this.currentSceneIndex].image) {
                this.image = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.scenes[this.currentSceneIndex].image);
            }

            // Remove previous subtitle if it exists
            if (this.subtitleText) {
                this.subtitleText.destroy();
            }

            // Create subtitle text for the current scene
            this.subtitleText = this.add.text(this.cameras.main.centerX, this.cameras.main.height - 50, this.scenes[this.currentSceneIndex].subtitle, {
                font: '24px Arial',
                fill: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);

            // Play audio for the current scene if available
            if (this.scenes[this.currentSceneIndex].audio) {
                this.sound.add(this.scenes[this.currentSceneIndex].audio).play(); // Play the next audio if available
            }
        } else {
            this.scene.start('Lobby'); // Return to Lobby or any other scene when done
        }
    }

    update(){
        // Any additional update logic can go here
    }
}

export default Story;