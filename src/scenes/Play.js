class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // tile sprite
        this.road = this.add.tileSprite(0, 0, 640, 480, 'road').setOrigin(0, 0)

        // white borders
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // add bus (p1)
        //this.bus = new Bus (this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'bus').setOrigin(4, 7)

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

        // define child
        this.child = 0

        this.childGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(1500, () => {
            this.addChild()
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
    update() {
        this.road.tilePositionX -= -4

        // START! check
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
        this.startText.visible = false
        }

        // make sure bus alive
        if(!Bus.destroyd) {
            // check player input
            if(cursors.up.isDown) {
                Bus.body.velocity.y -= this.BusVelocity;
            } else if(cursors.down.isDown) {
                Bus.body.velocity.y += this.BusVelocity;
            }

            }
        }

    }