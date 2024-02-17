class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // add credits 
        this.add.image(0, 0, 'cred').setOrigin(0)

        // credits config
        let credConfig = {
            fontFamily: 'Courier',
            fontSize: '55px',
            color: '#000000',
            align: 'center'
        }
        // add text for directions
        this.add.text(game.config.width/2 + 36, 743, 'Press [W] for Menu', credConfig).setOrigin(0.5)


        // define W key
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    }

    update() {
        // check for W input for menu
        if (Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.scene.start('menuScene')
        }
    }
}