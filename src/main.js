// Name: Helwa Halloum
// Game: Bus Game 2
// Completion Time: 20 hrs

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Menu, Play, gameOver, Credits ]
}

let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// define globals
let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height

// reserve key bindings
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER, keyW, keyD, keyA

const BusVelocity = 200
let bus = null
let cursors;
