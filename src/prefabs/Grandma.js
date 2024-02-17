class Grandma extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super (scene, game.config.width + 150, Phaser.Math.Between(125, 250), 'Grandma')

        this.parentScene = scene

        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setVelocityX(velocity)
        this.setImmovable()
        this.newGrandma = true
    }

    update() {
        if(this.newGrandma && this.x < (centerX * this.parentScene.GrandmaMulti) + 100) {
            this.parentScene.addGrandma(this.parent, this.velocity)
            this.newGrandma = false
        }

        if(this.x < -this.width) {
            this.destroy()
        }
    }
}