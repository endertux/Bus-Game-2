class Child extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super (scene, game.config.width + 64, Phaser.Math.Between(64, 32), 'Child')

        this.parentScene = scene

        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setVelocityX(velocity)
        this.setImmovable()
        this.newChild = true
    }

    update() {
        if(this.newChild && this.x < (centerX * this.parentScene.ChildMulti) + 100) {
            this.parentScene.addChild(this.parent, this.velocity)
            this.newChild = false
        }

        if(this.x < -this.width) {
            this.destroy()
        }
    }
}