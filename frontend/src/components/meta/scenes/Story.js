import Phaser from "phaser";

class Story extends Phaser.Scene {
    constructor(){
        super({key:'Story'});
        this.currentSceneIndex = 0; // Track the current scene index
        this.scenes = [
            { image: "scene1", audio: "/voiceover1.mp3", subtitle: "This is the first part of the story." },
            { image: "scene2", audio: "/voiceover2.mp3", subtitle: "This is the second part of the story." },
            { image: "scene3", audio: "/voiceover3.mp3", subtitle: "This is the third part of the story." },
            { image: "scene4", audio: "/voiceover4.mp3", subtitle: "This is the final part of the story." }
        ];
    }

    preload(){
        this.load.image("scene1","/scene1.webp");
        this.load.image("scene2","/scene2.webp");
        this.load.image("scene3","/scene3.webp");
        this.load.image("scene4","/scene4.webp");
        
        // Load audio for each scene
        this.scenes.forEach(scene => {
            this.load.audio(scene.audio, scene.audio);
        });
    }

    create(){
        this.image = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.scenes[this.currentSceneIndex].image);
        this.subtitleText = this.add.text(this.cameras.main.centerX, this.cameras.main.height - 50, this.scenes[this.currentSceneIndex].subtitle, {
            font: '24px Arial',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.image.setScale(0.85);

        this.sound.add(this.scenes[this.currentSceneIndex].audio).play(); // Play the first audio
l
        this.input.keyboard.on('keydown-ENTER', this.nextScene, this);
    }

    nextScene() {
        this.currentSceneIndex++;
        if (this.currentSceneIndex < this.scenes.length) {
            this.image.setTexture(this.scenes[this.currentSceneIndex].image);
            this.subtitleText.setText(this.scenes[this.currentSceneIndex].subtitle);
            this.sound.stopAll(); // Stop any currently playing audio
            this.sound.add(this.scenes[this.currentSceneIndex].audio).play(); // Play the next audio
        } else {
            this.scene.start('Lobby'); // Return to Lobby or any other scene when done
        }
    }

    update(){
        // Any additional update logic can go here
    }
}

export default Story;