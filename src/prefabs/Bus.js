class Bus extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this) //add object to existing scene
        this.isVroom = false   // track bus hit status
        this.moveSpeed = 4       // bus speed in pixels/frame
        //this.sfxShot = scene.sound.add('sfx-shot')
    }



    update() {
        this.x += this.moveSpeed
        }
    }