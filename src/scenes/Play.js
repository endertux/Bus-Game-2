class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {
        //this.physics.world.gravity.y = 100
    }

    create() {
        // tile sprite
        this.road = this.add.tileSprite(0, 0, 640, 480, 'road').setOrigin(0, 0)

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        // initialize score
        this.p1Score = 0

        // START! UI
        this.fireText = this.add.text(game.config.width / 2, game.config.height / 2, 'START!', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#AAFF00',
            fontWeight: 'bold'
        }).setOrigin(0.5)
        
        // hide START!
        this.time.delayedCall(2000, () => {
            this.fireText.visible = false
        })

        // GAME OVER flag
        this.gameOver = false

        // bus animations
        this.anims.create({
            key: 'drive',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bus2', {
                start: 0,
                end: 1
            })
        })

        // set up player bus (physics sprite) and set properties
        Bus = this.physics.add.sprite(4, centerY, 'bus').setOrigin(0.5);
        Bus.setCollideWorldBounds(true);
        Bus.anims.play('drive'),
        Bus.setBounce(0.5);
        Bus.setImmovable();
        Bus.setMaxVelocity(0, 500);
        Bus.setDragY(100);
        Bus.setDepth(3);             // ensures that paddle z-depth remains above shadow paddles
        Bus.destroyed = false;       // custom property to track paddle life
        // Bus.setBlendMode('SCREEN'); // transperency

        // define bus velocity
        this.BusVelocity = 100

        this.childSpeed = -360
        this.grandmaSpeed = -200

        // define child
        this.child = 0
        // define grandma
        this.grandma = 0

        // child on street
        this.childGroup = this.add.group({
            runChildUpdate: true
        })
        // grandma on street
        this.grandmaGroup = this.add.group({
            runChildUpdate: true
        })

        this.time.delayedCall(1500, () => {
            this.addChild()
        })
        
        
        this.time.delayedCall(1500, () => {
            this.addGrandma()
        })

        // set up cusor keys
        cursors = this.input.keyboard.createCursorKeys();

        // 20 sec after child
        this.timer = this.time.addEvent({
        delay: 20000,
        callback: this.spamChild,
        callbackScope: this,
        loop: true
        })
        this.childSpam = 1

    }

    addChild() {
        let speedVary = Phaser.Math. Between(0, 50)
        this.child = new Child(this, this.childSpeed - speedVary, this.sprite).setScale()
        this.childGroup.add(this.child)
        this.child.body.setAllowGravity(false)
        
    }

    addGrandma() {
        let speedVary = Phaser.Math. Between(0, 50)
        this.grandma = new Grandma(this, this.grandmaSpeed - speedVary, this.sprite).setScale()
        this.grandmaGroup.add(this.grandma)
        this.grandma.body.setAllowGravity(false)
    }

    update() {
        this.road.tilePositionX -= -5

        // START! check
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
        this.startText.visible = false
        }

        // make sure bus alive
        if(!Bus.destroyed) {
            // check player input
            if(cursors.up.isDown) {
                Bus.body.velocity.y -= this.BusVelocity;
            } else if(cursors.down.isDown) {
                Bus.body.velocity.y += this.BusVelocity;
            }

            }
            
            // check for collisions
            this.physics.world.collide(Bus, this.grandmaGroup, this.gbusCollision, null, this)
            this.physics.world.collide(Bus, this.childGroup, this.cbusCollision, null, this)
        
        }



    cbusCollision(Bus, child) {
         this.sound.play('kidscream', {
             volume: 1
         })
        Bus.destroyed = true
 
        this.gameOver = true
        if (this.gameOver = true) {
            this.sound.play('crash')
        }

        this.time.delayedCall(1500, () => {this.scene.start('gameOverScene')})
        child.destroy()

     }

     gbusCollision(Bus, grandma) {
         this.sound.play('ladyscream', {
             volume: 2
         })
        Bus.destroyed = true
 
        this.gameOver = true
        if (this.gameOver = true) {
            this.sound.play('crash')
        }
        
        this.time.delayedCall(1500, () => {this.scene.start('gameOverScene')})   
        grandma.destroy()  
    }

    spamChild() {
        this.childSpam += 0.25
        console.log('here comes the children')
        
    }

    }