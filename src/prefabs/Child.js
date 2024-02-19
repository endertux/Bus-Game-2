class Child extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, sprite) {
        super (scene, game.config.width + 150, Phaser.Math.Between(150, 250), 'child')

        this.parentScene = scene

        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setVelocityX(velocity)
        this.setImmovable()
        this.newChild = true
    }

    update() {
        if(this.newChild && this.x < (centerX * this.parentScene.childSpam) + 100) {
            this.parentScene.addChild(this.parent, this.velocity)
            this.newChild = false
        }

        if(this.x < -this.width) {
            this.destroy()
        }
    }
}