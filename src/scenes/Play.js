class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {
        this.physics.world.gravity.y = 300
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

        // set up player bus (physics sprite) and set properties
        Bus = this.physics.add.sprite(4, centerY, 'bus').setOrigin(0.5);
        Bus.setCollideWorldBounds(true);
        Bus.setBounce(0.5);
        Bus.setImmovable();
        Bus.setMaxVelocity(0, 600);
        Bus.setDragY(200);
        Bus.setDepth(1);             // ensures that paddle z-depth remains above shadow paddles
        Bus.destroyed = false;       // custom property to track paddle life
        // Bus.setBlendMode('SCREEN'); // transperency

        // define bus velocity
        this.BusVelocity = 100

        this.childSpeed = -300
        this.grandmaSpeed = -550

        // define child
        this.child = 0
        // define grandma
        this.grandma = 0

        // child on streen
        this.childGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(1500, () => {
            this.addChild()
        })
        
        // grandma on street
        this.grandmaGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(1500, () => {
            this.addGrandma()
        })

        // set up cusor keys
        cursors = this.input.keyboard.createCursorKeys();

    }

    addChild() {
        let speedVary = Phaser.Math. Between(0, 50)
        this.child = new Child(this, this.childSpeed - speedVary).setScale()
        this.childGroup.add(this.child)
        this.child.body.setAllowGravity(false)
    }

    addGrandma() {
        let speedVary = Phaser.Math. Between(0, 50)
        this.child = new Child(this, this.childSpeed - speedVary).setScale()
        this.childGroup.add(this.child)
        this.child.body.setAllowGravity(false)
    }

    update() {
        this.road.tilePositionX -= -4

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
            this.physics.world.collide(Bus, this.grandmaGroup, this.busCollision, null, this)
            this.physics.world.collide(Bus, this.childGroup, this.childCollision, null, this)
        
        }

    childCollision(bus, child) {
       // this.sound.play('', {
        //    volume: 6.5
        //})
        child.alpha = 0
        child.destroy()
        this.gameOver = true
        
    }
    busCollision() {
       // this.sound.play('', {
         //   volume: 10
       // })
       Bus.destroyed = true

       this.gameOver = true
       this.time.delayedCall(1500, () => {this.scene.start('gameOverScene')})
    }

    moreGrandma() {
        if(this.grandmaMult < 2) {
            this.grandmaMulti += 0.1
            console.log('more grandmas')
        }
    }

    moreChild() {
        this.childMulti += 2
        this.frenzy = true

        this.nochildTime = this.time.addEvent({
            delay: Phaser.Math.Between(3000, 8000),
            callbackScope: this,
            loop: false
        })
    }

    stopChild() {
        this.childMulti = 1
        this.frenzyMulti = 1
        this.frenzy = false

    }

    }