class gameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create() {
        // add game over screen

        let gameOverScreen = this.add.sprite(0, 0, 'gameover').setOrigin(0, 0)

        // game over config
        let ggConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            color: '#FFFFFF',
            align: 'center'
        }
        // text
        //this.add.text(game.config.width/-50, -50, 'Press D to restart, or A for credits, to Restart press D', ggConfig).setOrigin(0.5)

        // define keys
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

    }

    update() {
        // W for menu
        if (Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.scene.start('menuScene')
        }

        // D to restart
        if (Phaser.Input.Keyboard.JustDown(this.keyD)) {
            this.scene.start('playScene')
        }

        // A to credits
        if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
            this.scene.start('creditsScene')
        }
    }
}