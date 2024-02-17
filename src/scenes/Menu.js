class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // title screen
        this.load.image("title", './assets/background.png')
        // game over
        this.load.image('gameover', './assets/gameover.png')
        // credits
        this.load.image('cred', './assets/credits.png')

        // assets
        this.load.image('road', './assets/road.png')
        this.load.image('bus', './assets/bus.png')
        this.load.image('child', './assets/kid.png')
        this.load.image('grandma', './assets/grandma.png')
        this.load.image('hole', './assets/hole.png')

        // load audio
        this.load.audio('music', './assets/music.mp3')
    }
    
    create() {
        // title screen
        this.add.sprite(310, 250, 'title')

        // Music
        // song: The Wheels On The Bus (metal cover by Leo Moracchioli)
            // https://www.youtube.com/watch?v=mGtYLRQh1Gk&ab_channel=FrogLeapStudios
        this.bgMusic = this.sound.add('music', {volume: 0.5, loop: true})

        if (!this.musicPlayed) {
            this.bgMusic.play()
            this.musicPlayed = true
        }

        if (this.musicPlayed && this.scene.isActive('playScene')) {
            this.musicPlayed = false
        }

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            // start next scene
            this.scene.start('playScene')
            
            game.settings = {
                busSpeed: 3,
            //    gameTimer: 60000
            }
           
            // this.sound.play('sfx-select')
           // this.scene.start('playScene')
        }
    }
}
