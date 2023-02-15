import { k, TILE_WIDTH } from "./kaboom_globals.js"
import { sc_HelloTiled } from "./scenes/sc_HelloTiled.js"
// import "./scenes/sc_HelloWorld.js"
// import "./scenes/sc_Farm.js"

k.loadSprite("farmer", "sprites/npc_atlas.png", {
    sliceX: 4,
    sliceY: 4,
    width: TILE_WIDTH(4),
    height: TILE_WIDTH(1),
    anims: {
        "idle": {
            from: 0,
            to: 3,
            loop: true,
            speed: 6,
            // pingpong: true
        }
    }
})

sc_HelloTiled.go()