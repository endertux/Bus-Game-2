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
        this.load.spritesheet('bus2', './assets/bus2.png', {
            frameWidth: 100,
            frameHeight: 50
        })
        this.load.image('grandma', './assets/grandma.png')
        this.load.image('hole', './assets/hole.png')

        // load audio
        this.load.audio('music', './assets/music.mp3')

        // sound effects
            // https://freesound.org/people/Eponn/sounds/420356/
        this.load.audio('crash', './assets/sound effects/crash.wav')
        
            //https://freesound.org/people/Kurck/sounds/319333/
        this.load.audio('beep', './assets/sound effects/319333__kurck__toet.ogg')
        
            //https://freesound.org/people/JamesBradford/sounds/579896/
        this.load.audio('kidscream', './assets/sound effects/kidscream.mp3')
        
            // https://freesound.org/search/?q=old+lady+scream&f=license%3A%22creative+commons+0%22&w=&tm=0&s=Automatic+by+relevance&advanced=0&g=1&only_p=&cm=0&mm=0
        this.load.audio('ladyscream', './assets/sound effects/ladyscream.wav')

            // https://freesound.org/people/Kurck/sounds/319335/
        this.load.audio('yay','./assets/sound effects/319335__kurck__jeej.ogg')

    }
    
    create() {
        // title screen
        this.add.sprite(310, 250, 'title')

        // Music
        // song: The Wheels On The Bus (metal cover by Leo Moracchioli)
            // https://www.youtube.com/watch?v=mGtYLRQh1Gk&ab_channel=FrogLeapStudios
        this.bgMusic = this.sound.add('music', {volume: 0.1, loop: true})

        if (!this.musicPlayed) {
            this.bgMusic.play()
            this.musicPlayed = true
        }

        if (this.musicPlayed && this.scene.isActive('playScene')) {
            this.musicPlayed = false
        }

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER) || Phaser.Input.Keyboard.JustDown(keyE)) {
            // start next scene
            this.scene.start('playScene')
            
            game.settings = {
                busSpeed: 3,
            //    gameTimer: 60000
            }
           
             this.sound.play('beep')
        }
    }
}
